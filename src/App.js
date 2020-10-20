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
        hovered: -1,
        clicked: -1
    }
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleHover = this.handleHover.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleAsignee = this.handleAsignee.bind(this)
  }

  handleAddItem(text) {
    this.setState(prevState => {
      let updatedItems = prevState.items;
      let newItem = {
        id: updatedItems.length+1,
        text: text,
        asignee: "",
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

  handleHover(id) {
    this.setState({
      hovered: id
    })
  }

  handleClick(id) {
    this.setState({
      clicked: id
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

  render() {
    return (
      <div className="App">
        <div className="AppBody">
          <Header />
          <div className="MainItemBox">
            <ItemEnter 
              handleAddItem={this.handleAddItem}
            />
            {
              (this.state.items.length > 0) &&
              <ItemList 
                items={this.state.items}
                hovered={this.state.hovered} 
                handleHover={this.handleHover} 
                clicked={this.state.clicked} 
                handleClick={this.handleClick} 
                handleDone={this.handleDone}
                handleAsignee={this.handleAsignee}
                handleRemoveItem={this.handleRemoveItem}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
