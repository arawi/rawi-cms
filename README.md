# Rawi CMS

A simplified WordPress-like blog content management system built with React and Vite.

## Features

- **Easy Content Management** - Create, edit, and publish blog posts with a simple admin interface
- **Markdown Support** - Write content in Markdown with full syntax support
- **Categories & Tags** - Organize your content effectively
- **SEO Optimized** - Built-in meta tags, Open Graph, and Twitter Cards
- **Responsive Design** - Looks great on all devices
- **Dark Mode** - Toggle between light and dark themes
- **Fast & Lightweight** - Built with React 18 and Vite for optimal performance
- **No Database Required** - Content stored in browser's localStorage

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/rawi-cms.git

# Navigate to the project
cd rawi-cms

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Deployment

### Netlify

This project includes a `netlify.toml` configuration and GitHub Actions workflow for automatic deployment.

1. Create a new site on Netlify
2. Add the following secrets to your GitHub repository:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
   - `NETLIFY_SITE_ID`: Your Netlify site ID

3. Push to the `main` branch to trigger deployment

### Manual Deployment

1. Run `npm run build`
2. Upload the `dist` folder to your hosting provider

## Project Structure

```
rawi-cms/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── data/           # Initial data and constants
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── styles/         # CSS stylesheets
│   └── utils/          # Utility functions
├── .github/
│   └── workflows/      # GitHub Actions workflows
├── netlify.toml        # Netlify configuration
└── vite.config.js      # Vite configuration
```

## Admin Panel

Access the admin panel at `/admin` to:

- View dashboard with statistics
- Create and edit blog posts
- Manage post categories and tags
- Configure site settings

## Technologies Used

- [React 18](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [React Router](https://reactrouter.com/) - Client-side routing
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [React Helmet Async](https://github.com/staylor/react-helmet-async) - Document head management
- [date-fns](https://date-fns.org/) - Date formatting

## License

MIT License - feel free to use this project for your own blog!
