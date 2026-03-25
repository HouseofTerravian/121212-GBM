import { Link } from 'react-router-dom'

const LEGAL_LINKS = [
  { to: '/terms', label: 'Terms' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/accessibility', label: 'Accessibility' },
  { to: '/nondiscrimination', label: 'Non-Discrimination' },
  { to: '/disclaimer', label: 'Disclaimer' },
  { to: '/seller-agreement', label: 'Seller Agreement' },
]

const ECOSYSTEM_LINKS = [
  { href: 'https://121212.black', label: '121212.black' },
  { href: 'https://121212territories.org', label: '121212territories.org' },
  { href: 'https://121212.reviews', label: '121212.reviews' },
  { href: 'https://121212.community', label: '121212.community' },
  { href: 'https://my121212.space', label: 'my121212.space' },
  { href: 'https://121212.events', label: '121212.events' },
  { href: 'https://121212.music', label: '121212.music' },
  { href: 'https://121212.culture', label: '121212.culture' },
  { href: 'https://121212.law', label: '121212.law' },
  { href: 'https://121212.movement', label: '121212.movement' },
  { href: 'https://121212.ai', label: '121212.ai' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-logo">121212 GBM</p>
          <p className="footer-tagline">By Us. For All.</p>
        </div>

        <div className="footer-legal">
          <h4 className="footer-heading">Legal</h4>
          <div className="footer-legal-links">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="footer-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-ecosystem">
          <h4 className="footer-heading">Ecosystem</h4>
          <div className="footer-ecosystem-links">
            {ECOSYSTEM_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; 2026 121212 GBM &mdash; The Global Black Marketplace. All rights reserved.
        </p>
        <p className="footer-entity">
          Operated by MCM Enterprises, a DBA of SlateRiver LLC, a New Mexico LLC
        </p>
      </div>
    </footer>
  )
}
