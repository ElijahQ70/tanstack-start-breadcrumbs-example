import { Link, isMatch, useMatches } from '@tanstack/react-router'
import { ChevronRight, Home } from 'lucide-react'

export const BreadcrumbNav = () => {
  const matches = useMatches()
  const matchesWithCrumbs = matches.filter((match) =>
    isMatch(match, 'loaderData.crumb'),
  )

  const items = matchesWithCrumbs.map(({ pathname, loaderData }) => ({
    href: pathname,
    label: loaderData?.crumb as string,
  }))

  if (items.length === 0) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      <Link
        to="/"
        className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
      >
        <Home size={16} />
      </Link>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-1">
          <ChevronRight size={16} className="text-gray-500" />
          {index === items.length - 1 ? (
            <span className="text-cyan-400 font-medium">{item.label}</span>
          ) : (
            <Link
              to={item.href}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

