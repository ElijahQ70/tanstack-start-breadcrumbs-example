import { Link } from '@tanstack/react-router'
import { Home, Navigation } from 'lucide-react'

const Header = () => {
  return (
    <header className="p-4 flex items-center gap-4 bg-gray-800 text-white shadow-lg">
      <Link
        to="/"
        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        aria-label="Home"
      >
        <Home size={24} />
      </Link>
      <h1 className="text-xl font-semibold flex-1">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/tanstack-word-logo-white.svg"
            alt="TanStack Logo"
            className="h-8"
          />
          <span className="text-gray-400">Start</span>
        </Link>
      </h1>
      <Link
        to="/demo/breadcrumbs"
        className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors font-medium"
      >
        <Navigation size={18} />
        Breadcrumbs Demo
      </Link>
    </header>
  )
}

export default Header
