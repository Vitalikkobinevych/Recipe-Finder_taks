import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const SearchForm = ({ cuisineOptions }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxReadyTime, setMaxReadyTime] = useState('');
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  useEffect(() => {
    setIsNextEnabled(query || cuisine || maxReadyTime);
  }, [query, cuisine, maxReadyTime]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Створюємо об'єкт з параметрами запиту
    const queryParams = {};
    if (query) queryParams.query = query;
    if (cuisine) queryParams.cuisine = cuisine;
    if (maxReadyTime) queryParams.maxReadyTime = maxReadyTime;

    // Завжди починаємо з першої сторінки для нового пошуку
    queryParams.page = 1;

    // Переходимо на сторінку результатів з параметрами
    router.push({
      pathname: '/recipes',
      query: queryParams,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Find Your Perfect Recipe
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="query"
            className="block text-gray-700 font-medium mb-2"
          >
            What would you like to cook?
          </label>
          <input
            type="text"
            id="query"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ingredients or recipe name (e.g., pasta)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="cuisine"
            className="block text-gray-700 font-medium mb-2"
          >
            Cuisine Type
          </label>
          <select
            id="cuisine"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          >
            <option value="">All Cuisines</option>
            {cuisineOptions &&
              cuisineOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="maxReadyTime"
            className="block text-gray-700 font-medium mb-2"
          >
            Maximum Preparation Time (minutes)
          </label>
          <input
            type="number"
            id="maxReadyTime"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 30"
            min="1"
            value={maxReadyTime}
            onChange={(e) => setMaxReadyTime(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={!isNextEnabled}
            className={`px-6 py-2 rounded-md text-white font-medium ${
              isNextEnabled
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
