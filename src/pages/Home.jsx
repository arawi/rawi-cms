import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import PostCard from '../components/PostCard'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'

function Home() {
  const { getPublishedPosts, settings } = useBlog()
  const [currentPage, setCurrentPage] = useState(1)

  const posts = getPublishedPosts()
  const postsPerPage = settings.postsPerPage
  const totalPages = Math.ceil(posts.length / postsPerPage)

  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage)

  return (
    <>
      <SEO />
      <div className="container">
        {/* Hero Section - Left Aligned */}
        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              Simple & Fast
            </span>
            <h1>Publish faster with Rawi.</h1>
            <p>
              A streamlined content management system that gets out of your way.
              Write in Markdown, organize with categories, and publish with confidence.
            </p>
            <div className="hero-actions">
              <Link to="/admin/new" className="btn btn-primary btn-large">
                Start Writing
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/about" className="btn btn-secondary btn-large">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Posts Section */}
        <section className="posts-section">
          <div className="section-header">
            <span className="section-label">Blog</span>
            <h2 className="section-title">Latest Posts</h2>
          </div>

          {currentPosts.length > 0 ? (
            <>
              <div className="posts-grid">
                {currentPosts.map(post => (
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
              <p>No posts yet. Start writing your first post!</p>
              <Link to="/admin/new" className="btn btn-primary">Create Post</Link>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

export default Home
