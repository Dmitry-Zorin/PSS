import {fetchAPI} from "../utils/utils"

const getPromise = (status) => (
    Promise[status === 200 ? 'resolve' : 'reject']()
)

const userIdentity = {}

const authProvider = {
    login: async ({username, password}) => {
        localStorage.setItem('username', username)
        const {status} = await fetchAPI('login', {
            method: 'POST',
            body: JSON.stringify({login: username, password}),
            credentials: 'include',
            headers: new Headers({'Content-Type': 'application/json'})
        })
        return getPromise(status)
    },
    logout: async () => {
        localStorage.clear()
        const {status} = await fetchAPI('logout')
        return getPromise(status)
    },
    checkAuth: async () => {
        userIdentity.fullName = localStorage.getItem('username')
        const {status} = await fetchAPI('authenticate')
        return getPromise(status)
    },
    getPermissions: async () => {
        const {json} = await fetchAPI('permissions')
        return json.isAdmin
    },
    getIdentity: () => userIdentity
}

export default authProvider
