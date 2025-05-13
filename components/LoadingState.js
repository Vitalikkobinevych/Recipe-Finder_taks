import { useEffect, useState } from 'react';

const LoadingState = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    const textTimer = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === 'Loading...') return 'Loading';
        return prev + '.';
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      clearInterval(textTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="flex flex-col justify-center items-center py-12 min-h-[200px] w-full">
      <div className="relative">
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        <div className="w-16 h-16 border-l-4 border-r-4 border-transparent rounded-full animate-spin absolute top-0 animate-pulse"></div>
      </div>
      <span className="mt-6 text-lg text-gray-700 font-medium">
        {loadingText}
      </span>
      <p className="text-sm text-gray-500 mt-2">
        Please wait, fetching your recipes...
      </p>
    </div>
  );
};

export default LoadingState;
