import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { File } from './file.entity'
import { Publication } from './publication.entity'

@Entity()
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

	@OneToOne(() => Publication, {
		createForeignKeyConstraints: false,
		nullable: true,
	})
	@JoinColumn()
	publication?: Publication

	@OneToOne(() => File, {
		createForeignKeyConstraints: false,
		nullable: true,
	})
	@JoinColumn()
	file?: File
}
