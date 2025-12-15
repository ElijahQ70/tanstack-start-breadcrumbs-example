import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { getEmployeesByOrg } from '@/data/organizations'
import { Users, User, ArrowRight } from 'lucide-react'

export const Route = createFileRoute(
  '/demo/breadcrumbs/organizations/$orgId/employees/',
)({
  component: EmployeesIndex,
  loader: async ({ params }) => {
    const employees = await getEmployeesByOrg({ data: { orgId: params.orgId } })
    return {
      crumb: 'Employees',
      employees,
    }
  },
})

function EmployeesIndex() {
  const router = useRouter()
  const { orgId } = Route.useParams()
  const { employees } = Route.useLoaderData()

  // Get organization name from parent route
  const matches = router.state.matches
  const orgMatch = matches.find(
    (m) => m.routeId === '/demo/breadcrumbs/organizations/$orgId',
  )
  const orgName = (orgMatch?.loaderData as { organization?: { name: string } })
    ?.organization?.name

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="text-cyan-400" size={32} />
        <div>
          <h1 className="text-3xl font-bold text-white">Employees</h1>
          {orgName && (
            <p className="text-gray-400">Working at {orgName}</p>
          )}
        </div>
      </div>

      <p className="text-gray-400">
        Select an employee to view their details and edit their name.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {employees.map((employee) => (
          <Link
            key={employee.id}
            to="/demo/breadcrumbs/organizations/$orgId/employees/$employeeId"
            params={{ orgId, employeeId: employee.id }}
            className="group bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-700 rounded-full group-hover:bg-cyan-500/20 transition-colors">
                  <User
                    className="text-gray-400 group-hover:text-cyan-400 transition-colors"
                    size={24}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {employee.name} {employee.surname}
                  </h3>
                  <p className="text-gray-400 text-sm">{employee.role}</p>
                </div>
              </div>
              <ArrowRight
                className="text-gray-500 group-hover:text-cyan-400 transition-colors"
                size={20}
              />
            </div>
          </Link>
        ))}
      </div>

      {employees.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No employees found in this organization.
        </div>
      )}
    </div>
  )
}

