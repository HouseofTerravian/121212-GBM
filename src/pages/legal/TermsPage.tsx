import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <>
      <section className="legal-hero">
        <h1>Terms & Conditions</h1>
        <p>Last Updated: March 2026</p>
      </section>

      <div className="legal-content">
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using the 121212 Global Black Marketplace ("GBM"),
          operated by MCM Enterprises, a DBA of SlateRiver LLC, a New Mexico
          LLC, you agree to be bound by these Terms & Conditions. If you do not
          agree, you may not use the platform. These terms apply to all users,
          including buyers, sellers, and visitors.
        </p>

        <h2>Eligibility</h2>
        <p>
          You must be at least 18 years of age to create an account or make
          purchases on GBM. By using this platform, you represent that you meet
          this requirement and that all information you provide is accurate and
          complete.
        </p>

        <h2>User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account
          credentials and for all activity that occurs under your account. You
          agree to notify us immediately of any unauthorized use. GBM reserves
          the right to suspend or terminate accounts that violate these terms.
        </p>

        <h2>Black Identity and Community Standards</h2>
        <p>
          GBM is a marketplace built by and for the global Black community.
          Vendor participation is rooted in self-identification. We do not
          require documentation to verify racial or ethnic identity. By listing
          products as a vendor, you affirm your connection to the Black diaspora
          community. Misrepresentation of identity for commercial gain may
          result in account termination.
        </p>

        <h2>Marketplace Conduct</h2>
        <p>
          All users agree to conduct themselves with respect toward the community.
          Harassment, hate speech, fraud, or the listing of prohibited items will
          result in immediate account suspension. GBM reserves the right to
          remove any content or user that undermines the integrity of the
          marketplace.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content, branding, and technology comprising the GBM platform are
          the intellectual property of MCM Enterprises / SlateRiver LLC.
          Vendors retain ownership of their product listings, images, and
          descriptions, but grant GBM a non-exclusive license to display and
          promote said content within the platform.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          GBM provides the platform on an "as-is" basis. We are not liable for
          any direct, indirect, incidental, or consequential damages arising
          from the use of the marketplace. This includes but is not limited to
          product quality disputes between buyers and sellers, shipping issues,
          or loss of revenue.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of the State of New Mexico,
          United States. Any disputes shall be resolved in the courts of New
          Mexico, unless otherwise agreed upon through binding arbitration.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about these Terms & Conditions, contact us at{' '}
          <a href="mailto:contact@121212.market">contact@121212.market</a>.
        </p>

        <p className="legal-highlight">
          By using GBM, you acknowledge that you have read, understood, and
          agree to these Terms & Conditions. See also our{' '}
          <Link to="/privacy">Privacy Policy</Link> and{' '}
          <Link to="/seller-agreement">Seller Agreement</Link>.
        </p>
      </div>
    </>
  );
}
