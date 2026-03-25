import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <>
      <section className="legal-hero">
        <h1>Privacy Policy</h1>
        <p>Last Updated: March 2026</p>
      </section>

      <div className="legal-content">
        <h2>Information We Collect</h2>
        <p>
          We collect information you provide directly, including your name,
          email address, shipping address, payment information, and any content
          you submit through your account or storefront. We also collect usage
          data such as browser type, IP address, pages visited, and interaction
          patterns through standard analytics tools.
        </p>

        <h2>How We Use Information</h2>
        <p>
          Your information is used to operate the marketplace, process
          transactions, communicate with you about your account, improve our
          services, and ensure platform security. We do not sell your personal
          information to third parties. Vendor business information may be
          displayed publicly as part of your storefront.
        </p>

        <h2>Data Storage & Security</h2>
        <p>
          We implement industry-standard security measures to protect your
          data, including encryption in transit and at rest. However, no method
          of electronic storage is completely secure. We encourage you to use
          strong passwords and safeguard your account credentials.
        </p>

        <h2>Cookies</h2>
        <p>
          GBM uses cookies and similar technologies to maintain session state,
          remember preferences, and analyze platform usage. You may disable
          cookies in your browser settings, but doing so may affect platform
          functionality.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We use third-party services for payment processing, analytics, and
          email communication. These providers have their own privacy policies
          governing the use of your information. We only share the minimum data
          necessary to provide our services.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal
          information at any time by contacting us or through your account
          settings. You may also request a copy of the data we hold about you.
          We will respond to all such requests within 30 days.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          GBM is not intended for use by anyone under the age of 18. We do not
          knowingly collect personal information from minors. If we become
          aware that a minor has provided us with personal data, we will take
          steps to delete that information.
        </p>

        <h2>Changes to Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated revision date. Continued use of
          the platform after changes constitutes acceptance of the revised
          policy.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related inquiries, contact us at{' '}
          <a href="mailto:contact@121212.market">contact@121212.market</a>.
        </p>

        <p className="legal-highlight">
          This Privacy Policy is maintained by MCM Enterprises, a DBA of
          SlateRiver LLC, a New Mexico LLC. See also our{' '}
          <Link to="/terms">Terms & Conditions</Link>.
        </p>
      </div>
    </>
  );
}
