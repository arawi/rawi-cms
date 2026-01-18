import { createContext, useContext, useState, useEffect } from 'react'
import { initialPosts } from '../data/posts'

const BlogContext = createContext()

export function useBlog() {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider')
  }
  return context
}

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('rawi-posts')
    return saved ? JSON.parse(saved) : initialPosts
  })

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('rawi-settings')
    return saved ? JSON.parse(saved) : {
      siteName: 'Rawi CMS',
      siteDescription: 'A simplified blog content management system',
      postsPerPage: 10,
      theme: 'light'
    }
  })

  useEffect(() => {
    localStorage.setItem('rawi-posts', JSON.stringify(posts))
  }, [posts])

  useEffect(() => {
    localStorage.setItem('rawi-settings', JSON.stringify(settings))
  }, [settings])

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      slug: generateSlug(post.title),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setPosts(prev => [newPost, ...prev])
    return newPost
  }

  const updatePost = (id, updates) => {
    setPosts(prev => prev.map(post =>
      post.id === id
        ? { ...post, ...updates, updatedAt: new Date().toISOString() }
        : post
    ))
  }

  const deletePost = (id) => {
    setPosts(prev => prev.filter(post => post.id !== id))
  }

  const getPostBySlug = (slug) => {
    return posts.find(post => post.slug === slug)
  }

  const getPostsByCategory = (category) => {
    return posts.filter(post =>
      post.categories?.includes(category) && post.status === 'published'
    )
  }

  const searchPosts = (query) => {
    const lowercaseQuery = query.toLowerCase()
    return posts.filter(post =>
      post.status === 'published' && (
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt?.toLowerCase().includes(lowercaseQuery)
      )
    )
  }

  const getPublishedPosts = () => {
    return posts
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  const getAllCategories = () => {
    const categories = new Set()
    posts.forEach(post => {
      post.categories?.forEach(cat => categories.add(cat))
    })
    return Array.from(categories)
  }

  const value = {
    posts,
    settings,
    setSettings,
    addPost,
    updatePost,
    deletePost,
    getPostBySlug,
    getPostsByCategory,
    searchPosts,
    getPublishedPosts,
    getAllCategories
  }

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  )
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
