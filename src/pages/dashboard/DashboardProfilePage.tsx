import { useVendorContext } from '@/contexts/VendorContext';
import VendorProfileForm from '@/components/dashboard/VendorProfileForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function DashboardProfilePage() {
  const { vendor, updateVendor, isLoading } = useVendorContext();

  if (isLoading) return <LoadingSpinner />;

  if (!vendor) {
    return (
      <div className="dashboard-page">
        <h1>Profile</h1>
        <p>Vendor profile not found.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <VendorProfileForm vendor={vendor} onSave={updateVendor} />
    </div>
  );
}
