export function getFromStorage<T>(key: string) {
	if (typeof window === 'undefined') return null
	const storedValue = window?.localStorage.getItem(key)
	return storedValue ? (JSON.parse(storedValue) as T) : null
}

export function setToStorage(key: string, value: any) {
	if (typeof window === 'undefined') return
	return window?.localStorage.setItem(key, JSON.stringify(value))
}
