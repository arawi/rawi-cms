import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

function PostCard({ post }) {
  const navigate = useNavigate()
  const formattedDate = format(new Date(post.createdAt), 'MMM d, yyyy')

  const handleCardClick = (e) => {
    // Don't navigate if clicking on a tag link
    if (e.target.closest('.post-card-tag')) return
    navigate(`/post/${post.slug}`)
  }

  return (
    <article className="post-card" onClick={handleCardClick}>
      {post.featuredImage && (
        <div className="post-card-image">
          <img src={post.featuredImage} alt={post.title} loading="lazy" />
        </div>
      )}
      <div className="post-card-content">
        {/* Tags above title */}
        {post.categories?.length > 0 && (
          <div className="post-card-tags">
            {post.categories.slice(0, 2).map(category => (
              <Link
                key={category}
                to={`/category/${encodeURIComponent(category)}`}
                className="post-card-tag"
                onClick={(e) => e.stopPropagation()}
              >
                {category}
              </Link>
            ))}
          </div>
        )}

        {/* Title - dominant element */}
        <h2 className="post-card-title">{post.title}</h2>

        {/* Excerpt - 2 line clamp */}
        {post.excerpt && (
          <p className="post-card-excerpt">{post.excerpt}</p>
        )}

        {/* Meta at bottom */}
        <div className="post-card-meta">
          {post.author && (
            <>
              <span className="post-author">{post.author}</span>
              <span className="separator"></span>
            </>
          )}
          <span className="post-date">{formattedDate}</span>
        </div>
      </div>
    </article>
  )
}

export default PostCard
