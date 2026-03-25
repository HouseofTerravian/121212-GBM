import { useState, type FormEvent } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  }

  return (
    <section className="newsletter">
      <h2>Stay Connected</h2>
      <p>
        Get the latest from our vendors, exclusive deals, and community stories.
      </p>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="newsletter-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">
          Subscribe
        </button>
      </form>
      {submitted && (
        <p className="newsletter-status">
          You&rsquo;re in. Welcome to the movement.
        </p>
      )}
    </section>
  );
}
