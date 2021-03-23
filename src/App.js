import React from 'react';
import queryString from 'query-string'
import './App.css';

import ItemList from './components/ItemList'
import ItemEnter from './components/ItemEnter'
import TripEnter from './components/TripEnter'
import Header from './components/Header'
import Assignees from './components/Assignees'
import Spinner from './components/Spinner';

import { getRecentTrips, storeTrip } from './utils/LocalStorage'
import TiApi from './api/TiApi'


const API_URL = 'https://deimantas.tech/ti-api'
//const API_URL = 'http://localhost:8080'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            items: [],
            people: [],
            page: "",
            tripUrl: "",
            tripName: "",
            tripLoc: "",
            tripFound: false,
            recents: {},
            loading: true
        }
        this.tiApi = new TiApi(API_URL);
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleRemoveItem = this.handleRemoveItem.bind(this)
        this.handleDone = this.handleDone.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleAddTrip = this.handleAddTrip.bind(this)
        this.handleAddAssignee = this.handleAddAssignee.bind(this)
        this.handleRemoveAssingee = this.handleRemoveAssingee.bind(this)
    }

    componentDidMount() {
        this.setTripAndFetch(queryString.parse(this.props.location.search).tripUrl)
        this.setState({ loading: false, recents: getRecentTrips() })
    }

    setTripAndFetch(trip) {
        if (trip) {
            this.setState({ tripUrl: trip }, this.fetchAllData)
        } else {
            this.setState({ page: "main" })
        }
    }

    async fetchAllData() {
        if (this.state.tripUrl === "") {
            return 
        } else {
            this.setState({ loading: true })
        }        

        try {
            let page = (this.state.page === "main" || this.state.page === "") ? "items" : this.state.page

            let newItems = await this.tiApi.getAllTasks(this.state.tripUrl)
            let newAssignees = await this.tiApi.getAllAssignees(this.state.tripUrl)
            let trip =  await this.tiApi.getTrip(this.state.tripUrl)

            storeTrip({ name: trip.name, url: this.state.tripUrl })

            this.setState({
                items: newItems,
                people: newAssignees,
                page: page,
                tripName: trip.name,
                tripLoc: trip.location,
                tripFound: true,
                recents: getRecentTrips()
            })

        } catch (error) {
            this.handleFetchError(error)
        }

        this.setState({ loading: false })
    }

    handleAddTrip(name, location) {
        let newTrip = { name: name, location: location }

        this.setState({ loading: true }, () => {
            this.tiApi.addTrip(newTrip)
                .then(response => window.location.href = `?tripUrl=${response.tripUrl}`)
                .catch(error => this.handleFetchError(error))
        })
    }

    handleAddItem(text) {
        let newTask = { task: text, tripUrl: this.state.tripUrl }

        this.setState({ loading: true }, () => {
            this.tiApi.addTask(newTask)
                .then(() => { this.fetchAllData() })
                .catch(error => this.handleFetchError(error))
        })
    }

    handleUpdateItem(item) {
        let updatedTrip = { id: item.id, task: item.text, price: item.price, assigneeId: item.assignee, tripUrl: this.state.tripUrl, completed: item.completed }

        this.setState({ loading: true }, () => {
            this.tiApi.updateTask(updatedTrip)
                .then(() => { this.fetchAllData() })
                .catch(error => this.handleFetchError(error))
        })
    }

    handleRemoveItem(id) {
        this.setState({ loading: true }, () => {
            this.tiApi.deleteTask(this.state.tripUrl, id)
                .then(() => { this.fetchAllData() })
                .catch(error => this.handleFetchError(error))
        })
    }

    handleAddAssignee(assgineeName) {
        let newAssignee = { name: assgineeName, tripUrl: this.state.tripUrl }

        this.setState({ loading: true }, () => {
            this.tiApi.addAssignee(newAssignee)
                .then(() => { this.fetchAllData() })
                .catch(error => this.handleFetchError(error))
        })
    }

    handleRemoveAssingee(id) {
        this.setState({ loading: true }, () => {
            this.tiApi.deleteAssignee(this.state.tripUrl, id)
                .then(() => { this.fetchAllData() })
                .catch(error => this.handleFetchError(error))
        })
    }

    handleDone(id) {
        let item = this.state.items.find(element => element.id === id)

        item.completed = !item.completed
        this.handleUpdateItem(item)
    }

    handleEdit(id, assignee, price) {
        let item = this.state.items.find(element => element.id === id)

        item.assignee = assignee
        item.price = price
        this.handleUpdateItem(item)
    }

    handleChangePage(value) {
        this.setState({ page: value })
    }

    handleFetchError(error) {
        this.setState({
            page: "main",
            tripFound: false,
            loading: false
        })
        console.log("Can't fetch data: " + error)
    }

    render() {
        return (
            <div className="App">
                <Header
                    itemCnt={this.state.items.length}
                    peopleCnt={this.state.people.length}
                    page={this.state.page}
                    tripFound={this.state.tripFound}
                    handleChangePage={this.handleChangePage}
                />
                {
                    (this.state.page === "main") &&
                    <main role="main" className="container">
                        <TripEnter
                            handleAddTrip={this.handleAddTrip}
                            recents={[this.state.recents]} />
                    </main>
                }
                {
                    (this.state.page === "items") &&
                    <main role="main" className="container">
                        <ItemEnter
                            handleAddItem={this.handleAddItem}
                            tripUrl={this.state.tripUrl}
                            tripName={this.state.tripName}
                            tripLoc={this.state.tripLoc}
                            item="item" />
                        {
                            (this.state.items.length > 0) &&
                            <ItemList
                                items={this.state.items}
                                people={this.state.people}
                                handleDone={this.handleDone}
                                handleEdit={this.handleEdit}
                                handleRemoveItem={this.handleRemoveItem}
                            />
                        }
                    </main>
                }
                {
                    (this.state.page === "people") &&
                    <main role="main" className="container">
                        <ItemEnter
                            handleAddItem={this.handleAddAssignee}
                            tripUrl={this.state.tripUrl}
                            tripName={this.state.tripName}
                            tripLoc={this.state.tripLoc}
                            item="assignee" />
                        <Assignees
                            people={this.state.people}
                            handleRemove={this.handleRemoveAssingee} />
                    </main>
                }
                <Spinner loading={this.state.loading}/>
            </div>
        );
    }
}

export default App;
