import { Column, JoinColumn, OneToOne } from 'typeorm'
import { File } from './file.entity'
import { Constructor } from './main-fields.entity'

export function WithCommonFields<T extends Constructor>(Entity: T) {
	abstract class CommonFields extends Entity {
		@Column({ nullable: true })
		description?: string

		@Column({ nullable: true })
		type?: string

		@Column({ nullable: true })
		year?: number

		@Column({ nullable: true })
		volume?: number

		@Column('simple-array')
		authors: string[]

		@OneToOne(() => File, { nullable: true })
		@JoinColumn()
		file?: File
	}

	return CommonFields
}
