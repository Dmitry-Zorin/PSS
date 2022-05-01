import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Resource extends BaseEntity {
	@PrimaryColumn()
	name: string

	@Column({ type: 'enum', enum: ['A', 'B', 'C'], nullable: true })
	category: number
}
