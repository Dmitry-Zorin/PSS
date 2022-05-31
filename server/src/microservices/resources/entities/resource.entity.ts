import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('resource')
export class Resource {
	@PrimaryColumn()
	name: string

	@Column({ type: 'enum', enum: ['A', 'B', 'C'], nullable: true })
	category: number
}
