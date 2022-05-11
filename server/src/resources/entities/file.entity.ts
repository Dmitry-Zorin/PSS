import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class File {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@Column()
	fileId: string
}
