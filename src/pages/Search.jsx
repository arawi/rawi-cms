import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import PostCard from '../components/PostCard'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'

function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { searchPosts, settings } = useBlog()
  const [currentPage, setCurrentPage] = useState(1)

  const results = searchPosts(query)
  const postsPerPage = settings.postsPerPage
  const totalPages = Math.ceil(results.length / postsPerPage)

  const startIndex = (currentPage - 1) * postsPerPage
  const currentResults = results.slice(startIndex, startIndex + postsPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [query])

  return (
    <>
      <SEO
        title={`Search: ${query}`}
        description={`Search results for "${query}"`}
      />
      <div className="container">
        <header className="page-header">
          <Link to="/" className="back-link">&larr; Back to Home</Link>
          <h1>Search Results</h1>
          {query && (
            <p>
              {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </p>
          )}
        </header>

        {!query ? (
          <div className="no-posts">
            <p>Enter a search term to find posts.</p>
          </div>
        ) : currentResults.length > 0 ? (
          <>
            <div className="posts-grid">
              {currentResults.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="no-posts">
            <p>No posts found matching your search.</p>
            <Link to="/" className="btn btn-primary">Browse All Posts</Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Search
