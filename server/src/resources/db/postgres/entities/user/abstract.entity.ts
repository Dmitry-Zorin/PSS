import { BaseEntity, Entity } from 'typeorm'
import { WithCommonFields } from '../common-fields.entity'
import { WithForm16Fields } from '../form16-fields.entity'
import { WithMainFields } from '../main-fields.entity'

@Entity('abstracts')
export class Abstract extends WithMainFields(WithCommonFields(WithForm16Fields(BaseEntity))) {}
