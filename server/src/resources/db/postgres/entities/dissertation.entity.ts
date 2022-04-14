import { BaseEntity, Entity } from 'typeorm'
import { WithCommonFields } from './common-fields.entity'
import { WithForm16Fields } from './form16-fields.entity'
import { WithMainFields } from './main-fields.entity'

@Entity('dissertations')
export class Dissertation extends WithMainFields(WithCommonFields(WithForm16Fields(BaseEntity))) {}
