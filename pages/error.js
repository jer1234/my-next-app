import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ErrorPage() {
  return (
    <div>
    <Header title="Error: Unauthorized Access" />
    <div className="container text-center">
      <p>You must be logged in to access this page.</p>
      <Link href="/login">
      <div className="container">
      <button className="btn btn-primary" >Go to Login</button>
    </div>
      </Link>
    </div>
    <Footer content="Copyright - Fahmi - Zurich Web Portal Test" />
    </div>
  );
}
