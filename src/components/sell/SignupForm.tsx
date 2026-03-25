import { useState, type FormEvent } from 'react';

interface SignupFormProps {
  selectedPlan: string;
}

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Nigeria',
  'Ghana',
  'Kenya',
  'South Africa',
  'Jamaica',
  'Trinidad and Tobago',
  'Brazil',
  'France',
  'Germany',
  'Netherlands',
  'Barbados',
  'Ethiopia',
  'Senegal',
  'Australia',
  'Colombia',
  'Other',
];

const CATEGORIES = [
  'Fashion & Apparel',
  'Art & Prints',
  'Jewelry & Accessories',
  'Health & Wellness',
  'Beauty & Skincare',
  'Food & Beverage',
  'Home & Living',
  'Books & Education',
  'Digital Products',
  'Services',
  'Other',
];

export default function SignupForm({ selectedPlan }: SignupFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section className="signup-section" id="signup">
      <div className="signup-inner">
        <h2>Launch Your Storefront</h2>
        <p className="selected-plan">
          Selected Plan: <strong>{selectedPlan}</strong>
        </p>
        <p className="community-identity">
          121212 GBM is a marketplace built by and for the global Black
          community. Vendor participation is rooted in self-identification.
          We do not require documentation to prove identity — we trust our
          community.
        </p>

        {submitted ? (
          <div className="form-success">
            <h3>Application received!</h3>
            <p>
              We will review your submission and get back to you shortly.
              Welcome to the movement.
            </p>
          </div>
        ) : (
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="storeName">Business / Storefront Name</label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select id="country" name="country" required>
                  <option value="">Select your country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="category">Primary Category</label>
                <select id="category" name="category" required>
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="about">Tell Us About Your Business</label>
              <textarea
                id="about"
                name="about"
                rows={4}
                placeholder="What do you sell? What makes your products special?"
              />
            </div>

            <div className="form-group form-checkbox">
              <input type="checkbox" id="agreement" name="agreement" required />
              <label htmlFor="agreement">
                I self-identify as a member of the global Black community and
                agree to the Seller Agreement and Terms & Conditions.
              </label>
            </div>

            <button
              type="submit"
              className="btn-primary form-submit"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Launch My Storefront'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
