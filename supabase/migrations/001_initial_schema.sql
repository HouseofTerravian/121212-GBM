-- ============================================================================
-- 121212-GBM Marketplace — Initial Schema
-- Migration: 001_initial_schema.sql
-- Created: 2026-03-24
-- ============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. PROFILES — Global identity table (shared across ecosystem apps)
-- ============================================================================
CREATE TABLE profiles (
    id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email       TEXT NOT NULL,
    display_name TEXT NOT NULL,
    avatar_url  TEXT,
    role        TEXT NOT NULL DEFAULT 'buyer'
                CHECK (role IN ('buyer', 'vendor', 'admin')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE profiles IS 'Global identity table mirrored from auth.users';

-- ============================================================================
-- 2. CATEGORIES — 8 product verticals
-- ============================================================================
CREATE TABLE categories (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug       TEXT NOT NULL UNIQUE,
    label      TEXT NOT NULL,
    emoji      TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

COMMENT ON TABLE categories IS 'Fixed set of marketplace product categories';

-- Seed the 8 categories
INSERT INTO categories (slug, label, emoji, sort_order) VALUES
    ('fashion',  'Fashion',            '👗', 1),
    ('jewelry',  'Jewelry',            '💎', 2),
    ('wellness', 'Wellness',           '🧘', 3),
    ('art',      'Art & Culture',      '🎨', 4),
    ('food',     'Food & Beverage',    '🍯', 5),
    ('home',     'Home & Living',      '🏠', 6),
    ('music',    'Music',              '🎵', 7),
    ('books',    'Books & Education',  '📚', 8);

-- ============================================================================
-- 3. VENDORS — Vendor storefronts
-- ============================================================================
CREATE TABLE vendors (
    id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id               UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    storefront_name       TEXT NOT NULL,
    slug                  TEXT NOT NULL UNIQUE,
    bio                   TEXT,
    banner_url            TEXT,
    avatar_url            TEXT,
    country               TEXT NOT NULL,
    category_id           UUID REFERENCES categories(id),
    tier                  TEXT NOT NULL DEFAULT 'Griot'
                          CHECK (tier IN ('Griot', 'Merchant', 'Mogul')),
    platform_fee_pct      NUMERIC(4,2) NOT NULL DEFAULT 20.00,
    listing_limit         INT NOT NULL DEFAULT 10,
    is_verified           BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured           BOOLEAN NOT NULL DEFAULT FALSE,
    stripe_account_id     TEXT,
    stripe_subscription_id TEXT,
    total_sales           INT NOT NULL DEFAULT 0,
    avg_rating            NUMERIC(3,2) NOT NULL DEFAULT 0.00,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE vendors IS 'Vendor storefronts — tier determines fee & listing cap';
COMMENT ON COLUMN vendors.tier IS 'Griot=20% fee / 10 listings, Merchant=10% / 50, Mogul=4% / unlimited';
COMMENT ON COLUMN vendors.platform_fee_pct IS 'Defaults: Griot=20, Merchant=10, Mogul=4';

-- ============================================================================
-- 4. PRODUCTS
-- ============================================================================
CREATE TABLE products (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id         UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    category_id       UUID NOT NULL REFERENCES categories(id),
    name              TEXT NOT NULL,
    description       TEXT,
    price             NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    compare_at_price  NUMERIC(10,2),
    currency          TEXT NOT NULL DEFAULT 'USD',
    sku               TEXT,
    stock_quantity    INT,  -- NULL = unlimited
    product_type      TEXT NOT NULL DEFAULT 'physical'
                      CHECK (product_type IN ('physical', 'digital', 'service')),
    is_active         BOOLEAN NOT NULL DEFAULT TRUE,
    is_featured       BOOLEAN NOT NULL DEFAULT FALSE,
    tags              TEXT[],
    avg_rating        NUMERIC(3,2) NOT NULL DEFAULT 0.00,
    total_reviews     INT NOT NULL DEFAULT 0,
    total_sold        INT NOT NULL DEFAULT 0,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE products IS 'Marketplace product listings';
COMMENT ON COLUMN products.stock_quantity IS 'NULL means unlimited stock';

-- ============================================================================
-- 5. PRODUCT IMAGES
-- ============================================================================
CREATE TABLE product_images (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url         TEXT NOT NULL,
    alt_text    TEXT,
    sort_order  INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE product_images IS 'Product gallery images, ordered by sort_order';

-- ============================================================================
-- 6. ORDERS
-- ============================================================================
CREATE TABLE orders (
    id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer_id                 UUID NOT NULL REFERENCES profiles(id),
    status                   TEXT NOT NULL DEFAULT 'paid'
                             CHECK (status IN ('paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
    subtotal                 NUMERIC(10,2) NOT NULL,
    platform_fee             NUMERIC(10,2) NOT NULL,
    total                    NUMERIC(10,2) NOT NULL,
    stripe_payment_intent_id TEXT,
    shipping_address         JSONB,
    tracking_number          TEXT,
    tracking_url             TEXT,
    notes                    TEXT,
    created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE orders IS 'Buyer orders with Stripe payment tracking';

-- ============================================================================
-- 7. ORDER ITEMS
-- ============================================================================
CREATE TABLE order_items (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id            UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id          UUID NOT NULL REFERENCES products(id),
    vendor_id           UUID NOT NULL REFERENCES vendors(id),
    quantity            INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price          NUMERIC(10,2) NOT NULL,
    platform_fee_pct    NUMERIC(4,2) NOT NULL,
    platform_fee_amount NUMERIC(10,2) NOT NULL,
    vendor_payout       NUMERIC(10,2) NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE order_items IS 'Line items per order with fee split calculations';

-- ============================================================================
-- 8. REVIEWS
-- ============================================================================
CREATE TABLE reviews (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    buyer_id    UUID NOT NULL REFERENCES profiles(id),
    vendor_id   UUID NOT NULL REFERENCES vendors(id),
    rating      INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title       TEXT,
    body        TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (product_id, buyer_id)
);

COMMENT ON TABLE reviews IS 'Product reviews — one per buyer per product';

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Products: fast lookups by vendor, category, and active listings
CREATE INDEX idx_products_vendor_id   ON products (vendor_id);
CREATE INDEX idx_products_category_id ON products (category_id);
CREATE INDEX idx_products_active      ON products (is_active) WHERE is_active = TRUE;

-- Orders: buyer lookup
CREATE INDEX idx_orders_buyer_id ON orders (buyer_id);

-- Order items: vendor dashboard / payout queries
CREATE INDEX idx_order_items_vendor_id ON order_items (vendor_id);

-- Reviews: product page + vendor dashboard
CREATE INDEX idx_reviews_product_id ON reviews (product_id);
CREATE INDEX idx_reviews_vendor_id  ON reviews (vendor_id);

-- Vendors: storefront slug lookup
CREATE INDEX idx_vendors_slug ON vendors (slug);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories     ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors        ENABLE ROW LEVEL SECURITY;
ALTER TABLE products       ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders         ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items    ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews        ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- PROFILES
-- ---------------------------------------------------------------------------
CREATE POLICY "profiles_public_read"
    ON profiles FOR SELECT
    USING (TRUE);

CREATE POLICY "profiles_insert_own"
    ON profiles FOR INSERT
    WITH CHECK (id = auth.uid());

CREATE POLICY "profiles_update_own"
    ON profiles FOR UPDATE
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- ---------------------------------------------------------------------------
-- CATEGORIES
-- ---------------------------------------------------------------------------
CREATE POLICY "categories_public_read"
    ON categories FOR SELECT
    USING (TRUE);

-- ---------------------------------------------------------------------------
-- VENDORS
-- ---------------------------------------------------------------------------
CREATE POLICY "vendors_public_read"
    ON vendors FOR SELECT
    USING (TRUE);

CREATE POLICY "vendors_insert_own"
    ON vendors FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "vendors_update_own"
    ON vendors FOR UPDATE
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- PRODUCTS
-- ---------------------------------------------------------------------------

-- Anyone can read active products
CREATE POLICY "products_public_read_active"
    ON products FOR SELECT
    USING (is_active = TRUE);

-- Vendors can read ALL their own products (including inactive)
CREATE POLICY "products_vendor_read_own"
    ON products FOR SELECT
    USING (
        vendor_id IN (
            SELECT id FROM vendors WHERE user_id = auth.uid()
        )
    );

-- Vendors can insert their own products
CREATE POLICY "products_vendor_insert"
    ON products FOR INSERT
    WITH CHECK (
        vendor_id IN (
            SELECT id FROM vendors WHERE user_id = auth.uid()
        )
    );

-- Vendors can update their own products
CREATE POLICY "products_vendor_update"
    ON products FOR UPDATE
    USING (
        vendor_id IN (
            SELECT id FROM vendors WHERE user_id = auth.uid()
        )
    )
    WITH CHECK (
        vendor_id IN (
            SELECT id FROM vendors WHERE user_id = auth.uid()
        )
    );

-- Vendors can delete their own products
CREATE POLICY "products_vendor_delete"
    ON products FOR DELETE
    USING (
        vendor_id IN (
            SELECT id FROM vendors WHERE user_id = auth.uid()
        )
    );

-- ---------------------------------------------------------------------------
-- PRODUCT IMAGES
-- ---------------------------------------------------------------------------

-- Anyone can read product images (for active products, enforced at app level)
CREATE POLICY "product_images_public_read"
    ON product_images FOR SELECT
    USING (TRUE);

-- Vendors can manage images for their own products
CREATE POLICY "product_images_vendor_insert"
    ON product_images FOR INSERT
    WITH CHECK (
        product_id IN (
            SELECT p.id FROM products p
            JOIN vendors v ON v.id = p.vendor_id
            WHERE v.user_id = auth.uid()
        )
    );

CREATE POLICY "product_images_vendor_update"
    ON product_images FOR UPDATE
    USING (
        product_id IN (
            SELECT p.id FROM products p
            JOIN vendors v ON v.id = p.vendor_id
            WHERE v.user_id = auth.uid()
        )
    )
    WITH CHECK (
        product_id IN (
            SELECT p.id FROM products p
            JOIN vendors v ON v.id = p.vendor_id
            WHERE v.user_id = auth.uid()
        )
    );

CREATE POLICY "product_images_vendor_delete"
    ON product_images FOR DELETE
    USING (
        product_id IN (
            SELECT p.id FROM products p
            JOIN vendors v ON v.id = p.vendor_id
            WHERE v.user_id = auth.uid()
        )
    );

-- ---------------------------------------------------------------------------
-- ORDERS
-- ---------------------------------------------------------------------------

-- Buyers can read their own orders
CREATE POLICY "orders_buyer_read_own"
    ON orders FOR SELECT
    USING (buyer_id = auth.uid());

-- Buyers can create orders
CREATE POLICY "orders_buyer_insert"
    ON orders FOR INSERT
    WITH CHECK (buyer_id = auth.uid());

-- ---------------------------------------------------------------------------
-- ORDER ITEMS
-- ---------------------------------------------------------------------------

-- Buyers can read items from their own orders
CREATE POLICY "order_items_buyer_read_own"
    ON order_items FOR SELECT
    USING (
        order_id IN (
            SELECT id FROM orders WHERE buyer_id = auth.uid()
        )
    );

-- Vendors can read order items assigned to them
CREATE POLICY "order_items_vendor_read_own"
    ON order_items FOR SELECT
    USING (
        vendor_id IN (
            SELECT id FROM vendors WHERE user_id = auth.uid()
        )
    );

-- ---------------------------------------------------------------------------
-- REVIEWS
-- ---------------------------------------------------------------------------

-- Anyone can read reviews
CREATE POLICY "reviews_public_read"
    ON reviews FOR SELECT
    USING (TRUE);

-- Buyers can insert reviews
CREATE POLICY "reviews_buyer_insert"
    ON reviews FOR INSERT
    WITH CHECK (buyer_id = auth.uid());

-- Buyers can update their own reviews
CREATE POLICY "reviews_buyer_update_own"
    ON reviews FOR UPDATE
    USING (buyer_id = auth.uid())
    WITH CHECK (buyer_id = auth.uid());

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Auto-create profile on new auth.users signup
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, display_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 2. Auto-update updated_at timestamp
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_vendors_updated_at
    BEFORE UPDATE ON vendors
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ---------------------------------------------------------------------------
-- 3. Auto-update vendor avg_rating when reviews change
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_vendor_avg_rating()
RETURNS TRIGGER AS $$
DECLARE
    target_vendor_id UUID;
BEGIN
    -- Determine which vendor to recalculate
    IF TG_OP = 'DELETE' THEN
        target_vendor_id := OLD.vendor_id;
    ELSE
        target_vendor_id := NEW.vendor_id;
    END IF;

    -- Recalculate vendor average rating from all their reviews
    UPDATE vendors
    SET avg_rating = COALESCE(
        (SELECT ROUND(AVG(rating)::NUMERIC, 2) FROM reviews WHERE vendor_id = target_vendor_id),
        0.00
    )
    WHERE id = target_vendor_id;

    -- Also update the product-level stats
    IF TG_OP = 'DELETE' THEN
        UPDATE products
        SET avg_rating = COALESCE(
                (SELECT ROUND(AVG(rating)::NUMERIC, 2) FROM reviews WHERE product_id = OLD.product_id),
                0.00
            ),
            total_reviews = (SELECT COUNT(*) FROM reviews WHERE product_id = OLD.product_id)
        WHERE id = OLD.product_id;
    ELSE
        UPDATE products
        SET avg_rating = COALESCE(
                (SELECT ROUND(AVG(rating)::NUMERIC, 2) FROM reviews WHERE product_id = NEW.product_id),
                0.00
            ),
            total_reviews = (SELECT COUNT(*) FROM reviews WHERE product_id = NEW.product_id)
        WHERE id = NEW.product_id;
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_change
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.update_vendor_avg_rating();

-- ============================================================================
-- STORAGE BUCKETS (reference — create via Supabase Dashboard or CLI)
-- ============================================================================
-- CREATE POLICY on storage.objects for each bucket as needed
--
-- Bucket: vendor-avatars   (public)  — vendor profile images
-- Bucket: vendor-banners   (public)  — vendor storefront banners
-- Bucket: product-images   (public)  — product gallery uploads
-- ============================================================================
