import { createFileRoute, Link } from '@tanstack/react-router'
import { Navigation, ArrowRight, RefreshCw, Layers, Code } from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Navigation className="w-16 h-16 text-cyan-400" />
            <h1 className="text-5xl md:text-6xl font-black text-white">
              Breadcrumbs Demo
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Dynamic breadcrumbs in TanStack Start
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Learn how to implement breadcrumbs that automatically update after
            mutations using{' '}
            <code className="px-2 py-1 bg-slate-700 rounded text-cyan-400">
              router.invalidate()
            </code>
          </p>
          <Link
            to="/demo/breadcrumbs"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/30 text-lg"
          >
            Try the Demo
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="mb-4 p-3 bg-cyan-500/20 rounded-lg w-fit">
              <Layers className="text-cyan-400" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              1. Define Crumbs in Loaders
            </h3>
            <p className="text-gray-400">
              Each route returns a{' '}
              <code className="text-cyan-400">crumb</code> property from its
              loader function.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="mb-4 p-3 bg-cyan-500/20 rounded-lg w-fit">
              <Code className="text-cyan-400" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              2. Use useMatches()
            </h3>
            <p className="text-gray-400">
              The breadcrumb component uses{' '}
              <code className="text-cyan-400">useMatches()</code> to
              reactively get all matched routes.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="mb-4 p-3 bg-cyan-500/20 rounded-lg w-fit">
              <RefreshCw className="text-cyan-400" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              3. Invalidate After Mutations
            </h3>
            <p className="text-gray-400">
              Call{' '}
              <code className="text-cyan-400">router.invalidate()</code> to
              re-run loaders and update breadcrumbs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-3xl mx-auto">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Key Code</h2>
          <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm mb-6">
            <code className="text-gray-300">{`// In your route loader
loader: async ({ params }) => {
  const data = await fetchData(params.id);
  return {
    crumb: data.name,  // Dynamic breadcrumb!
    data,
  };
}`}</code>
          </pre>
          <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
            <code className="text-gray-300">{`// After a mutation
const handleSave = async () => {
  await updateData({ ... });
  await router.invalidate(); // Re-runs loaders!
};`}</code>
          </pre>
        </div>
      </section>
    </div>
  )
}
