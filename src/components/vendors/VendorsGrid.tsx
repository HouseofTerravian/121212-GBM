import type { StaticVendor } from '@/types';
import VendorDirectoryCard from '@/components/vendors/VendorDirectoryCard';

interface VendorsGridProps {
  vendors: StaticVendor[];
}

export default function VendorsGrid({ vendors }: VendorsGridProps) {
  if (vendors.length === 0) {
    return (
      <div className="no-results">
        <p>No vendors found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="vendors-grid">
      {vendors.map((vendor) => (
        <VendorDirectoryCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
}
