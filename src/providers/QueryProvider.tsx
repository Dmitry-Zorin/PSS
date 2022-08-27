import {
	Hydrate,
	HydrateProps,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
})

export default function QueryProvider({ children, state }: HydrateProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={state}>
				{children}
				<ReactQueryDevtools />
			</Hydrate>
		</QueryClientProvider>
	)
}
