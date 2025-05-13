import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import Layout from '../../components/Layout';
import RecipeCard from '../../components/RecipeCard';
import LoadingState from '../../components/LoadingState';
import InfiniteScroll from '../../components/InfiniteScroll';
import ScrollToTop from '../../components/ScrollToTop';
import { searchRecipes } from '../../utils/api';

export default function RecipesPage({
  initialRecipes,
  totalResults,
  error,
  searchParams,
}) {
  const router = useRouter();
  const [recipes, setRecipes] = useState(initialRecipes || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalResults > initialRecipes.length);

  const recipesPerPage = 12;

  const loadMoreRecipes = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);

      const nextPage = page + 1;
      const offset = page * recipesPerPage;

      const { query, cuisine, maxReadyTime } = searchParams;
      const { results } = await searchRecipes(
        query,
        cuisine,
        maxReadyTime,
        offset,
        recipesPerPage
      );

      if (results && results.length > 0) {
        setRecipes((prevRecipes) => [...prevRecipes, ...results]);
        setPage(nextPage);
        setHasMore(recipes.length + results.length < totalResults);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading more recipes:', err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, recipes.length, totalResults, searchParams]);

  const handleNewSearch = () => {
    router.push('/');
  };

  const getPageTitle = () => {
    const { query, cuisine, maxReadyTime } = searchParams;
    const parts = [];
    if (query) parts.push(`"${query}"`);
    if (cuisine) parts.push(`${cuisine} cuisine`);
    if (maxReadyTime) parts.push(`ready in ${maxReadyTime} minutes`);

    return parts.length > 0
      ? `Recipes for ${parts.join(', ')}`
      : 'Recipe Results';
  };

  const loadingIndicator = (
    <div className="flex justify-center items-center py-8">
      <div className="w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
      <span className="ml-4 text-gray-700">Loading more recipes...</span>
    </div>
  );

  if (error) {
    return (
      <Layout title="Error">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleNewSearch}
          >
            Try New Search
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Recipe Results">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
          <button
            onClick={handleNewSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            New Search
          </button>
        </div>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No recipes found
          </h2>
          <p className="text-gray-600">
            Try adjusting your search criteria or search for something else.
          </p>
        </div>
      ) : (
        <InfiniteScroll
          loadMore={loadMoreRecipes}
          hasMore={hasMore}
          isLoading={loading}
          loadingComponent={loadingIndicator}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {/* Інформація про результати пошуку */}
          <div className="mt-4 text-center text-gray-600">
            Showing {recipes.length} of {totalResults} recipes
          </div>
        </InfiniteScroll>
      )}

      {/* Кнопка "Завантажити ще" як альтернатива для користувачів, які не скролять */}
      {hasMore && !loading && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMoreRecipes}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Load More Recipes
          </button>
        </div>
      )}

      {/* Додаємо компонент для прокрутки вгору */}
      <ScrollToTop />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query, cuisine, maxReadyTime } = context.query;

  if (!query && !cuisine && !maxReadyTime) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const recipesPerPage = 12;
  const offset = 0;

  try {
    const { results, totalResults } = await searchRecipes(
      query,
      cuisine,
      maxReadyTime,
      offset,
      recipesPerPage
    );

    return {
      props: {
        initialRecipes: results,
        totalResults,
        error: null,
        searchParams: {
          query: query || null,
          cuisine: cuisine || null,
          maxReadyTime: maxReadyTime || null,
        },
      },
    };
  } catch (error) {
    console.error('Error searching recipes:', error);

    return {
      props: {
        initialRecipes: [],
        totalResults: 0,
        error: 'Failed to load recipes. Please try again later.',
        searchParams: {
          query: query || null,
          cuisine: cuisine || null,
          maxReadyTime: maxReadyTime || null,
        },
      },
    };
  }
}
