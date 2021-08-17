import { Document, Projection as ProjectionOf } from 'mongodb'

export interface UserType {
	username: string,
	isAdmin: boolean
}

export type Projection = ProjectionOf<Document>
