import { useState, type FormEvent } from 'react';
import { CATEGORIES } from '@/data/categories';
import type { Product, ProductType, CategorySlug } from '@/types';

interface ProductFormProps {
  product?: Product;
  vendorId: string;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

function generateId(): string {
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2, 12);
}

export default function ProductForm({ product, vendorId, onSave, onCancel }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [price, setPrice] = useState(product?.price ?? 0);
  const [compareAtPrice, setCompareAtPrice] = useState(product?.compareAtPrice ?? 0);
  const [categorySlug, setCategorySlug] = useState<CategorySlug>(
    product?.categorySlug ?? 'fashion',
  );
  const [productType, setProductType] = useState<ProductType>(product?.productType ?? 'physical');
  const [sku, setSku] = useState(product?.sku ?? '');
  const [stockQuantity, setStockQuantity] = useState(product?.stockQuantity ?? 0);
  const [tags, setTags] = useState(product?.tags?.join(', ') ?? '');
  const [isActive, setIsActive] = useState(product?.isActive ?? true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || price <= 0) return;

    const now = new Date().toISOString();
    onSave({
      id: product?.id ?? generateId(),
      vendorId,
      categoryId: categorySlug,
      categorySlug,
      name: name.trim(),
      description: description.trim(),
      price,
      compareAtPrice: compareAtPrice > 0 ? compareAtPrice : undefined,
      currency: 'USD',
      sku: sku.trim() || undefined,
      stockQuantity: stockQuantity > 0 ? stockQuantity : undefined,
      productType,
      isActive,
      isFeatured: product?.isFeatured ?? false,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      avgRating: product?.avgRating ?? 0,
      totalReviews: product?.totalReviews ?? 0,
      totalSold: product?.totalSold ?? 0,
      images: product?.images ?? [],
      createdAt: product?.createdAt ?? now,
      updatedAt: now,
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{product ? 'Edit Product' : 'New Product'}</h2>

      <div className="product-form-group">
        <label htmlFor="pf-name">Name</label>
        <input
          id="pf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="product-form-group">
        <label htmlFor="pf-description">Description</label>
        <textarea
          id="pf-description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="product-form-row">
        <div className="product-form-group">
          <label htmlFor="pf-price">Price ($)</label>
          <input
            id="pf-price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div className="product-form-group">
          <label htmlFor="pf-compare-price">Compare at Price ($)</label>
          <input
            id="pf-compare-price"
            type="number"
            min="0"
            step="0.01"
            value={compareAtPrice}
            onChange={(e) => setCompareAtPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="product-form-row">
        <div className="product-form-group">
          <label htmlFor="pf-category">Category</label>
          <select
            id="pf-category"
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value as CategorySlug)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div className="product-form-group">
          <label htmlFor="pf-type">Product Type</label>
          <select
            id="pf-type"
            value={productType}
            onChange={(e) => setProductType(e.target.value as ProductType)}
          >
            <option value="physical">Physical</option>
            <option value="digital">Digital</option>
            <option value="service">Service</option>
          </select>
        </div>
      </div>

      <div className="product-form-row">
        <div className="product-form-group">
          <label htmlFor="pf-sku">SKU</label>
          <input
            id="pf-sku"
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="Optional"
          />
        </div>
        <div className="product-form-group">
          <label htmlFor="pf-stock">Stock Quantity</label>
          <input
            id="pf-stock"
            type="number"
            min="0"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="product-form-group">
        <label htmlFor="pf-tags">Tags (comma separated)</label>
        <input
          id="pf-tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. handmade, organic, gift"
        />
      </div>

      <div className="product-form-group product-form-checkbox">
        <label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active (visible in store)
        </label>
      </div>

      {/* Image upload placeholder */}
      <div className="product-form-group">
        <label>Product Images</label>
        {product && product.images.length > 0 ? (
          <div className="product-form-images">
            {product.images.map((img) => (
              <img key={img.id} src={img.url} alt={img.altText ?? ''} className="product-form-thumb" />
            ))}
          </div>
        ) : (
          <p className="form-placeholder-text">Image upload coming soon</p>
        )}
      </div>

      <div className="product-form-actions">
        <button type="submit" className="btn btn-primary">
          {product ? 'Save Changes' : 'Create Product'}
        </button>
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
