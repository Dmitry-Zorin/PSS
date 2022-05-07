import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm'
import { Publication } from './publication.entity'

@Entity()
export class Author extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string

	@Column()
	lastName: string

	@Column()
	firstName: string

	@Column({ nullable: true })
	middleName: string

	@Column({ nullable: true })
	info: string

	@ManyToMany(() => Publication, publication => publication.authors)
	publications: Publication[]

	@RelationId((author: Author) => author.publications)
	publicationIds: string[]
}
