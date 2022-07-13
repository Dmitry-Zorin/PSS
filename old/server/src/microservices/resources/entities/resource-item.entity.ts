import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Publication } from './publication.entity'

@Entity('resource_item')
export class ResourceItem {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Index()
	@Column()
	resource: string

	@Column()
	title: string

	@Column({ nullable: true })
	description?: string

	@OneToOne(() => Publication, (e) => e.resourceItem)
	publication: Publication
}
