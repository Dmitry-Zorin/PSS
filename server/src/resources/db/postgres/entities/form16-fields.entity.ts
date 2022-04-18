import { Column } from 'typeorm'
import { Constructor } from './main-fields.entity'

export function WithForm16Fields<T extends Constructor>(Entity: T) {
	abstract class Form16Fields extends Entity {
		@Column({ nullable: true })
		characterId?: number

		@Column({ nullable: true })
		exitData?: string
	}

	return Form16Fields
}
