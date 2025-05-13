const API_BASE_URL = 'https://api.spoonacular.com';

const getApiKey = () => {
  if (typeof window === 'undefined') {
    return process.env.SPOONACULAR_API_KEY;
  }

  return process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
};

export async function searchRecipes(
  query = '',
  cuisine = '',
  maxReadyTime = '',
  offset = 0,
  number = 12
) {
  try {
    const API_KEY = getApiKey();
    let url = `${API_BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}`;

    if (query) url += `&query=${encodeURIComponent(query)}`;
    if (cuisine) url += `&cuisine=${encodeURIComponent(cuisine)}`;
    if (maxReadyTime) url += `&maxReadyTime=${maxReadyTime}`;

    url += `&offset=${offset}&number=${number}`;

    url += '&addRecipeInformation=true';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      results: data.results,
      totalResults: data.totalResults,
    };
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
}

export async function getRecipeDetails(recipeId) {
  try {
    const API_KEY = getApiKey();
    const url = `${API_BASE_URL}/recipes/${recipeId}/information?apiKey=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
}

export async function cacheFetchRequest(fetchFunction, ...args) {
  if (typeof window === 'undefined') {
    return await fetchFunction(...args);
  }

  const cacheKey = `spoonacular_${fetchFunction.name}_${JSON.stringify(args)}`;

  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);

    const now = Date.now();
    if (now - timestamp < 60000) {
      console.log('Using cached data for:', cacheKey);
      return data;
    }
  }

  const data = await fetchFunction(...args);

  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    })
  );

  return data;
}

export const cuisineOptions = [
  'African',
  'American',
  'British',
  'Cajun',
  'Caribbean',
  'Chinese',
  'Eastern European',
  'European',
  'French',
  'German',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Japanese',
  'Jewish',
  'Korean',
  'Latin American',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Nordic',
  'Southern',
  'Spanish',
  'Thai',
  'Vietnamese',
];
