import FormData from 'form-data'
import dotenv from 'dotenv'
import { fetchAPI } from '../utils'
import 'jest-extended'

dotenv.config()

let token: string

beforeAll(async () => {
	const body = new URLSearchParams({
		username: 'dima',
		password: 'zorin',
	})
	const { json } = await fetchAPI('auth/login', token, {
		method: 'post',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body,
	})
	token = json?.token
})

test('Create a test resource item', async () => {
	expect(token).toBeString()
	
	const name = 'create'
	const desc = 'test resource creation'
	
	const body = new FormData()
	body.append('name', name)
	body.append('desc', desc)
	
	const { json } = await fetchAPI('tests', token, {
		method: 'post',
		body,
	})
	expect(json).toBeObject()
	
	const { id } = json
	expect(id).toBeString()
	
	const { json: json2 } = await fetchAPI(`tests/${id}`, token)
	expect({ id, name, desc }).toMatchObject(json2)
})

test('Get test resource collection', async () => {
	expect(token).toBeString()
	
	const query = new URLSearchParams({
		filter: '{"name": "create"}',
		sort: '["name", 1]',
		range: '[0, 25]',
	})
	const { json } = await fetchAPI(`tests?${query}`, token)
	expect(json).toBeArray()
	
	json.forEach((e: any) => {
		expect(e).toBeObject()
		expect(e.id).toBeString()
		expect(e.name).toBeString()
		expect(e.desc).toBeString()
		expect(e.createdAt).toBeString()
	})
})

test('Get a test resource item by ID', async () => {
	expect(token).toBeString()
	
	const query = new URLSearchParams({
		filter: '{}',
		sort: '["_id", 1]',
		range: '[0, 0]',
	})
	const { json } = await fetchAPI(`tests?${query}`, token)
	expect(json).toBeArrayOfSize(1)
	
	const { id } = json[0]
	expect(id).toBeString()
	
	const { json: json2 } = await fetchAPI(`tests/${id}`, token)
	expect(json2).toBeObject()
	expect(json2.id).toBe(id)
	expect(json2.name).toBeString()
	expect(json2.desc).toBeString()
	expect(json2.createdAt).toBeString()
})

test('Update a test resource item by ID', async () => {
	expect(token).toBeString()
	
	const newName = 'update'
	const newDesc = 'test resource update'
	
	const query = new URLSearchParams({
		filter: '{}',
		sort: '["_id", 1]',
		range: '[0, 0]',
	})
	const { json } = await fetchAPI(`tests?${query}`, token)
	expect(json).toBeArrayOfSize(1)
	
	const { id } = json[0]
	expect(id).toBeString()
	
	const body = new FormData()
	body.append('name', newName)
	body.append('desc', newDesc)
	
	await fetchAPI(`tests/${id}`, token, {
		method: 'put',
		body,
	})
	const { json: json2 } = await fetchAPI(`tests/${id}`, token)
	expect(json2).toBeObject()
	expect(json2.id).toBe(id)
	expect(json2.name).toBe(newName)
	expect(json2.desc).toBe(newDesc)
	expect(json2.createdAt).toBeString()
})

test('Delete a test resource item by ID', async () => {
	expect(token).toBeString()
	
	const query = new URLSearchParams({
		filter: '{}',
		sort: '["_id", 1]',
		range: '[0, 0]',
	})
	const { json } = await fetchAPI(`tests?${query}`, token)
	expect(json).toBeArrayOfSize(1)
	
	const { id } = json[0]
	expect(id).toBeString()
	
	await fetchAPI(`tests/${id}`, token, { method: 'delete' })
	
	const { json: json2 } = await fetchAPI(`tests/${id}`, token)
	expect(json2).toBeObject()
	expect(json2.error).toBeObject()
	expect(json2.error.message).toBe('Not found')
})
