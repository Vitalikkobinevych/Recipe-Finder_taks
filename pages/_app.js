import '../styles/globals.css';
import { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingState from '../components/LoadingState';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <Suspense fallback={<LoadingState />}>
      {isLoading ? <LoadingState /> : <Component {...pageProps} />}
    </Suspense>
  );
}

export default MyApp;
