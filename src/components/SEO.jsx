import { Helmet } from 'react-helmet-async'
import { useBlog } from '../context/BlogContext'

function SEO({ title, description, image, article, slug }) {
  const { settings } = useBlog()
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : ''

  const seo = {
    title: title ? `${title} | ${settings.siteName}` : settings.siteName,
    description: description || settings.siteDescription,
    image: image || `${siteUrl}/og-image.png`,
    url: slug ? `${siteUrl}/${slug}` : siteUrl
  }

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Canonical */}
      <link rel="canonical" href={seo.url} />
    </Helmet>
  )
}

export default SEO
