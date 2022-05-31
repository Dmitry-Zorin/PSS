import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('character')
export class Character {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string
}
