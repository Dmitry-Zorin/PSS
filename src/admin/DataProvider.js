import simpleRestProvider from 'ra-data-simple-rest'
import {fetchUtils} from 'react-admin'

const apiUrl = `${process.env.SERVER}/api`

const restProvider = simpleRestProvider(apiUrl, (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'})
    }
    options.credentials = 'include'
    return fetchUtils.fetchJson(url, options)
})

const dataProvider = {
    ...restProvider,
    create: (resource, params) => {
        const formData = new FormData()

        for (const key in params.data) {
            if (['file', 'certificateFile'].includes(key)) {
                formData.append(key, params.data[key].rawFile, params.data[key].rawFile.name)
            } else if (['subdivisions', 'authors', 'tags'].includes(key)) {
                formData.append(key, JSON.stringify(params.data[key]))
            } else {
                formData.append(key, params.data[key])
            }
        }

        return fetch(`${apiUrl}/${resource}`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
            .then(data => data.json())
            .then(json => (
                {
                    data: {...params.data, id: json.id},
                }
            ))
    },
    update: (resource, params) => {
        const formData = new FormData()

        for (const key in params.data) {
            if (key === 'file') {
                formData.append(key, params.data[key].url)
            } else if (['newfile', 'newCertificateFile'].includes(key) && params.data[key]) {
                formData.append(key, params.data[key].rawFile, params.data[key].rawFile.name)
            } else if (['subdivisions', 'authors', 'tags'].includes(key)) {
                formData.append(key, JSON.stringify(params.data[key]))
            } else if (key === 'certificate') {
                for (const subkey in params.data[key]) {
                    if (subkey === 'code') {
                        formData.append('certificateCode', params.data[key][subkey])
                    }
                    if (subkey === 'file') {
                        formData.append('certificateFile', params.data[key][subkey].url)
                    }
                }
            } else {
                formData.append(key, params.data[key])
            }
        }

        return fetch(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            credentials: 'include',
            body: formData
        })
            .then(data => data.json())
            .then(json => (
                {data: json}
            ))
    },
    getMany: (resource, params) => {
        const formData = new FormData()

        formData.append('ids', JSON.stringify(params.ids))

        return fetch(`${apiUrl}/${resource}/many`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
            .then(data => data.json())
            .then(json => (
                {data: json}
            ))
    },
}

export default dataProvider