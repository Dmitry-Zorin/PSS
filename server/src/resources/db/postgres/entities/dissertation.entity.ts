import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { File } from './file.entity'

@Entity('dissertations')
export class Dissertation extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date

	@Column()
	title: string

	@Column({ nullable: true })
	description?: string

	@Column({ nullable: true })
	type?: string

	@Column({ nullable: true })
	year?: number

	@Column({ nullable: true })
	volume?: number

	@Column('simple-array')
	authors: string[]

	@Column({ nullable: true })
	character?: string

	@Column({ nullable: true })
	exitData?: string

	@OneToOne(() => File, { nullable: true })
	@JoinColumn()
	file?: File
}
