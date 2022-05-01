import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Author extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string

	@Column()
	lastName: string

	@Column()
	firstName: string

	@Column({ nullable: true })
	middleName: string

	@Column({ nullable: true })
	info: string
}
