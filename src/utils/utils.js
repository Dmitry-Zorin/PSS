export const fetchAPI = async (url, options = {}) => {
    const resp = await fetch(
        `${process.env.SERVER}/api/${url}`,
        {
            credentials: 'include',
            ...options
        }
    )
    return await resp.json()
}

export const getResourceData = async (dataProvider, notify, author) => {
    const resourceData = await fetchAPI(`form16?author=${author}`)

    if (resourceData.every(data => Object.values(data).every(e => !e.length))) {
        return notify('ra.notification.author_not_found')
    }

    return resourceData
}
