import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import PostCard from '../components/PostCard'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'

function Category() {
  const { category } = useParams()
  const decodedCategory = decodeURIComponent(category)
  const { getPostsByCategory, settings } = useBlog()
  const [currentPage, setCurrentPage] = useState(1)

  const posts = getPostsByCategory(decodedCategory)
  const postsPerPage = settings.postsPerPage
  const totalPages = Math.ceil(posts.length / postsPerPage)

  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage)

  return (
    <>
      <SEO
        title={`${decodedCategory} - Category`}
        description={`Posts in the ${decodedCategory} category`}
        slug={`category/${category}`}
      />
      <div className="container">
        <header className="page-header">
          <Link to="/" className="back-link">&larr; Back to Home</Link>
          <h1>Category: {decodedCategory}</h1>
          <p>{posts.length} post{posts.length !== 1 ? 's' : ''} in this category</p>
        </header>

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
            <p>No posts found in this category.</p>
            <Link to="/" className="btn btn-primary">Browse All Posts</Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Category
