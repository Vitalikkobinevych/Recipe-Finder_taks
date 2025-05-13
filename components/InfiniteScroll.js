import { useEffect, useState, useRef } from 'react';

const InfiniteScroll = ({
  loadMore,
  hasMore,
  isLoading,
  loadingComponent,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && hasMore && !isLoading) {
      loadMore();
    }
  }, [isVisible, hasMore, isLoading, loadMore]);

  return (
    <>
      {children}
      {hasMore && (
        <div ref={loaderRef} className="w-full py-4">
          {isLoading && loadingComponent}
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
