import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { File } from './file.entity'
import { Publication } from './publication.entity'

@Entity()
export class ResourceItem extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Column()
	resourceName: string

	@Column()
	title: string

	@Column({ nullable: true })
	description?: string

	@OneToOne(() => Publication, pub => pub.resourceItem, {
		createForeignKeyConstraints: false,
		cascade: true,
		nullable: true,
	})
	@JoinColumn()
	publication?: Publication

	@OneToOne(() => File, file => file.resourceItem, {
		createForeignKeyConstraints: false,
		cascade: true,
		nullable: true,
	})
	@JoinColumn()
	file?: File
}
