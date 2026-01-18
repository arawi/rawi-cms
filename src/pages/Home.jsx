import { useState } from 'react'
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
        <section className="hero">
          <h1>Welcome to {settings.siteName}</h1>
          <p>{settings.siteDescription}</p>
        </section>

        <section className="posts-section">
          <h2 className="section-title">Latest Posts</h2>
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
            <p className="no-posts">No posts yet. Check back soon!</p>
          )}
        </section>
      </div>
    </>
  )
}

export default Home
