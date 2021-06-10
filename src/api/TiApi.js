import { getAuthHeader } from '../utils/LocalStorage'

class TiApi {

    constructor(url) {
        this.api = url;
    }

    async getTrip(tripUrl) {
        return await fetch(`${this.api}/trip?tripUrl=${tripUrl}`)
            .then(response => response.json())
            .catch(error => { throw new Error(`getTrip error ${error}`) })
    }

    async getAllTasks(tripUrl) {
        return await fetch(`${this.api}/task/all?tripUrl=${tripUrl}`)
            .then(response => response.json())
            .then(data => {
                let tasks = []
                data.forEach(element => {
                    let task = {
                        id: element.id,
                        text: element.task,
                        assignee: element.assigneeId,
                        price: element.price,
                        completed: element.completed
                    }
                    tasks.push(task)
                })
                
                return tasks.reverse()
            })
            .catch(error => { throw new Error(`getAllTasks error ${error}`) })
    }

    async getAllAssignees(tripUrl) {
        return await fetch(`${this.api}/assignee/all?tripUrl=${tripUrl}`)
            .then(response => response.json())
            .then(data => {
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

    async addTrip(trip) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trip)
        }

        let response = await fetch(`${this.api}/trip`, requestOptions)
            .then(resp => resp.json())
            .catch(error => { throw new Error(`addTrip error ${error}`) })

        return response
    }

    async addTask(task) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        }

        let response = await fetch(`${this.api}/task`, requestOptions)
            .then(resp => resp.status)
            .catch(error => { throw new Error(`addTask error ${error}`) })

        return response
    }

    async updateTask(task) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        }

        let response = await fetch(`${this.api}/task`, requestOptions)
            .then(resp => resp.status)
            .catch(error => { throw new Error(`updateTask error ${error}`) })

        return response
    }

    async deleteTask(tripUrl, taskId) {
        return await fetch(`${this.api}/task?tripUrl=${tripUrl}&taskId=${taskId}`, { method: 'DELETE' })
            .catch(error => { throw new Error(`deleteTask error ${error}`) })
    }

    async addAssignee(assignee) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(assignee)
        }

        let response = await fetch(`${this.api}/assignee`, requestOptions)
            .then(resp => resp.status)
            .catch(error => { throw new Error(`addAssignee error ${error}`) })

        return response
    }

    async deleteAssignee(tripUrl, assigneeId) {
        return await fetch(`${this.api}/assignee?tripUrl=${tripUrl}&assigneeId=${assigneeId}`, { method: 'DELETE' })
            .catch(error => { throw new Error(`deleteAssignee error ${error}`) })
    }
}

export default TiApi;