import { Outlet } from 'react-router-dom';
import { VendorProvider } from '@/contexts/VendorContext';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout() {
  return (
    <VendorProvider>
      <div className="dashboard-layout">
        <DashboardSidebar />
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </VendorProvider>
  );
}
