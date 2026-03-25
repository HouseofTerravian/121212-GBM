import { Link } from 'react-router-dom';

export default function SellerAgreementPage() {
  return (
    <>
      <section className="legal-hero">
        <h1>Seller Agreement</h1>
        <p>Last Updated: March 2026</p>
      </section>

      <div className="legal-content">
        <h2>Eligibility</h2>
        <p>
          To sell on 121212 GBM, you must be at least 18 years of age, provide
          accurate business information, and self-identify as a member of the
          global Black community. No documentation is required to prove racial
          or ethnic identity. GBM operates on a trust-based self-identification
          model.
        </p>

        <h2>Account Responsibilities</h2>
        <p>
          Vendors are responsible for maintaining accurate storefront
          information, fulfilling orders promptly, and responding to customer
          inquiries in a timely manner. You agree to provide truthful product
          descriptions and images. Misrepresentation of products may result in
          listing removal or account suspension.
        </p>

        <h2>Fee Structure</h2>
        <p>
          GBM charges a platform fee on each completed sale, based on your
          subscription tier. The Griot (Free) plan carries a 20% platform fee.
          The Merchant plan ($49/month) carries a 10% platform fee. The Mogul
          plan ($200/month) carries a 4% platform fee. All plans have zero
          setup fees. Subscription fees are billed monthly and are
          non-refundable for the current billing period.
        </p>

        <h2>Payouts</h2>
        <p>
          Vendor earnings are processed after order confirmation and
          fulfillment. Payouts are issued on a rolling basis, typically within
          3-7 business days depending on your payment provider. GBM reserves
          the right to hold payouts if there are unresolved disputes or
          suspected fraudulent activity on the account.
        </p>

        <h2>Content Ownership</h2>
        <p>
          Vendors retain full ownership of their product listings, images,
          descriptions, and storefront content. By listing on GBM, you grant
          us a non-exclusive, royalty-free license to display, distribute, and
          promote your content within the platform and associated marketing
          channels.
        </p>

        <h2>Prohibited Items</h2>
        <p>
          Vendors may not list counterfeit goods, stolen property, weapons,
          illegal substances, or any items that violate applicable law. GBM
          also prohibits items that are culturally exploitative or
          misrepresent Black culture for commercial gain. Violations will
          result in immediate listing removal and potential account
          termination.
        </p>

        <h2>Dispute Resolution</h2>
        <p>
          In the event of a dispute between a vendor and a buyer, GBM will
          facilitate mediation in good faith. If a resolution cannot be
          reached, GBM reserves the right to issue refunds or take other
          corrective action as deemed appropriate. Vendors agree to
          participate in the dispute resolution process in a timely manner.
        </p>

        <h2>Termination</h2>
        <p>
          Either party may terminate this agreement at any time. Vendors may
          close their storefront through account settings. GBM reserves the
          right to terminate vendor accounts that violate this agreement, the
          Terms & Conditions, or community standards. Upon termination,
          outstanding earnings will be paid out within 30 days, subject to any
          holds for unresolved disputes.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about this Seller Agreement, contact us at{' '}
          <a href="mailto:contact@121212.market">contact@121212.market</a>.
        </p>

        <p className="legal-highlight">
          This Seller Agreement is maintained by MCM Enterprises, a DBA of
          SlateRiver LLC, a New Mexico LLC. See also our{' '}
          <Link to="/terms">Terms & Conditions</Link> and{' '}
          <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </div>
    </>
  );
}
