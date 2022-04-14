import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('resources')
export class Resource extends BaseEntity {
	@PrimaryColumn()
	id: string

	@Column()
	resource: string

	@Column()
	resourceId: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Column()
	title: string
}
