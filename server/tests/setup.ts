import 'jest-extended'
import { disconnect } from '../src/services/mongo-client'

afterAll(disconnect)
