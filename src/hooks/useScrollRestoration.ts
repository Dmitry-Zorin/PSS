import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'

function saveScrollPos(asPath: string) {
	sessionStorage.setItem(
		`scrollPos:${asPath}`,
		JSON.stringify({ x: window.scrollX, y: window.scrollY }),
	)
}

function restoreScrollPos(asPath: string) {
	const json = sessionStorage.getItem(`scrollPos:${asPath}`)
	const scrollPos = json ? JSON.parse(json) : undefined
	if (scrollPos) {
		window.scrollTo(scrollPos.x, scrollPos.y)
	}
}

let shouldScrollRestore = false

export default function useScrollRestoration() {
	const router = useRouter()

	useEffect(() => {
		if (!('scrollRestoration' in window.history)) {
			return
		}

		window.history.scrollRestoration = 'manual'

		const onRouteChangeStart = () => {
			saveScrollPos(router.asPath)
		}

		const onRouteChangeComplete = () => {
			if (shouldScrollRestore) {
				shouldScrollRestore = false
				restoreScrollPos(router.asPath)
			}
		}

		Router.events.on('routeChangeStart', onRouteChangeStart)
		Router.events.on('routeChangeComplete', onRouteChangeComplete)
		Router.beforePopState(() => {
			shouldScrollRestore = true
			return true
		})

		return () => {
			Router.events.off('routeChangeStart', onRouteChangeStart)
			Router.events.off('routeChangeComplete', onRouteChangeComplete)
			Router.beforePopState(() => true)
		}
	}, [router])
}
