export const countPages = (url) => (
	fetch(url)
		.then(r => r.blob())
		.then(blob => {
			return new Promise(resolve => {
				try {
					const reader = new FileReader()
					reader.readAsBinaryString(blob)
					reader.onloadend = () => (
						resolve((
							reader.result.match(/\/Type[\s]*\/Page[^s]/g) || []
						).length)
					)
				} catch (e) {
					resolve(0)
				}
			})
		})
)
