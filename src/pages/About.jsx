import { useBlog } from '../context/BlogContext'
import SEO from '../components/SEO'

function About() {
  const { settings } = useBlog()

  return (
    <>
      <SEO
        title="About"
        description={`Learn more about ${settings.siteName}`}
        slug="about"
      />
      <div className="container container-narrow">
        <article className="about-page">
          <h1>About {settings.siteName}</h1>

          <section>
            <h2>What is Rawi CMS?</h2>
            <p>
              Rawi CMS is a modern, lightweight blog content management system
              designed for simplicity and speed. Inspired by WordPress but built
              for the modern web, Rawi CMS gives you everything you need to
              create and manage a beautiful blog without the complexity.
            </p>
          </section>

          <section>
            <h2>Features</h2>
            <ul>
              <li><strong>Simple Content Management</strong> - Create, edit, and publish posts with ease</li>
              <li><strong>Markdown Support</strong> - Write in Markdown for clean, formatted content</li>
              <li><strong>Categories & Tags</strong> - Organize your content effectively</li>
              <li><strong>SEO Optimized</strong> - Built-in meta tags and Open Graph support</li>
              <li><strong>Responsive Design</strong> - Looks great on all devices</li>
              <li><strong>Fast & Lightweight</strong> - Built with React and Vite</li>
              <li><strong>No Database Required</strong> - Content stored locally</li>
            </ul>
          </section>

          <section>
            <h2>Technology Stack</h2>
            <ul>
              <li>React 18 with Hooks</li>
              <li>Vite for fast development and builds</li>
              <li>React Router for navigation</li>
              <li>React Markdown for content rendering</li>
              <li>Local Storage for data persistence</li>
              <li>CSS3 with custom properties</li>
            </ul>
          </section>

          <section>
            <h2>Get Started</h2>
            <p>
              Ready to start blogging? Head to the <a href="/admin">Admin Panel</a> to
              create your first post or customize your site settings.
            </p>
          </section>
        </article>
      </div>
    </>
  )
}

export default About
