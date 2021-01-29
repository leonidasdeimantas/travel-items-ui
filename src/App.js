import React from 'react';
import ItemList from './components/ItemList'
import ItemEnter from './components/ItemEnter'
import Header from './components/Header'
import './App.css';

const API_URL = 'http://localhost:8080'

class App extends React.Component  {
  constructor() {
    super()
    this.state = {
        items: [],
        item_cnt: 0,
        people: [],
        page: "items",
        tripUrl: "UkMQ3fuS"
    }
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
  }

  componentDidMount() {
    this.fetchTrip()
  }

  async fetchTrip() {
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
      item_cnt: taskItems.length
    })
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
    fetch(`${API_URL}/task`, requestOptions).then(() => { this.fetchTrip() });
  }

  handleRemoveItem(id) {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`${API_URL}/task?tripUrl=${this.state.tripUrl}&taskId=${id}`, requestOptions).then(() => { this.fetchTrip() });
  }

  updateItem(task) {
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
    console.log(task)
    fetch(`${API_URL}/task`, requestOptions).then(() => { this.fetchTrip() });
  }

  handleDone(id) {
    let task = this.state.items.find(item => {
      if (item.id === id) {
        return item
      }
    })

    task.completed = !task.completed
    this.updateItem(task)
  }

  handleEdit(id, assignee, price) {
    let task = this.state.items.find(item => {
      if (item.id === id) {
        return item
      }
    })

    task.assignee = assignee
    task.price = price
    this.updateItem(task)
  }

  handleChangePage(value) {
    this.setState({ page: value })
  }

  render() {
    console.log(this.state.items)

    return (
      <div className="App">
          <Header 
            item_cnt={this.state.items.length}
            people_cnt={this.state.people.length}
            page={this.state.page}
            handleChangePage={this.handleChangePage}
          />
          {
            (this.state.page == "items") &&
              <main role="main" className="container">
                <ItemEnter handleAddItem={this.handleAddItem} />
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
