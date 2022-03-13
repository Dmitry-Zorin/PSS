import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('files')
export class File extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string

	@Column()
	fileId: string

	@Column()
	name: string
}
