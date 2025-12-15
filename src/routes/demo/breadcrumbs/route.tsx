import { createFileRoute, Outlet } from '@tanstack/react-router'
import { BreadcrumbNav } from '@/components/BreadcrumbNav'

export const Route = createFileRoute('/demo/breadcrumbs')({
  component: BreadcrumbsLayout,
  loader: () => ({
    crumb: 'Breadcrumbs Demo',
  }),
})

function BreadcrumbsLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <BreadcrumbNav />
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Outlet />
      </div>
    </div>
  )
}

