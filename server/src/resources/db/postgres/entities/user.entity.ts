import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'
import { Locale, Role, Theme } from '../../types'

@Entity('users')
export class User extends BaseEntity {
	@PrimaryColumn()
	username: string

	@Column()
	password: string

	@Column({ type: 'enum', enum: Role, default: Role.User })
	role?: Role

	@Column({ type: 'enum', enum: Locale, nullable: true })
	locale?: Locale

	@Column({ type: 'enum', enum: Theme, nullable: true })
	theme?: Theme
}
