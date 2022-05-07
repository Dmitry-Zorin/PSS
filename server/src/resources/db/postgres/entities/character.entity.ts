import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Character extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string

	@Column()
	name: string
}
