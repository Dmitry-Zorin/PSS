export const countPages = (url) => (
	fetch(url)
		.then(r => r.blob())
		.then(blob => {
			/*JSZip.loadAsync(blob).then(({ files }) => {
				files[Object.keys(files).find(e => e.match(/(\.docx)$/))]
					.async('string')
					.then(content => {
						console.log(content.match(/.{5}[a-z]{4}\d/gi))
					})
			})*/
			return new Promise(resolve => {
				const reader = new FileReader()
				reader.readAsBinaryString(blob)
				reader.onloadend = () => (
					resolve((reader.result.match(/\/Type[\s]*\/Page[^s]/g) || []).length)
				)
			})
		})
)
