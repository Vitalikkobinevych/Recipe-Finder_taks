import Layout from '../components/Layout';
import SearchForm from '../components/SearchForm';
import { cuisineOptions } from '../utils/api';

export default function Home({ cuisineList }) {
  return (
    <Layout title="Search Recipes">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Find Your Perfect Recipe
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Looking for meal inspiration? Search thousands of recipes by
          ingredients, cuisine type, or preparation time.
        </p>
        <SearchForm cuisineOptions={cuisineList} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      cuisineList: cuisineOptions,
    },
  };
}
