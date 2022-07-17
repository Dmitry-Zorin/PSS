import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from '../enums'
import { Settings } from './settings.entity'

@Entity('user')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true })
	username: string

	@Column()
	password: string

	@Column({ type: 'enum', enum: Role, default: Role.User })
	role: Role

	@OneToOne(() => Settings, (e) => e.user)
	settings: Settings
}
