import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { Locale, Theme } from '../enums'
import { User } from './user.entity'

@Entity('settings')
export class Settings {
	@OneToOne(() => User, (e) => e.settings)
	@JoinColumn()
	user: User

	@PrimaryColumn()
	userId: string

	@Column({ type: 'enum', enum: Locale, default: Locale.En })
	locale?: Locale

	@Column({ type: 'enum', enum: Theme, default: Theme.Light })
	theme?: Theme
}
