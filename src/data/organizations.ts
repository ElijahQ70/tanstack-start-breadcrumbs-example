import { createServerFn } from '@tanstack/react-start'

// Types
export type Employee = {
  id: string
  name: string
  surname: string
  role: string
  orgId: string
}

export type Organization = {
  id: string
  name: string
  description: string
}

// In-memory data store (simulating a database)
// Using a module-level variable that persists across requests
const organizationsData: Organization[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    description: 'A multinational conglomerate',
  },
  {
    id: '2',
    name: 'TechStart Inc',
    description: 'Innovation-driven startup',
  },
  {
    id: '3',
    name: 'Global Services Ltd',
    description: 'Enterprise solutions provider',
  },
]

const employeesData: Employee[] = [
  { id: '1', name: 'John', surname: 'Doe', role: 'Engineer', orgId: '1' },
  { id: '2', name: 'Jane', surname: 'Smith', role: 'Designer', orgId: '1' },
  { id: '3', name: 'Bob', surname: 'Johnson', role: 'Manager', orgId: '1' },
  { id: '4', name: 'Alice', surname: 'Williams', role: 'Developer', orgId: '2' },
  { id: '5', name: 'Charlie', surname: 'Brown', role: 'CTO', orgId: '2' },
  { id: '6', name: 'Diana', surname: 'Miller', role: 'HR Lead', orgId: '3' },
  { id: '7', name: 'Edward', surname: 'Davis', role: 'Sales Rep', orgId: '3' },
]

// Server Functions

export const getOrganizations = createServerFn({
  method: 'GET',
}).handler(async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [...organizationsData]
})

export const getOrganization = createServerFn({
  method: 'GET',
}).handler(async (ctx: { data: { id: string } }) => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  const org = organizationsData.find((o) => o.id === ctx.data.id)
  if (!org) {
    throw new Error(`Organization with id ${ctx.data.id} not found`)
  }
  return { ...org }
})

export const updateOrganization = createServerFn({
  method: 'POST',
}).handler(async (ctx: { data: { id: string; name: string } }) => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const orgIndex = organizationsData.findIndex((o) => o.id === ctx.data.id)
  if (orgIndex === -1) {
    throw new Error(`Organization with id ${ctx.data.id} not found`)
  }
  organizationsData[orgIndex] = {
    ...organizationsData[orgIndex],
    name: ctx.data.name,
  }
  return { ...organizationsData[orgIndex] }
})

export const getEmployeesByOrg = createServerFn({
  method: 'GET',
}).handler(async (ctx: { data: { orgId: string } }) => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return employeesData
    .filter((e) => e.orgId === ctx.data.orgId)
    .map((e) => ({ ...e }))
})

export const getEmployee = createServerFn({
  method: 'GET',
}).handler(async (ctx: { data: { id: string } }) => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  const employee = employeesData.find((e) => e.id === ctx.data.id)
  if (!employee) {
    throw new Error(`Employee with id ${ctx.data.id} not found`)
  }
  return { ...employee }
})

export const updateEmployee = createServerFn({
  method: 'POST',
}).handler(
  async (ctx: { data: { id: string; name: string; surname: string } }) => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const empIndex = employeesData.findIndex((e) => e.id === ctx.data.id)
    if (empIndex === -1) {
      throw new Error(`Employee with id ${ctx.data.id} not found`)
    }
    employeesData[empIndex] = {
      ...employeesData[empIndex],
      name: ctx.data.name,
      surname: ctx.data.surname,
    }
    return { ...employeesData[empIndex] }
  },
)
