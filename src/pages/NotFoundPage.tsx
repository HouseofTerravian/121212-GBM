import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </section>
  );
}
