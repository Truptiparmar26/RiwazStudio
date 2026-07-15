import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section grid min-h-screen place-items-center pt-36 text-center">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1 className="headline mt-4">Frame not found.</h1>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-champagne px-6 py-4 font-extrabold text-black">Return Home</Link>
      </div>
    </section>
  );
}
