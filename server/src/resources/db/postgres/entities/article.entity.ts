import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { File } from './file.entity'

@Entity('articles')
export class Article extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string

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
