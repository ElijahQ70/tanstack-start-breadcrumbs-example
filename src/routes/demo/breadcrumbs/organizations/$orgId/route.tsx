import { createFileRoute, Outlet } from '@tanstack/react-router'
import { getOrganization } from '@/data/organizations'

export const Route = createFileRoute('/demo/breadcrumbs/organizations/$orgId')({
  component: OrganizationLayout,
  loader: async ({ params }) => {
    const organization = await getOrganization({ data: { id: params.orgId } })
    return {
      crumb: organization.name,
      organization,
    }
  },
})

function OrganizationLayout() {
  return <Outlet />
}

