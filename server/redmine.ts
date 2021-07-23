import fetch from 'node-fetch'

const { REDMINE_SERVER } = process.env

/*
export const updateEmployees = async () => {
	if (!REDMINE_SERVER) {
		return console.log('Missing redmine server env variable')
	}
	
	try {
		console.log('Updating redmine info...')
		
		if (process.env.NODE_ENV === 'development') {
			const nock = await import('./nock')
			nock.nockRedmine(REDMINE_SERVER)
		}
		
		let { startDate, dueDate } = getReportDates()
		const employees = await EmployeeModel.find({})
		const redmineIds = employees.map(e => e.redmineId)
		
		const info = {
			startDate,
			dueDate,
			employees: redmineIds.reduce((obj, id) => {
				obj[id] = {
					score: 0,
					issueNumber: 0,
					issuesCompleted: 0,
					nonScienceHours: 0,
					hours: {},
				}
				return obj
			}, {}),
		}
		
		const firstIssues = await getIssues(0, startDate, dueDate)
		await processIssues(firstIssues.issues, info)
		
		const totalCount = firstIssues.total_count
		const numOfRequests = Math.floor(totalCount / 100)
		
		const requests = range(numOfRequests).map(async i => {
			const { issues } = await getIssues((i + 1) * 100, startDate, dueDate)
			return processIssues(issues, info)
		})
		
		await Promise.all(requests)
		
		await Promise.all(employees.map(e => {
			const redmineInfo = {
				startDate,
				dueDate,
				...info.employees[e.redmineId],
			}
			
			if (e.redmineInfo && e.redmineInfo.length) {
				const isSameDate = e.redmineInfo.slice(-1)[0].startDate === startDate
				e.redmineInfo.splice(-1, +isSameDate)
				e.redmineInfo.push(redmineInfo)
			}
			else {
				e.redmineInfo = [redmineInfo]
			}
			return e.save()
		}))
	}
	catch (err) {
		console.log(err)
	}
	finally {
		console.log('Done updating redmine info...')
	}
}

const processIssues = async (issues, info) => {
	for (const {
		assigned_to,
		tracker,
		status,
		estimated_hours = 0,
		custom_fields
	} of issues) {
		let employeeInfo
		
		if (!assigned_to || !(employeeInfo = info.employees[assigned_to.id])) {
			continue
		}
		
		employeeInfo.issueNumber++
		employeeInfo.issuesCompleted += ['Решена', 'Закрыта'].includes(status.name)
		employeeInfo.nonScienceHours +=
			estimated_hours * (tracker.name !== 'Научная работа')
		
		const hours = employeeInfo.hours[tracker.name] || 0
		employeeInfo.hours[tracker.name] = hours + estimated_hours
		
		if (custom_fields) {
			const difficulty = custom_fields.find(f => f.name
				=== 'Оценка сложности').value
			const completion = custom_fields.find(f => f.name
				=== 'Оценка качества выполнения').value
			employeeInfo.score += difficulty * completion
		}
	}
}

const getIssues = async (offset, startDate, dueDate) => {
	const urlParams = new URLSearchParams({
		start_date: `>=${startDate}`,
		due_date: `<=${dueDate}`,
		status_id: '*',
		limit: 100,
		offset,
	})
	const resp = await fetch(
		`${process.env.REDMINE_SERVER}/issues.json?${urlParams}`, {
			headers: { 'X-Redmine-Api-Key': process.env.REDMINE_KEY },
		},
	)
	return resp.json()
}

const getReportDates = () => {
	const DAY_IN_MS = 24 * 60 * 60 * 1000
	const subtractDays = (numOfDays, date) => {
		date.setMilliseconds(date.getMilliseconds() - numOfDays * DAY_IN_MS)
	}
	const dateToString = (date) => (
		date.toJSON().slice(0, 10)
	)
	const date = new Date()
	while (date.getDay() !== 0) {
		subtractDays(1, date)
	}
	const dueDate = dateToString(date)
	subtractDays(6, date)
	const startDate = dateToString(date)
	return { startDate, dueDate }
}
*/
