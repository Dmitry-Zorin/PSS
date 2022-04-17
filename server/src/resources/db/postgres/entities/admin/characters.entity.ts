import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('characters')
export class Character extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string

	@Column()
	name: string
}
