import { BaseEntity, Entity } from 'typeorm'
import { WithCommonFields } from '../common-fields.entity'
import { WithForm16Fields } from '../form16-fields.entity'
import { WithMainFields } from '../main-fields.entity'

@Entity('articles')
export class Article extends WithMainFields(WithCommonFields(WithForm16Fields(BaseEntity))) {}
