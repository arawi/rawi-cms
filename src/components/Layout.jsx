import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useBlog } from '../context/BlogContext'

function Layout() {
  const { settings } = useBlog()

  return (
    <div className={`layout ${settings.theme}`}>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
