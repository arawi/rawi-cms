import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import SEO from '../components/SEO'
import { format } from 'date-fns'

function Admin() {
  return (
    <>
      <SEO title="Admin Dashboard" />
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2>Admin Panel</h2>
          <nav>
            <ul>
              <li><Link to="/admin">Dashboard</Link></li>
              <li><Link to="/admin/posts">All Posts</Link></li>
              <li><Link to="/admin/new">New Post</Link></li>
              <li><Link to="/admin/settings">Settings</Link></li>
            </ul>
          </nav>
          <Link to="/" className="back-to-site">&larr; Back to Site</Link>
        </aside>
        <main className="admin-main">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="posts" element={<PostsList />} />
            <Route path="new" element={<PostEditor />} />
            <Route path="edit/:id" element={<PostEditor />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

function Dashboard() {
  const { posts, getPublishedPosts, getAllCategories } = useBlog()
  const publishedPosts = getPublishedPosts()
  const draftPosts = posts.filter(p => p.status === 'draft')
  const categories = getAllCategories()

  return (
    <div className="admin-dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Posts</h3>
          <span className="stat-number">{posts.length}</span>
        </div>
        <div className="stat-card">
          <h3>Published</h3>
          <span className="stat-number">{publishedPosts.length}</span>
        </div>
        <div className="stat-card">
          <h3>Drafts</h3>
          <span className="stat-number">{draftPosts.length}</span>
        </div>
        <div className="stat-card">
          <h3>Categories</h3>
          <span className="stat-number">{categories.length}</span>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Posts</h2>
        <ul className="recent-posts">
          {posts.slice(0, 5).map(post => (
            <li key={post.id}>
              <Link to={`/admin/edit/${post.id}`}>{post.title}</Link>
              <span className={`status-badge ${post.status}`}>{post.status}</span>
            </li>
          ))}
        </ul>
        <Link to="/admin/new" className="btn btn-primary">Create New Post</Link>
      </div>
    </div>
  )
}

function PostsList() {
  const { posts, deletePost } = useBlog()
  const navigate = useNavigate()

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deletePost(id)
    }
  }

  return (
    <div className="admin-posts">
      <div className="admin-header">
        <h1>All Posts</h1>
        <Link to="/admin/new" className="btn btn-primary">Add New</Link>
      </div>

      <table className="posts-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Categories</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>
                <Link to={`/admin/edit/${post.id}`}>{post.title}</Link>
              </td>
              <td>
                <span className={`status-badge ${post.status}`}>{post.status}</span>
              </td>
              <td>{post.categories?.join(', ') || '-'}</td>
              <td>{format(new Date(post.createdAt), 'MMM d, yyyy')}</td>
              <td className="actions">
                <button
                  onClick={() => navigate(`/admin/edit/${post.id}`)}
                  className="btn btn-small"
                >
                  Edit
                </button>
                {post.status === 'published' && (
                  <Link
                    to={`/post/${post.slug}`}
                    className="btn btn-small btn-secondary"
                    target="_blank"
                  >
                    View
                  </Link>
                )}
                <button
                  onClick={() => handleDelete(post.id, post.title)}
                  className="btn btn-small btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {posts.length === 0 && (
        <div className="no-posts">
          <p>No posts yet.</p>
          <Link to="/admin/new" className="btn btn-primary">Create your first post</Link>
        </div>
      )}
    </div>
  )
}

function PostEditor() {
  const { posts, addPost, updatePost } = useBlog()
  const navigate = useNavigate()

  const postId = window.location.pathname.split('/edit/')[1]
  const existingPost = postId ? posts.find(p => p.id === postId) : null

  const [formData, setFormData] = useState({
    title: existingPost?.title || '',
    content: existingPost?.content || '',
    excerpt: existingPost?.excerpt || '',
    featuredImage: existingPost?.featuredImage || '',
    categories: existingPost?.categories?.join(', ') || '',
    tags: existingPost?.tags?.join(', ') || '',
    author: existingPost?.author || '',
    status: existingPost?.status || 'draft'
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)

    const postData = {
      ...formData,
      categories: formData.categories.split(',').map(c => c.trim()).filter(Boolean),
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    }

    if (existingPost) {
      updatePost(existingPost.id, postData)
    } else {
      addPost(postData)
    }

    setTimeout(() => {
      setSaving(false)
      navigate('/admin/posts')
    }, 500)
  }

  return (
    <div className="admin-editor">
      <h1>{existingPost ? 'Edit Post' : 'New Post'}</h1>

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-main">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter post title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content (Markdown supported)</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={20}
              placeholder="Write your post content here..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              placeholder="Brief description of the post"
            />
          </div>
        </div>

        <div className="form-sidebar">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="featuredImage">Featured Image URL</label>
            <input
              type="url"
              id="featuredImage"
              name="featuredImage"
              value={formData.featuredImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            {formData.featuredImage && (
              <img
                src={formData.featuredImage}
                alt="Preview"
                className="image-preview"
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="categories">Categories (comma-separated)</label>
            <input
              type="text"
              id="categories"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              placeholder="Technology, Tutorial"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="react, javascript"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author name"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : existingPost ? 'Update Post' : 'Create Post'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/admin/posts')}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function Settings() {
  const { settings, setSettings } = useBlog()
  const [formData, setFormData] = useState(settings)
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'postsPerPage' ? parseInt(value) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSettings(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="admin-settings">
      <h1>Settings</h1>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label htmlFor="siteName">Site Name</label>
          <input
            type="text"
            id="siteName"
            name="siteName"
            value={formData.siteName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="siteDescription">Site Description</label>
          <textarea
            id="siteDescription"
            name="siteDescription"
            value={formData.siteDescription}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="postsPerPage">Posts Per Page</label>
          <input
            type="number"
            id="postsPerPage"
            name="postsPerPage"
            value={formData.postsPerPage}
            onChange={handleChange}
            min={1}
            max={50}
          />
        </div>

        <div className="form-group">
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}

export default Admin
