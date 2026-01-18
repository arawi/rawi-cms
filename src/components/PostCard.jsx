import { Link } from 'react-router-dom'
import { format } from 'date-fns'

function PostCard({ post }) {
  const formattedDate = format(new Date(post.createdAt), 'MMMM d, yyyy')

  return (
    <article className="post-card">
      {post.featuredImage && (
        <Link to={`/post/${post.slug}`} className="post-card-image">
          <img src={post.featuredImage} alt={post.title} loading="lazy" />
        </Link>
      )}
      <div className="post-card-content">
        <div className="post-card-meta">
          <span className="post-date">{formattedDate}</span>
          {post.categories?.length > 0 && (
            <span className="post-categories">
              {post.categories.map(category => (
                <Link
                  key={category}
                  to={`/category/${encodeURIComponent(category)}`}
                  className="category-link"
                >
                  {category}
                </Link>
              ))}
            </span>
          )}
        </div>
        <h2 className="post-card-title">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>
        {post.excerpt && (
          <p className="post-card-excerpt">{post.excerpt}</p>
        )}
        <Link to={`/post/${post.slug}`} className="read-more">
          Read More &rarr;
        </Link>
      </div>
    </article>
  )
}

export default PostCard
