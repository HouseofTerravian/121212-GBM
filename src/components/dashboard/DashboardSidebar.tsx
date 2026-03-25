import { NavLink, Link } from 'react-router-dom';
import { useVendorContext } from '@/contexts/VendorContext';

const NAV_ITEMS = [
  { label: 'Overview', to: '/dashboard', end: true },
  { label: 'Products', to: '/dashboard/products', end: false },
  { label: 'Orders', to: '/dashboard/orders', end: false },
  { label: 'Profile', to: '/dashboard/profile', end: false },
  { label: 'Analytics', to: '/dashboard/analytics', end: false },
  { label: 'Settings', to: '/dashboard/settings', end: false },
];

export default function DashboardSidebar() {
  const { vendor } = useVendorContext();

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-brand">
        <h2 className="sidebar-store-name">{vendor?.storefrontName ?? 'My Store'}</h2>
        {vendor && (
          <span className={`sidebar-tier-badge tier-${vendor.tier.toLowerCase()}`}>
            {vendor.tier}
          </span>
        )}
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `sidebar-nav-item${isActive ? ' active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/" className="sidebar-back-link">
          &larr; Back to Store
        </Link>
      </div>
    </aside>
  );
}
