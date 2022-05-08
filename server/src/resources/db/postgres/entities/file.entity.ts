import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ResourceItem } from './index'

@Entity()
export class File extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@Column()
	fileId: string

	@OneToOne(() => ResourceItem, item => item.file)
	resourceItem: ResourceItem
}
