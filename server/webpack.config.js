const PREFIXES_TO_EXCLUDE = ['.', 'ajv/lib/compile/']

module.exports = (options, webpack) => ({
	...options,
	mode: 'production',
	optimization: {
		nodeEnv: 'production',
	},
	entry: './src/vercel.ts',
	output: {
		filename: 'index.js',
		library: {
			name: 'vercel',
			type: 'commonjs2',
		},
	},
	externals: [],
	plugins: [
		...options.plugins,
		new webpack.IgnorePlugin({
			checkResource(resource) {
				if (!PREFIXES_TO_EXCLUDE.some((e) => resource.startsWith(e))) {
					try {
						require.resolve(resource)
					} catch {
						return true
					}
				}
				return false
			},
		}),
	],
})
