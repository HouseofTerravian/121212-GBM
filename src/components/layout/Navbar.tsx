import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';
import CartIcon from '@/components/cart/CartIcon';

export default function Navbar() {
  const { user, isAuthenticated, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  const handleSignOut = async () => {
    close();
    await signOut();
  };

  return (
    <nav ref={navRef} id="mainNav" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-content">
        <Link to="/" className="logo" onClick={close}>121212 GBM</Link>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
          <li><Link to="/shop" onClick={close}>Shop</Link></li>
          <li><Link to="/vendors" onClick={close}>Vendors</Link></li>
          <li><Link to="/sell" onClick={close}>Start Selling</Link></li>
          <li><Link to="/about" onClick={close}>About</Link></li>

          {!isAuthenticated ? (
            <>
              <li><Link to="/login" onClick={close}>Login</Link></li>
              <li><Link to="/register" className="nav-cta" onClick={close}>Join Now</Link></li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to={user?.role === 'vendor' ? '/dashboard' : '/account/orders'}
                  onClick={close}
                >
                  {user?.role === 'vendor' ? 'Dashboard' : 'My Account'}
                </Link>
              </li>
              <li>
                <button className="nav-signout" onClick={handleSignOut}>
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>

        <CartIcon />

        <button
          className="nav-hamburger"
          id="hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
