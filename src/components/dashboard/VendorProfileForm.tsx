import { useState, type FormEvent } from 'react';
import { CATEGORIES } from '@/data/categories';
import type { Vendor, CategorySlug } from '@/types';

interface VendorProfileFormProps {
  vendor: Vendor;
  onSave: (updates: Partial<Vendor>) => void;
}

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Nigeria',
  'Ghana',
  'Kenya',
  'South Africa',
  'Jamaica',
  'Trinidad and Tobago',
  'Brazil',
  'France',
  'Germany',
  'Netherlands',
  'Barbados',
  'Ethiopia',
  'Senegal',
  'Australia',
  'Colombia',
  'Other',
];

export default function VendorProfileForm({ vendor, onSave }: VendorProfileFormProps) {
  const [storefrontName, setStorefrontName] = useState(vendor.storefrontName);
  const [bio, setBio] = useState(vendor.bio ?? '');
  const [country, setCountry] = useState(vendor.country);
  const [categoryId, setCategoryId] = useState<string>(vendor.categoryId ?? 'fashion');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!storefrontName.trim()) return;
    onSave({
      storefrontName: storefrontName.trim(),
      bio: bio.trim() || undefined,
      country,
      categoryId,
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Vendor Profile</h2>

      <div className="product-form-group">
        <label htmlFor="vp-name">Storefront Name</label>
        <input
          id="vp-name"
          type="text"
          value={storefrontName}
          onChange={(e) => setStorefrontName(e.target.value)}
          required
        />
      </div>

      <div className="product-form-group">
        <label htmlFor="vp-bio">Bio</label>
        <textarea
          id="vp-bio"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell your story..."
        />
      </div>

      <div className="product-form-row">
        <div className="product-form-group">
          <label htmlFor="vp-country">Country</label>
          <select
            id="vp-country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="product-form-group">
          <label htmlFor="vp-category">Primary Category</label>
          <select
            id="vp-category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value as CategorySlug)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Avatar / Banner placeholders */}
      <div className="product-form-group">
        <label>Avatar</label>
        <p className="form-placeholder-text">Avatar upload coming soon</p>
      </div>
      <div className="product-form-group">
        <label>Banner</label>
        <p className="form-placeholder-text">Banner upload coming soon</p>
      </div>

      {/* Read-only tier info */}
      <div className="product-form-group">
        <label>Current Tier</label>
        <p className="form-readonly-text">
          {vendor.tier} &mdash; {vendor.listingLimit === Infinity ? 'Unlimited' : vendor.listingLimit} listing
          {vendor.listingLimit !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="product-form-actions">
        <button type="submit" className="btn btn-primary">
          Save Profile
        </button>
      </div>
    </form>
  );
}
