import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { format } from 'date-fns'
import { useBlog } from '../context/BlogContext'
import SEO from '../components/SEO'

function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { getPostBySlug, getPublishedPosts } = useBlog()

  const post = getPostBySlug(slug)
  const allPosts = getPublishedPosts()

  if (!post || post.status !== 'published') {
    return (
      <div className="container">
        <div className="not-found-content">
          <h1>Post Not Found</h1>
          <p>The post you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    )
  }

  const currentIndex = allPosts.findIndex(p => p.id === post.id)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  const formattedDate = format(new Date(post.createdAt), 'MMMM d, yyyy')
  const updatedDate = post.updatedAt !== post.createdAt
    ? format(new Date(post.updatedAt), 'MMMM d, yyyy')
    : null

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.featuredImage}
        article={true}
        slug={`post/${post.slug}`}
      />
      <article className="blog-post">
        <div className="container container-narrow">
          <header className="post-header">
            <div className="post-meta">
              <time dateTime={post.createdAt}>{formattedDate}</time>
              {updatedDate && (
                <span className="updated-date">(Updated: {updatedDate})</span>
              )}
              {post.author && <span className="post-author">by {post.author}</span>}
            </div>
            <h1>{post.title}</h1>
            {post.categories?.length > 0 && (
              <div className="post-categories">
                {post.categories.map(category => (
                  <Link
                    key={category}
                    to={`/category/${encodeURIComponent(category)}`}
                    className="category-badge"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {post.featuredImage && (
            <figure className="featured-image">
              <img src={post.featuredImage} alt={post.title} />
            </figure>
          )}

          <div className="post-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {post.tags?.length > 0 && (
            <div className="post-tags">
              <strong>Tags:</strong>
              {post.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          )}

          <nav className="post-navigation">
            {prevPost && (
              <Link to={`/post/${prevPost.slug}`} className="nav-prev">
                <span>&larr; Previous</span>
                <strong>{prevPost.title}</strong>
              </Link>
            )}
            {nextPost && (
              <Link to={`/post/${nextPost.slug}`} className="nav-next">
                <span>Next &rarr;</span>
                <strong>{nextPost.title}</strong>
              </Link>
            )}
          </nav>
        </div>
      </article>
    </>
  )
}

export default BlogPost
