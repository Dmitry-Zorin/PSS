import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Settings } from './settings.entity'

enum Role {
	User = 'user',
	Admin = 'admin',
}

@Entity()
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
