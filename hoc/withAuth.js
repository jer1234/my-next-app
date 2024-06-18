import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/error');
      }
    }, [status]);

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (status === 'unauthenticated') {
      return null; // Return null until redirection happens
    }

    return <Component {...props} />;
  };
}
