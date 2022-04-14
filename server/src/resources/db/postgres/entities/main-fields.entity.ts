import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export type Constructor = new (...args: any[]) => {}

export function WithMainFields<T extends Constructor>(Entity: T) {
	abstract class MainFields extends Entity {
		@PrimaryGeneratedColumn()
		id: string

		@CreateDateColumn()
		createdAt: Date

		@UpdateDateColumn()
		updatedAt: Date

		@Column()
		title: string
	}

	return MainFields
}
