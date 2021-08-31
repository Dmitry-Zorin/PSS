import { Column, Entity, PrimaryColumn } from 'typeorm'

enum Role {
	User = 'user',
	Admin = 'admin'
}

@Entity('users')
export class User {
	@PrimaryColumn()
	username: string

	@Column()
	password: string

	@Column({ type: 'enum', enum: Role, default: Role.User })
	role?: Role
}
