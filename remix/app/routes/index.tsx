import { Typography } from '@mui/material'
import type { Beverage } from '@prisma/client'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import db from '~/lib/db.server'

// export const handle = {
// 	i18n: 'index',
// }

// Each route can define a "loader" function that will be called
// on the server before rendering to provide data to the route.
type LoaderData = { items: Array<Beverage> }

export const loader: LoaderFunction = async () => {
	const todayDate = new Date()
	todayDate.setHours(0, 0, 0, 0)

	const data = {
		items: await db.beverage.findMany({
			where: {
				createdAt: {
					gte: todayDate,
				},
			},
			orderBy: {
				createdAt: 'asc',
			},
		}),
	}

	return data
}

// The "action" function is a server-only function to handle data mutations
// and other actions.
export const action: ActionFunction = async ({ request }) => {
	const form = await request.formData()
	const beverageName = form.get('beverageName')

	// Rudimentary data validation
	if (beverageName !== 'coffee' && beverageName !== 'water') {
		throw new Error('Invalid form values.')
	}

	await db.beverage.create({ data: { name: beverageName } })
	return redirect(`/`)
}

export default function Index() {
	// This hook returns the JSON parsed data from your route loader function.
	const data = useLoaderData<LoaderData>()

	return (
		<>
			<Typography variant="h4" component="h1" gutterBottom>
				Remix with TypeScript example
			</Typography>
			<Link to="/about" color="secondary">
				Go to the about page
			</Link>
			{data.items.map((item) => (
				<span key={item.id} style={{ marginRight: '2px' }}>
					{item.name === 'coffee' ? <span>🟫</span> : <span>🟦</span>}
				</span>
			))}
			<Form method="post" style={{ marginTop: '30px' }}>
				<label>
					Submit beverage consumed today:{' '}
					<select name="beverageName">
						<option value="water">Water</option>
						<option value="coffee">Coffee</option>
					</select>
				</label>

				<button type="submit" style={{ marginLeft: '5px' }}>
					Submit
				</button>
			</Form>
		</>
	)
}
