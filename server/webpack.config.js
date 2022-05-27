module.exports = (options, webpack) => ({
	...options,
	// mode: 'production',
	// optimization: {
	// 	nodeEnv: 'production',
	// },
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
				if (
					resource.startsWith('.') ||
					resource.startsWith('ajv/lib/compile/')
				) {
					return false
				}
				try {
					require.resolve(resource)
					return false
				} catch (err) {
					return true
				}
			},
		}),
	],
})
