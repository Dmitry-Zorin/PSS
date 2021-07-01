import {fetchUtils} from "react-admin"

export const fetchAPI = (url, options = {}) => (
    fetchUtils.fetchJson(`${process.env.SERVER}/api/${url}`, {
        credentials: 'include',
        ...options
    })
)

export const getResourceData = async (dataProvider, notify, author) => {
    const {json} = await fetchAPI(`form16?author=${author}`)
    console.log(json)

    if (json.every(data => Object.values(data).every(e => !e.length))) {
        return notify('ra.notification.author_not_found')
    }

    return json
}
