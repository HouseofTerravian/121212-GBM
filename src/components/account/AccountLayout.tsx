import { NavLink, Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';

export default function AccountLayout() {
  const { user } = useAuth();

  return (
    <div className="account-layout">
      <aside className="account-sidebar">
        <div className="account-sidebar-header">
          <h2>{user?.displayName ?? 'My Account'}</h2>
        </div>
        <nav className="account-sidebar-nav">
          <NavLink
            to="/account/orders"
            className={({ isActive }) =>
              `account-nav-link${isActive ? ' active' : ''}`
            }
          >
            My Orders
          </NavLink>
        </nav>
        <div className="account-sidebar-footer">
          <Link to="/shop" className="account-back-link">
            Back to Shop
          </Link>
        </div>
      </aside>
      <main className="account-main">
        <Outlet />
      </main>
    </div>
  );
}
