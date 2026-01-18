import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'

function Header() {
  const { settings, getAllCategories } = useBlog()
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const categories = getAllCategories()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setMenuOpen(false)
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>{settings.siteName}</h1>
          </Link>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li className="dropdown">
                <span>Categories</span>
                <ul className="dropdown-menu">
                  {categories.map(category => (
                    <li key={category}>
                      <Link
                        to={`/category/${encodeURIComponent(category)}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
              <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link></li>
            </ul>

            <form className="search-form" onSubmit={handleSearch}>
              <span className="search-icon">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </span>
              <input
                type="search"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
