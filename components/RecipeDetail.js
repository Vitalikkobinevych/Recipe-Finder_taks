import { useRouter } from 'next/router';
import ImageWithFallback from './ImageWithFallback';
const FALLBACK_IMAGE_SRC = '/placeholder.svg'; // Or your chosen placeholder image path

const RecipeDetail = ({ recipe }) => {
  const router = useRouter();

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-96 w-full">
        <ImageWithFallback
          src={recipe.image}
          fallbackSrc={FALLBACK_IMAGE_SRC}
          alt={recipe.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-700 font-medium"
          >
            Back
          </button>
        </div>

        {/* Info Badges */}
        <div className="flex flex-wrap gap-4 mb-6">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Ready in {recipe.readyInMinutes} minutes
          </span>

          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Servings: {recipe.servings}
          </span>

          {recipe.healthScore && (
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              Health Score: {recipe.healthScore}
            </span>
          )}

          {recipe.vegetarian && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Vegetarian
            </span>
          )}

          {recipe.vegan && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Vegan
            </span>
          )}

          {recipe.glutenFree && (
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              Gluten Free
            </span>
          )}

          {recipe.dairyFree && (
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              Dairy Free
            </span>
          )}
        </div>

        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ingredients
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recipe.extendedIngredients?.map((ingredient) => (
              <li key={ingredient.id} className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-green-500 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        {recipe.instructions && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Instructions
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            />
          </div>
        )}

        {/* Summary */}
        {recipe.summary && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Summary
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
