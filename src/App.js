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
        item_cnt: 0
    }
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleAddItem(text) {
    this.setState(prevState => {
      let updatedItems = prevState.items;
      let newItem = {
        id: this.state.item_cnt,
        text: text,
        assignee: "",
        price: "",
        completed: false
      }
      updatedItems.push(newItem)

      return {
        items: updatedItems,
        item_cnt: prevState.item_cnt+1
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

  handleEdit(id, assignee, price) {
    this.setState(prevState => {
        const updatedItems = prevState.items.map(item => {
            if (item.id === id) {
                item.assignee = assignee
                item.price = price
            }
            return item
        })
        return {
            items: updatedItems
        }
    })
  }

  render() {
    console.log(this.state.items)
    return (
      <div className="App">
          <Header item_cnt={this.state.items.length}/>
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
      </div>
    );
  }
}

export default App;
