import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import Category from './pages/Category'
import Search from './pages/Search'
import About from './pages/About'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="post/:slug" element={<BlogPost />} />
        <Route path="category/:category" element={<Category />} />
        <Route path="search" element={<Search />} />
        <Route path="about" element={<About />} />
        <Route path="admin/*" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
