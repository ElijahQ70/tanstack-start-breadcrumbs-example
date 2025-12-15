import { createFileRoute, Link } from '@tanstack/react-router'
import { getOrganizations } from '@/data/organizations'
import { Building2, Users, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/demo/breadcrumbs/organizations/')({
  component: OrganizationsIndex,
  loader: async () => {
    const organizations = await getOrganizations()
    return {
      crumb: 'Organizations',
      organizations,
    }
  },
})

function OrganizationsIndex() {
  const { organizations } = Route.useLoaderData()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Building2 className="text-cyan-400" size={32} />
        <h1 className="text-3xl font-bold text-white">Organizations</h1>
      </div>

      <p className="text-gray-400">
        Select an organization to view its details and employees.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {organizations.map((org) => (
          <Link
            key={org.id}
            to="/demo/breadcrumbs/organizations/$orgId"
            params={{ orgId: org.id }}
            className="group bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {org.name}
                </h3>
                <p className="text-gray-400 text-sm">{org.description}</p>
              </div>
              <ArrowRight
                className="text-gray-500 group-hover:text-cyan-400 transition-colors"
                size={20}
              />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <Users size={16} />
              <span>View employees</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

