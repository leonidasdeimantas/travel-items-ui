import React from 'react';
import ItemList from './components/ItemList'
import ItemEnter from './components/ItemEnter'
import TripEnter from './components/TripEnter'
import Header from './components/Header'
import Assignees from './components/Assignees'
import queryString from 'query-string'
import CookieUtil from './utils/CookieUtil'
import TiApi from './api/TiApi'
import './App.css';

//const API_URL = 'https://deimantas.space/ti-api'
const API_URL = 'http://localhost:8080'
const RECENT_CNT = 3

class App extends React.Component {
    constructor() {
        super()
        this.cookieUtil = new CookieUtil();
        this.tiApi = new TiApi(API_URL);
        this.state = {
            items: [],
            people: [],
            page: "",
            tripUrl: "",
            tripName: "",
            tripLoc: "",
            tripFound: false,
            recents: {}
        }
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
        this.fetchRecentTrips()
    }

    setTripAndFetch(trip) {
        if (trip) this.setState({ tripUrl: trip }, this.fetchTrip)
        else this.setState({ page: "main" })
    }

    async fetchTrip() {
        if (this.state.tripUrl === "") return

        try {
            let page = (this.state.page === "main" || this.state.page === "") ? "items" : this.state.page

            let newItems = await this.tiApi.getAllTasks(this.state.tripUrl)
            let newAssignees = await this.tiApi.getAllAssignees(this.state.tripUrl)
            let trip =  await this.tiApi.getTrip(this.state.tripUrl)

            this.cookieUtil.saveTripLocally(this.state.tripUrl)
            this.fetchRecentTrips()

            this.setState({
                items: newItems,
                people: newAssignees,
                page: page,
                tripName: trip.name,
                tripLoc: trip.location,
                tripFound: true
            })

        } catch (e) {
            this.setState({
                page: "main",
                tripFound: false
            })
            console.log("Can't fetch data " + e)
        }
    }

    async fetchRecentTrips() {
        let count = 0;
        let currentCookies = [];
        [currentCookies, count] = this.cookieUtil.getTripLocally()

        if (count < RECENT_CNT) return

        try {
            let recentTrips = [];
            for (let i = 1; i <= RECENT_CNT; i++) {
                let tripStr = "trip" + i
                if (currentCookies[tripStr] !== "undefined") {
                    recentTrips[tripStr] = await this.tiApi.getTrip(currentCookies[tripStr])
                }
            }

            this.setState({
                recents: recentTrips
            })

        } catch (e) {
            console.log("Can't fetch data " + e)
        }
    }

    handleAddTrip(name, location) {
        let newTrip = { name: name, location: location }

        this.tiApi.addTrip(newTrip)
            .then(response => window.location.href = `?tripUrl=${response.tripUrl}`)
            .catch(error => console.error('Error:', error));
    }

    handleAddItem(text) {
        let newTask = { task: text, tripUrl: this.state.tripUrl }

        this.tiApi.addTask(newTask)
            .then(() => { this.fetchTrip() })
            .catch(error => console.error('Error:', error));
    }

    handleUpdateItem(item) {
        let updatedTrip = { id: item.id, task: item.text, price: item.price, assigneeId: item.assignee, tripUrl: this.state.tripUrl, completed: item.completed }

        this.tiApi.updateTask(updatedTrip)
            .then(() => { this.fetchTrip() })
            .catch((error) => { console.error('Error:', error) });
    }

    handleRemoveItem(id) {
        this.tiApi.deleteTask(this.state.tripUrl, id)
            .then(() => { this.fetchTrip() })
    }

    handleAddAssignee(assgineeName) {
        let newAssignee = { name: assgineeName, tripUrl: this.state.tripUrl }

        this.tiApi.addAssignee(newAssignee)
            .then(() => { this.fetchTrip() })
            .catch(error => console.error('Error:', error));
    }

    handleRemoveAssingee(id) {
        this.tiApi.deleteAssignee(this.state.tripUrl, id)
            .then(() => { this.fetchTrip() })
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
                            recents={[this.state.recents]}
                            recentsCnt={RECENT_CNT} />
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
            </div>
        );
    }
}

export default App;
