import multer from 'multer'

export default multer().fields([
	{ name: 'file', maxCount: 1 },
	{ name: 'certificateFile', maxCount: 1 },
])
