import { Document, Filter, Projection } from 'mongodb'

export type DocumentProjection = Projection<Document>
export type DocumentFilter = Filter<Document>
export type Projections = Record<string, DocumentProjection>
export type Pipeline = Document[]
