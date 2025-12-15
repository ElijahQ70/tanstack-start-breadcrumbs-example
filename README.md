# TanStack Start Breadcrumbs Demo

A demonstration of how to implement dynamic breadcrumbs in TanStack Start that automatically update after mutations using `router.invalidate()`.

## Features

- **Server-Side Rendering**: Organizations and employees are loaded via server functions
- **Dynamic Breadcrumbs**: Breadcrumbs are prerendered on the server and update reactively on the client
- **Real-time Updates**: Edit organization/employee names and watch the breadcrumbs update instantly
- **File-based Routing**: Uses TanStack Router's file-based routing system

## Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tanstack-start-router-breadcrumbs-example

# Install dependencies
bun install
```

### Running the Development Server

```bash
# Start the dev server
bun dev
```

The application will be available at `http://localhost:3000`

## How It Works

### 1. Route Loaders with Crumbs

Each route defines a `crumb` property in its loader:

```tsx
export const Route = createFileRoute('/organizations/$orgId')({
  loader: async ({ params }) => {
    const organization = await getOrganization({ data: { id: params.orgId } })
    return {
      crumb: organization.name, // Dynamic breadcrumb!
      organization,
    }
  },
})
```

### 2. BreadcrumbNav Component

The breadcrumb component uses `useMatches()` to reactively display all matched routes:

```tsx
const BreadcrumbNav = () => {
  const matches = useMatches()
  const matchesWithCrumbs = matches.filter((match) =>
    isMatch(match, 'loaderData.crumb'),
  )
  // Renders breadcrumbs from loader data
}
```

### 3. Mutation + Invalidation

After mutations, call `router.invalidate()` to re-run loaders:

```tsx
const handleUpdateName = async () => {
  await updateOrganization({ data: { id: orgId, name: newName } })
  await router.invalidate() // This updates the breadcrumbs!
}
```

## Demo Flow

1. **Home** → Landing page explaining the demo
2. **Breadcrumbs Demo** → Intro page
3. **Organizations** → List of organizations
4. **Organization Details** → View/edit organization name (watch breadcrumbs update!)
5. **Employees** → List of employees for the organization
6. **Employee Details** → View/edit employee name (watch breadcrumbs update!)

## Key Technologies

- **TanStack Start**: Full-stack React framework with server functions
- **TanStack Router**: Type-safe routing with file-based routing
- **Server Functions**: Run code on the server from client components
- **SSR**: Server-side rendering for fast initial page loads
- **Tailwind CSS**: Utility-first CSS framework

## Project Structure

```
src/
├── components/
│   ├── BreadcrumbNav.tsx    # Breadcrumb navigation component
│   └── Header.tsx           # Application header
├── data/
│   └── organizations.ts     # Server functions for CRUD operations
├── routes/
│   ├── __root.tsx           # Root layout with SSR setup
│   ├── index.tsx            # Landing page
│   └── demo/
│       └── breadcrumbs/
│           ├── route.tsx                    # Layout with BreadcrumbNav
│           ├── index.tsx                    # Demo intro
│           └── organizations/
│               ├── index.tsx                # Organizations list
│               └── $orgId/
│                   ├── route.tsx            # Organization loader
│                   ├── index.tsx            # Organization details
│                   └── employees/
│                       ├── index.tsx        # Employees list
│                       └── $employeeId.tsx  # Employee details
```
