import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children, title = 'Recipe Finder' }) => {
  return (
    <>
      <Head>
        <title>{title} | Recipe Finder App</title>
        <meta
          name="description"
          content="Find delicious recipes with our Recipe Finder App"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 shadow-md">
          <div className="container mx-auto px-4 py-4">
            <Link href="/">
              <h1 className="text-2xl font-bold text-white">Recipe Finder</h1>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">{children}</main>

        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>
              © {new Date().getFullYear()} Recipe Finder App. All rights
              reserved.
            </p>
            <p className="text-sm mt-2">
              Powered by{' '}
              <a
                href="https://spoonacular.com/food-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Spoonacular API
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
