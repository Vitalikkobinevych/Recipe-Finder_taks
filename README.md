# Recipe Finder Application

## Overview

Recipe Finder is a web application that allows users to search for recipes based on ingredients, cuisine types, and preparation time. The application provides a seamless user experience with infinite scrolling, optimized image loading, and server-side rendering for faster initial page loads.

## Features

- **Recipe Search**: Search recipes by ingredients, cuisine type, and maximum preparation time
- **Infinite Scrolling**: Automatically load more recipes as the user scrolls down the page
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Server-Side Rendering (SSR)**: Fast initial page loads with pre-rendered content
- **Image Optimization**: Optimized image loading with placeholders and progressive loading
- **Caching**: API responses are cached for 1 minute to reduce API calls and improve performance
- **Enhanced UX**: Loading indicators, scroll-to-top button, and smoothly animated transitions

## Architecture

The application is built using:

- **Next.js**: React framework with SSR capabilities
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Spoonacular API**: External API for recipe data
- **React Hooks**: For state management and component lifecycle
- **Intersection Observer API**: For implementing infinite scrolling
- **localStorage**: For client-side caching of API responses

## Project Structure

```
recipe-finder/
├── components/          # Reusable UI components
│   ├── InfiniteScroll.js    # Component for infinite scrolling
│   ├── Layout.js            # Main layout wrapper
│   ├── LoadingState.js      # Loading indicator
│   ├── OptimizedImage.js    # Image optimization component
│   ├── RecipeCard.js        # Individual recipe card
│   ├── ScrollToTop.js       # Button to scroll to top
│   └── SearchForm.js        # Recipe search form
├── pages/               # Application pages
│   ├── _app.js             # Next.js App component
│   ├── index.js            # Home page with search form
│   └── recipes/
│       ├── index.js        # Recipe search results page
│       └── [id].js         # Recipe details page
├── public/              # Static assets
│   └── images/
│       └── placeholder-food.jpg    # Placeholder for recipe images
├── styles/              # CSS files
│   └── globals.css          # Global styles
├── utils/               # Utility functions
│   ├── api.js               # API interaction functions
│   └── mockData.js          # Mock data for development
├── .env.local           # Environment variables (not in git)
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Project dependencies
```

## Setup & Installation

### Prerequisites

- Node.js 14.x or later
- npm or yarn package manager
- Spoonacular API key (get one at [spoonacular.com/food-api](https://spoonacular.com/food-api))

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/recipe-finder.git
   cd recipe-finder
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your Spoonacular API key:

   ```
   SPOONACULAR_API_KEY=your_api_key_here
   NEXT_PUBLIC_SPOONACULAR_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm start
# or
yarn start
```

## API Usage Notes

- The free tier of Spoonacular API has a limited number of requests per day
- If you encounter `401 Unauthorized` errors, check your API key or consider using mock data
- To use mock data, set `USE_MOCK_DATA = true` in `utils/api.js`

## Performance Optimizations

1. **Server-Side Rendering**: Initial content is rendered on the server for faster First Contentful Paint (FCP)
2. **API Response Caching**: Responses are cached for 1 minute to reduce API calls
3. **Image Optimization**: Images are lazy-loaded and optimized for different screen sizes
4. **Code Splitting**: Only necessary JavaScript is loaded for each page

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
