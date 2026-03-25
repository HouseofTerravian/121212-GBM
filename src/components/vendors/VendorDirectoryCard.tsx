import { Link } from 'react-router-dom';
import type { StaticVendor } from '@/types';

interface VendorDirectoryCardProps {
  vendor: StaticVendor;
}

function getBannerClass(banner: string): string {
  switch (banner) {
    case 'red':
      return 'red-bg';
    case 'tan':
      return 'tan-bg';
    default:
      return '';
  }
}

function getTierClass(tier: string): string {
  return `tier-${tier.toLowerCase()}`;
}

function vendorSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function VendorDirectoryCard({ vendor }: VendorDirectoryCardProps) {
  return (
    <Link to={`/vendor/${vendorSlug(vendor.name)}`} className="vdir-card-link">
      <div className="vdir-card">
        <div className="vdir-card-header">
          <div className={`vdir-card-banner-placeholder ${getBannerClass(vendor.banner)}`} />
          <div className="vdir-avatar-wrap">
            <img className="vdir-avatar" src={vendor.avatar} alt={vendor.name} loading="lazy" />
            {vendor.verified && <span className="vdir-badge-check" />}
          </div>
        </div>
        <div className="vdir-card-body">
          <h3 className="vdir-name">{vendor.name}</h3>
          <p className="vdir-location">{vendor.location}</p>
          <span className="vdir-category">{vendor.category}</span>
          <p className="vdir-desc">{vendor.desc}</p>
          <div className="vdir-stats-row">
            <span className="vdir-stat">{vendor.products} products</span>
            <span className="vdir-stat">{'★'} {vendor.rating}</span>
            <span className="vdir-stat">{vendor.sales} sales</span>
          </div>
          <div className="vdir-tier">
            <span className={`tier-badge ${getTierClass(vendor.tier)}`}>{vendor.tier}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
