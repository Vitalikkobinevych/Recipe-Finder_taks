import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import LoadingState from '../../components/LoadingState';
import { getRecipeDetails } from '../../utils/api';
import ImageWithFallback from '@/components/ImageWithFallback';

const FALLBACK_IMAGE_SRC = '/placeholder.svg';

export default function RecipeDetails({ recipe, error }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout title="Loading Recipe...">
        <LoadingState />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Error">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  if (!recipe) {
    return (
      <Layout title="Recipe Not Found">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Recipe Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            We couldn't find the recipe you're looking for.
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.back()}
          >
            Go Back to Results
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={recipe.title}>
      <div className="max-w-4xl mx-auto">
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => router.back()}
        >
          Back to Results
        </button>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {recipe.image && (
            <div className="relative w-full h-[400px]">
              <ImageWithFallback
                src={recipe.image}
                fallbackSrc={FALLBACK_IMAGE_SRC}
                alt={recipe.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {recipe.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Ready in {recipe.readyInMinutes} minutes
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Servings: {recipe.servings}
              </span>
              {recipe.vegetarian && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  Vegetarian
                </span>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
              <ul className="list-disc pl-5">
                {recipe.extendedIngredients?.map((ingredient, index) => (
                  <li key={index} className="mb-1">
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Instructions</h2>
              <div
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                className="prose max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const recipe = await getRecipeDetails(id);

    return {
      props: {
        recipe,
        error: null,
      },
    };
  } catch (error) {
    console.error('Error fetching recipe:', error);

    return {
      props: {
        recipe: null,
        error: 'Failed to load recipe details. Please try again later.',
      },
    };
  }
}
