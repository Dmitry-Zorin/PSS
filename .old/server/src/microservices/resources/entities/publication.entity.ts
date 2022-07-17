import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToOne,
	PrimaryColumn,
	RelationId,
} from 'typeorm'
import { Author } from './author.entity'
import { ResourceItem } from './resource-item.entity'

@Entity('publication')
export class Publication {
	@OneToOne(() => ResourceItem, (e) => e.publication)
	@JoinColumn()
	resourceItem: ResourceItem

	@PrimaryColumn()
	resourceItemId: string

	@Column()
	title: string

	@Column({ nullable: true })
	type?: string

	@Column({ nullable: true })
	characterId?: string

	@Column({ nullable: true })
	publicationPlace?: string

	@Column({ nullable: true })
	year?: number

	@Column({ nullable: true })
	outputData?: string

	@Column({ nullable: true })
	volume?: number

	@ManyToMany(() => Author)
	@JoinTable()
	authors: Author[]

	@RelationId((publication: Publication) => publication.authors)
	authorIds: string[]

	@Column('simple-array', { nullable: true })
	coauthors: string[]
}
