import React from 'react';
import ItemList from './components/ItemList'
import ItemEnter from './components/ItemEnter'
import TripEnter from './components/TripEnter'
import Header from './components/Header'
import Assignees from './components/Assignees'
import queryString from 'query-string'
import './App.css';

const API_URL = 'https://deimantas.space/ti-api'

class App extends React.Component  {
  constructor() {
    super()
    this.state = {
        items: [],
        people: [],
        page: "main",
        tripUrl: "",
        tripName: "",
        tripLoc: "",
        tripFound: false
    }
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleNewTrip = this.handleNewTrip.bind(this)
    this.handleAddAssignee = this.handleAddAssignee.bind(this)
    this.handleRemoveAssingee = this.handleRemoveAssingee.bind(this)
  }

  componentDidMount() {
    this.setTripAndFetch(queryString.parse(this.props.location.search).tripUrl)
  }

  setTripAndFetch(trip) {
    if (trip) this.setState({tripUrl: trip}, this.fetchTrip)
  }

  async fetchTrip() {
    if (this.state.tripUrl === "") return

    try {
      let page = (this.state.page === "main") ? "items" : this.state.page
      let newItems = []
      let newAssignees = []

      let response = await fetch(`${API_URL}/tasks?tripUrl=${this.state.tripUrl}`)
      const items = await response.json()
      response = await fetch(`${API_URL}/peoples?tripUrl=${this.state.tripUrl}`)
      const assignees = await response.json()
      response = await fetch(`${API_URL}/trip?tripUrl=${this.state.tripUrl}`)
      const trip = await response.json()

      items.forEach(element => {
        let newItem = {
          id: element.id,
          text: element.task,
          assignee: element.assigneeId,
          price: element.price,
          completed: element.completed
        }
        newItems.push(newItem)
      })

      assignees.forEach(element => {
        let newItem = {
          id: element.id,
          name: element.name
        }
        newAssignees.push(newItem)
      })
  
      this.setState({
        items: newItems.reverse(),
        people: newAssignees.reverse(),
        page: page,
        tripName: trip.name,
        tripLoc: trip.location,
        tripFound: true
      })

    } catch {
      this.setState({
        page: "main",
        tripFound: false
      })
      console.log("Can't fetch data")
    }
  }

  handleNewTrip(name, location) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        location: location
      })
    };
    fetch(`${API_URL}/trip`, requestOptions)
    .then(response => response.json())
    .then(data => {
      window.location.href=`?tripUrl=${data.tripUrl}`
    })
    .catch((error) => {
      console.error('Error:', error)
    });
  }

  updateItem(item) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: item.id,
        task: item.text,
        price: item.price,
        assigneeId: item.assignee,
        tripUrl: this.state.tripUrl,
        completed: item.completed
      })
    };
    fetch(`${API_URL}/task`, requestOptions)
    .then(() => { this.fetchTrip() })
    .catch((error) => {
      console.error('Error:', error)
    });
  }

  handleAddItem(text) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task: text,
        tripUrl: this.state.tripUrl
      })
    };
    fetch(`${API_URL}/task`, requestOptions)
    .then(() => { this.fetchTrip() })
    .catch((error) => {
      console.error('Error:', error)
    });
  }

  handleRemoveItem(id) {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`${API_URL}/task?tripUrl=${this.state.tripUrl}&taskId=${id}`, requestOptions)
    .then(() => { this.fetchTrip() })
    .catch((error) => {
      console.error('Error:', error)
    });
  }

  handleAddAssignee(text) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: text,
        tripUrl: this.state.tripUrl
      })
    };
    fetch(`${API_URL}/people`, requestOptions)
    .then(() => { this.fetchTrip() })
    .catch((error) => {
      console.error('Error:', error)
    });
  }

  handleRemoveAssingee(id) {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`${API_URL}/people?tripUrl=${this.state.tripUrl}&taskId=${id}`, requestOptions)
    .then(() => { this.fetchTrip() })
    .catch((error) => {
      console.error('Error:', error)
    });
  }

  handleDone(id) {
    let item = this.state.items.find(element => element.id === id)

    item.completed = !item.completed
    this.updateItem(item)
  }

  handleEdit(id, assignee, price) {
    let item = this.state.items.find(element => element.id === id)

    item.assignee = assignee
    item.price = price
    this.updateItem(item)
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
              <TripEnter handleNewTrip={this.handleNewTrip} />
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
