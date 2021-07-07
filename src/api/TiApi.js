import { getAuthToken } from '../utils/LocalStorage'

class TiApi {

    constructor(url) {
        this.api = url;
    }

    async getTrip(tripUrl) {
        const requestOptions = {
            headers: { 'Authorization': getAuthToken() }
        }

        return await fetch(`${this.api}/trip?tripUrl=${tripUrl}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.checkForErrors(data)
                return data
            })
            .catch(error => { throw new Error(`getTrip error ${error}`) })
    }

    async getAllTasks(tripUrl) {
        const requestOptions = {
            headers: { 'Authorization': getAuthToken() }
        }

        return await fetch(`${this.api}/task/all?tripUrl=${tripUrl}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.checkForErrors(data)
                let tasks = []
                data.forEach(element => {
                    let task = {
                        id: element.id,
                        text: element.task,
                        assignee: element.assigneeId,
                        price: element.price,
                        completed: element.completed,
                        list: element.listId
                    }
                    tasks.push(task)
                })
                
                return tasks.reverse()
            })
            .catch(error => { throw new Error(`getAllTasks error ${error}`) })
    }

    async getAllAssignees(tripUrl) {
        const requestOptions = {
            headers: { 'Authorization': getAuthToken() }
        }

        return await fetch(`${this.api}/assignee/all?tripUrl=${tripUrl}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.checkForErrors(data)
                let assignees = []
                data.forEach(element => {
                    let assignee = {
                        id: element.id,
                        name: element.name
                    }
                    assignees.push(assignee)
                })

                return assignees.reverse()
            })
            .catch(error => { throw new Error(`getAllAssignees error ${error}`) })
    }

    async getAllLists(tripUrl) {
        const requestOptions = {
            headers: { 'Authorization': getAuthToken() }
        }

        return await fetch(`${this.api}/list/all?tripUrl=${tripUrl}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.checkForErrors(data)
                let lists = []
                data.forEach(element => {
                    let list = {
                        id: element.id,
                        name: element.name
                    }
                    lists.push(list)
                })

                return lists.reverse()
            })
            .catch(error => { throw new Error(`getAllLists error ${error}`) })
    }

    async getAllNotes(tripUrl) {
        const requestOptions = {
            headers: { 'Authorization': getAuthToken() }
        }

        return await fetch(`${this.api}/notes/all?tripUrl=${tripUrl}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.checkForErrors(data)
                let notes = []
                data.forEach(element => {
                    let note = {
                        id: element.id,
                        note: element.note,
                        time: element.time,
                        name: element.userName
                    }
                    notes.push(note)
                })
                return notes.reverse()
            })
            .catch(error => { throw new Error(`getAllNotes error ${error}`) })
    }

    async addTrip(trip) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': getAuthToken() 
            },
            body: JSON.stringify(trip)
        }

        let response = await fetch(`${this.api}/trip`, requestOptions)
            .then(resp => resp.json())
            .then(data => {
                this.checkForErrors(data)
                return data
            })
            .catch(error => { throw new Error(`addTrip error ${error}`) })

        return response
    }

    async changePublicTrip(url, value) {
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': getAuthToken() 
            },
            body: JSON.stringify({ url: url, public: value})
        }

        let response = await fetch(`${this.api}/trip`, requestOptions)
            .then(resp => resp.status)
            .then(data => {
                this.checkForErrors(data)
                return data
            })
            .catch(error => { throw new Error(`changePublicTrip error ${error}`) })

        return response
    }

    async changeLocationTrip(url, value) {
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': getAuthToken() 
            },
            body: JSON.stringify({ url: url, location: value})
        }

        let response = await fetch(`${this.api}/trip/loc`, requestOptions)
            .then(resp => resp.status)
            .then(data => {
                this.checkForErrors(data)
                return data
            })
            .catch(error => { throw new Error(`changeLocationTrip error ${error}`) })

        return response
    }

    async  getAllTrips() {
        const requestOptions = {
            headers: { 'Authorization': getAuthToken() }
        }

        return await fetch(`${this.api}/trip/all`, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.checkForErrors(data)
                let trips = []
                data.forEach(element => {
                    let trip = {
                        url: element.tripUrl,
                        name: element.name,
                        public: element.public,
                    }
                    trips.push(trip)
                })
                
                return trips.reverse()
            })
            .catch(error => { throw new Error(`getAllTrips error ${error}`) })
    }

    async addTask(task) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': getAuthToken() 
            },
            body: JSON.stringify(task)
        }

        let response = await fetch(`${this.api}/task`, requestOptions)
            .then(resp => resp.status)
            .then(data => {
                this.checkForErrors(data)
                return data
            })
            .catch(error => { throw new Error(`addTask error ${error}`) })

        return response
    }

    async updateTask(task) {
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': getAuthToken() 
            },
            body: JSON.stringify(task)
        }

        let response = await fetch(`${this.api}/task`, requestOptions)
            .then(resp => resp.status)
            .catch(error => { throw new Error(`updateTask error ${error}`) })

        return response
    }

    async deleteTask(tripUrl, taskId) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': getAuthToken() }
        }

        return await fetch(`${this.api}/task?tripUrl=${tripUrl}&taskId=${taskId}`, requestOptions)
            .catch(error => { throw new Error(`deleteTask error ${error}`) })
    }

    async addAssignee(assignee) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': getAuthToken() 
            },
            body: JSON.stringify(assignee)
        }

        let response = await fetch(`${this.api}/assignee`, requestOptions)
            .then(resp => resp.status)
            .then(data => {
                this.checkForErrors(data)
                return data
            })
            .catch(error => { throw new Error(`addAssignee error ${error}`) })

        return response
    }

    async deleteAssignee(tripUrl, assigneeId) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': getAuthToken() }
        }

        return await fetch(`${this.api}/assignee?tripUrl=${tripUrl}&assigneeId=${assigneeId}`, requestOptions)
            .catch(error => { throw new Error(`deleteAssignee error ${error}`) })
    }

    async addList(list) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': getAuthToken() 
            },
            body: JSON.stringify(list)
        }

        let response = await fetch(`${this.api}/list`, requestOptions)
            .then(resp => resp.status)
            .then(data => {
                this.checkForErrors(data)
                return data
            })
            .catch(error => { throw new Error(`addList error ${error}`) })

        return response
    }

    async deleteList(tripUrl, listId) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': getAuthToken() }
        }

        return await fetch(`${this.api}/list?tripUrl=${tripUrl}&listId=${listId}`, requestOptions)
            .catch(error => { throw new Error(`deleteList error ${error}`) })
    }

    async addNote(note) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': getAuthToken() 
            },
            body: JSON.stringify(note)
        }

        let response = await fetch(`${this.api}/notes`, requestOptions)
            .then(resp => resp.status)
            .then(data => {
                this.checkForErrors(data)
                return data
            })
            .catch(error => { throw new Error(`addNote error ${error}`) })

        return response
    }

    async deleteNote(tripUrl, noteId) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': getAuthToken() }
        }

        return await fetch(`${this.api}/notes?tripUrl=${tripUrl}&noteId=${noteId}`, requestOptions)
            .catch(error => { throw new Error(`deleteNote error ${error}`) })
    }

    async deleteTrip(tripUrl) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': getAuthToken() }
        }

        return await fetch(`${this.api}/trip?tripUrl=${tripUrl}`, requestOptions)
            .catch(error => { throw new Error(`deleteTrip error ${error}`) })
    }

    checkForErrors(resp) {
        if (typeof resp.status != "undefined") {
            if (resp.status === 401) {
                throw new Error("Unauthorized")
            }
        }
    }
}

export default TiApi;