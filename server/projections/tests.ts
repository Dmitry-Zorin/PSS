export default {
	_id: 0,
	id: '$_id',
	name: 1,
	desc: 1,
	file: 1,
	createdAt: { $toDate: '$_id' },
}
