import axios from 'axios'

const baseUrl = '/api/persons'
//const baseUrl = 'http://localhost:3001/persons'

const getResult = (request) => {
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return getResult(request)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return getResult(request)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return getResult(request)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return getResult(request)
}

const personService = { getAll, create, remove, update }
export default personService