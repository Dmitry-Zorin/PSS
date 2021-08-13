import 'jest-extended'
import client from '../src/services/mongo-client'

afterAll(() => client.close())
