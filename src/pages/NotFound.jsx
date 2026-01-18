import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

function NotFound() {
  return (
    <>
      <SEO title="404 - Page Not Found" />
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="btn btn-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound
