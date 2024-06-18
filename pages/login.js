import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

import Image from 'next/image';


export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/users');
    }
  }, [session]);

  return (
    <div>
    <Header title="Zurich Web Portal" />
    <div className="container text-center">
      <div className="row justify-content-center align-items-center">
        <div className="col-auto pe-0">
            <Image
            src="/g-img.png"
            width={50}
            height={50}
            alt="Picture of the author"
            />
        </div>
        <div className="col-auto pe-0">
          <button className="btn btn-primary" onClick={() => signIn('google')}>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
    <Footer content="Copyright - Fahmi - Zurich Web Portal Test" />
    </div>
  );
}
