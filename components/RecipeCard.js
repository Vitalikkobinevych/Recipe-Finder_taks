import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';
const FALLBACK_IMAGE_SRC = '/placeholder.svg'; // Or your chosen placeholder image path

const RecipeCard = ({ recipe }) => {
  return (
    <Link href={`/recipes/${recipe.id}`} legacyBehavior>
      <a className="block">
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full">
          <div className="relative h-48 w-full">
            <ImageWithFallback
              src={recipe.image}
              fallbackSrc={FALLBACK_IMAGE_SRC}
              alt={recipe.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
              {recipe.title}
            </h3>

            <div className="flex justify-between text-sm text-gray-600">
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {recipe.readyInMinutes} min
              </span>

              {recipe.healthScore && (
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Score: {recipe.healthScore}
                </span>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default RecipeCard;
