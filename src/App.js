import React from 'react';
import ItemList from './components/ItemList'
import ItemEnter from './components/ItemEnter'
import TripEnter from './components/TripEnter'
import Header from './components/Header'
import queryString from 'query-string'
import './App.css';

const API_URL = 'https://deimantas.space/ti-api'

class App extends React.Component  {
  constructor() {
    super()
    this.state = {
        items: [],
        item_cnt: 0,
        people: [],
        page: "main",
        tripUrl: "",
        tripFound: false
    }
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.createNewTrip = this.createNewTrip.bind(this)
  }

  componentDidMount() {
    this.setTripAndFetch(queryString.parse(this.props.location.search).tripUrl)
  }

  setTripAndFetch(trip) {
    if (trip) this.setState({tripUrl: trip}, this.fetchTrip)
  }

  createNewTrip(name, location) {
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
      //this.setTripAndFetch(data.tripUrl)
    })
    .catch((error) => {
      console.error('Error:', error)
    });
  }

  async fetchTrip() {
    if (this.state.tripUrl === "") return

    try {
      const response = await fetch(`${API_URL}/tasks?tripUrl=${this.state.tripUrl}`)
      const data = await response.json()

      let taskItems = []
  
      data.forEach(task => {
        let newItem = {
          id: task.id,
          text: task.task,
          assignee: task.assigneeId,
          price: task.price,
          completed: task.completed
        }
        taskItems.push(newItem)
      })
  
      this.setState({
        items: taskItems.reverse(),
        item_cnt: taskItems.length,
        page: "items"
      })
    } catch {
      console.log("Can't fetch data")
    }
  }

  updateTask(task) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: task.id,
        task: task.text,
        price: task.price,
        assigneeId: task.assignee,
        tripUrl: this.state.tripUrl,
        completed: task.completed
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

  handleDone(id) {
    let task = this.state.items.find(item => {
      if (item.id === id) {
        return item
      }
      return []
    })

    task.completed = !task.completed
    this.updateTask(task)
  }

  handleEdit(id, assignee, price) {
    let task = this.state.items.find(item => {
      if (item.id === id) {
        return item
      }
      return []
    })

    task.assignee = assignee
    task.price = price
    this.updateTask(task)
  }

  handleChangePage(value) {
    this.setState({ page: value })
  }

  render() {
    return (
      <div className="App">
          <Header 
            item_cnt={this.state.items.length}
            people_cnt={this.state.people.length}
            page={this.state.page}
            handleChangePage={this.handleChangePage}
          />
          {
            (this.state.page === "main") &&
            <main role="main" className="container">
              <TripEnter handleNewTrip={this.createNewTrip} />
            </main>
          }
          {
            (this.state.page === "items") &&
              <main role="main" className="container">
                <ItemEnter 
                  handleAddItem={this.handleAddItem}
                  tripUrl={this.state.tripUrl} />
                {
                  (this.state.items.length > 0) &&
                  <ItemList 
                    items={this.state.items}
                    handleDone={this.handleDone}
                    handleEdit={this.handleEdit}
                    handleRemoveItem={this.handleRemoveItem}
                  />
                }
              </main>
          }
      </div>
    );
  }
}

export default App;
