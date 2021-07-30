import { AbstractCreate } from './AbstractCreate.js'
import { AbstractEdit } from './AbstractEdit.js'
import { AbstractList } from './AbstractList.js'
import { AbstractShow } from './AbstractShow.js'

export default {
	list: AbstractList,
	create: AbstractCreate,
	edit: AbstractEdit,
	show: AbstractShow,
}
