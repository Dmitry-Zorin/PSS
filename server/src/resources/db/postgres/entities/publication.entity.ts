import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm'
import { Author } from './admin'
import { ResourceItem } from './resource-item.entity'

@Entity()
export class Publication extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string

	@Column()
	title: string

	@Column({ nullable: true })
	type?: string

	@Column({ nullable: true })
	characterId?: number

	@Column({ nullable: true })
	publicationPlace?: string

	@Column({ nullable: true })
	year?: number

	@Column({ nullable: true })
	outputData?: string

	@Column({ nullable: true })
	volume?: number

	@ManyToMany(() => Author, author => author.publications)
	@JoinTable()
	authors: Author[]

	@RelationId((publication: Publication) => publication.authors)
	authorIds: string[]

	@Column('simple-array', { nullable: true })
	coauthors: string[]

	@OneToOne(() => ResourceItem, item => item.publication)
	resourceItem: ResourceItem
}
