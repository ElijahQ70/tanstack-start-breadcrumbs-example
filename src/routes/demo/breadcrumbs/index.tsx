import { createFileRoute, Link } from '@tanstack/react-router'
import { Building2, ArrowRight, RefreshCw } from 'lucide-react'

export const Route = createFileRoute('/demo/breadcrumbs/')({
  component: BreadcrumbsDemoIndex,
})

function BreadcrumbsDemoIndex() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">
          Breadcrumbs Demo
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          This demo shows how to implement dynamic breadcrumbs in TanStack Start
          that properly update after mutations using{' '}
          <code className="px-2 py-1 bg-slate-700 rounded text-cyan-400">
            router.invalidate()
          </code>
        </p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <RefreshCw className="text-cyan-400" size={20} />
          How It Works
        </h2>
        <ol className="space-y-3 text-gray-300 list-decimal list-inside">
          <li>
            Each route defines a <code className="text-cyan-400">crumb</code> property in its loader
          </li>
          <li>
            The <code className="text-cyan-400">BreadcrumbNav</code> component uses{' '}
            <code className="text-cyan-400">useMatches()</code> to get all matched routes
          </li>
          <li>
            It filters routes that have <code className="text-cyan-400">loaderData.crumb</code> using{' '}
            <code className="text-cyan-400">isMatch()</code>
          </li>
          <li>
            After a mutation, calling{' '}
            <code className="text-cyan-400">router.invalidate()</code>{' '}
            re-runs loaders
          </li>
          <li>
            The breadcrumbs automatically update because{' '}
            <code className="text-cyan-400">useMatches()</code>{' '}
            is reactive
          </li>
        </ol>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">Try It Out</h2>
        <p className="text-gray-400">
          Navigate to an organization, then to an employee. Edit their name and
          watch the breadcrumb update instantly!
        </p>
        <Link
          to="/demo/breadcrumbs/organizations"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
        >
          <Building2 size={20} />
          View Organizations
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}

