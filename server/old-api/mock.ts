import nock from 'nock'
import { createEnvError } from '../utils/errors'

const defaultIssueOptions = {
	assignedToId: 306,
	trackerName: 'Наряд',
	statusName: 'Закрыта',
	estimatedHours: 6,
	difficulty: 9,
	completion: 1,
}

const createIssue = (options?: any) => {
	options = {
		...defaultIssueOptions,
		...options,
	}
	return {
		assigned_to: {
			id: options.assignedToId,
		},
		tracker: {
			name: options.trackerName,
		},
		status: {
			name: options.statusName,
		},
		estimated_hours: options.estimatedHours,
		custom_fields: [
			{
				name: 'Оценка сложности',
				value: options.difficulty,
			},
			{
				name: 'Оценка качества выполнения',
				value: options.completion,
			},
		],
	}
}

export const nockRedmine = (redmineServer: string, verbose = false) => {
	if (!redmineServer) {
		throw createEnvError('redmine')
	}
	
	const url = '/issues.json'
	
	nock(redmineServer)
		.get(url)
		.query(query => {
			if (verbose) {
				console.log(`Query for ${url}:\n${JSON.stringify(query, null, ' ')}`)
			}
			return true
		})
		.reply(200, function(uri, requestBody) {
			const issues = [
				createIssue(),
				createIssue({
					trackerName: 'Творческая деятельность',
					statusName: 'Решена',
					estimatedHours: 2,
					difficulty: 5,
					completion: 0.8,
				}),
				createIssue({
					trackerName: 'Подготовка',
					statusName: 'В работе',
					estimatedHours: 1,
					difficulty: 4,
					completion: 0.5,
				}),
			]
			const resp = {
				total_count: issues.length,
				issues,
			}
			if (verbose) {
				console.log(`Response from ${url}:\n${JSON.stringify(resp, null, ' ')}`)
			}
			return resp
		})
}
