import { BaseEntity, Entity } from 'typeorm'
import { WithCommonFields } from '../common-fields.entity'
import { WithForm16Fields } from '../form16-fields.entity'
import { WithMainFields } from '../main-fields.entity'

@Entity('monographs')
export class Monograph extends WithMainFields(WithCommonFields(WithForm16Fields(BaseEntity))) {}
