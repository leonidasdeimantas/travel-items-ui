import React from 'react';
import ItemList from './components/ItemList'
import ItemEnter from './components/ItemEnter'
import Header from './components/Header'
import './App.css';

class App extends React.Component  {
  constructor() {
    super()
    this.state = {
        items: [],
        clicked_assignee: -1,
        clicked_price: -1
    }
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleAsignee = this.handleAsignee.bind(this)
    this.handlePrice = this.handlePrice.bind(this)
  }

  handleAddItem(text) {
    this.setState(prevState => {
      let updatedItems = prevState.items;
      let newItem = {
        id: updatedItems.length+1,
        text: text,
        asignee: "",
        price: "",
        completed: false
      }
      updatedItems.push(newItem)

      return {
        items: updatedItems
      }
    })
  }

  handleRemoveItem(id) {
    this.setState(prevState => {
      let updatedItems = prevState.items;
      let i = 0;

      while (i < updatedItems.length) {
        if (updatedItems[i].id === id) {
          updatedItems.splice(i, 1)
          break
        } else {
          ++i
        }
      }

      return {
        items: updatedItems
      }
    })
  }

  handleClick(id, prop) {
    if (id == -1) {
      this.setState({
        clicked_assignee: id,
        clicked_price: id
      })
      return
    }
    if (prop == "assignee") {
      this.setState({
        clicked_assignee: id
      })
    } else if (prop == "price") {
      this.setState({
        clicked_price: id
      })
    }
  }

  handleDone(id) {
    this.setState(prevState => {
        const updatedItems = prevState.items.map(item => {
            if (item.id === id) {
                item.completed = !item.completed
            }
            return item
        })
        return {
            items: updatedItems
        }
    })
  }

  handleAsignee(id, value) {
    this.setState(prevState => {
        const updatedItems = prevState.items.map(item => {
            if (item.id === id) {
                item.asignee = value
            }
            return item
        })
        return {
            items: updatedItems
        }
    })
  }

  handlePrice(id, value) {
    this.setState(prevState => {
        const updatedItems = prevState.items.map(item => {
            if (item.id === id) {
                item.price = value
            }
            return item
        })
        return {
            items: updatedItems
        }
    })
  }

  render() {
    return (
      <div className="App">
          <Header />
          <main role="main" class="container">
            <ItemEnter 
              handleAddItem={this.handleAddItem}
            />
            {
              (this.state.items.length > 0) &&
              <ItemList 
                items={this.state.items}
                clicked_assignee={this.state.clicked_assignee} 
                clicked_price={this.state.clicked_price} 
                handleClick={this.handleClick} 
                handleDone={this.handleDone}
                handleAsignee={this.handleAsignee}
                handlePrice={this.handlePrice}
                handleRemoveItem={this.handleRemoveItem}
              />
            }
          </main>
      </div>
    );
  }
}

export default App;
