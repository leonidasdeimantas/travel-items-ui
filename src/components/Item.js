import React from 'react';

class Item extends React.Component {
  constructor() {
    super()
    this.state = {
      asignee: "",
      price: "",
      typing: false
    }
    this.handleTyping = this.handleTyping.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleButton = this.handleButton.bind(this)
    this.handleButtonX = this.handleButtonX.bind(this)
    this.handleKey = this.handleKey.bind(this)
  }

  handleTyping(value, prop) {
    if (prop === "assignee") {
      this.setState({ asignee: value, typing: true })
    } else if (prop === "price") {
      this.setState({ price: value, typing: true })
    }
  }

  handleClick(id, completed_item, clicked, prop) {
    if (completed_item || clicked) return
    if (prop === "assignee") {
      this.setState({ asignee: this.props.item.asignee })
    } else if (prop === "price") {
      this.setState({ price: this.props.item.price })
    }
    
    this.props.handleClick(this.props.item.id, prop)
  }

  handleButton(event, id, prop) {
    event.preventDefault()
    this.setState({ typing: false })

    if (prop === "assignee") {
      this.props.handleAsignee(id, this.state.asignee)
    } else if (prop === "price") {
      this.props.handlePrice(id, this.state.price)
    }

    this.props.handleClick(-1);
  }

  handleKey(event) {
    if(event.keyCode === 27) this.handleButtonX()
  }

  handleButtonX(id, prop) {
    this.setState({ typing: false })
    if (id && prop) {
      if (prop === "assignee") {
        this.props.handleAsignee(id, "")
      } else if (prop === "price") {
        this.props.handlePrice(id, "")
      }
    }
    this.props.handleClick(-1);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKey, false)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKey, false)
  }

  componentDidUpdate() {
    let inputBox = document.getElementById("ItemAsigneeInputID")
    if (inputBox) {
      inputBox.focus()
    }
  }

  render() {
    const completedStyle = {
      color: "#cdcdcd",
      textDecoration: "line-through"
    }
    const completedStyleAsignee = {
      color: "#dddddd",
    }
    const completedStyleButton = {
      background: "var(--bord_color)"
    }
    const zeroPaddingStyle = {
      padding: "0"
    }

    let clicked_assignee = false;
    let clicked_price = false;
    if(this.props.item.id === this.props.clicked_assignee) clicked_assignee = true;
    if(this.props.item.id === this.props.clicked_price) clicked_price = true;

    return (
      <div className="FlexRow ItemContainer">
        <div className="ItemCompleteButtonContainer">
          <button type="button" className="ItemCompleteButton"
            style={this.props.item.completed ? completedStyleButton : null} 
            onClick={() => this.props.handleDone(this.props.item.id)}>
          </button>
        </div>

        <div className="ItemContent">
          <div className="FlexRow">
            <div className="ItemMainText" style={this.props.item.completed ? completedStyle : null}>
              {this.props.item.text}
            </div>
            <button className="XButtonButton" onClick={() => this.props.handleRemoveItem(this.props.item.id)}>✕</button>

          </div>

          {/* Properties field */}
          <div className="ItemPropertiesContainer">
            <div className="ItemPropertiesItem">
              <p className="ItemPropertiesText" style={this.props.item.completed ? completedStyleAsignee: null}>Asignee:</p>

              <div 
                className="ItemProperties" 
                style={this.props.item.completed ? completedStyleAsignee: null}
                onMouseDown={() => this.handleClick(this.props.item.id, this.props.item.completed, clicked_assignee, "assignee")}
              >
                {!clicked_assignee && (this.props.item.asignee ? this.props.item.asignee : !this.props.item.completed ? <p className="ItemNoProperties">Click to add</p> : <p className="ItemNoProperties">None</p>)}
                {
                  clicked_assignee && 
                  <span>
                    <form onSubmit={e => this.handleButton(e, this.props.item.id, "assignee")}>
                      <input 
                        id="ItemAsigneeInputID"
                        className="ItemPropertiesInput"
                        type="textbox" 
                        placeholder="Enter name..."
                        value={this.state.asignee}
                        onChange={e => this.handleTyping(e.target.value, "assignee")}
                        autoFocus
                      /> 
                      <input type="submit" className="ItemPropertiesButton" value="✓"/>
                      <button type="button" className="ItemPropertiesButtonX" onClick={() => this.handleButtonX(this.props.item.id, "assignee")}>✕</button> 
                    </form>
                  </span>
                }
              </div>

            </div>
            
            <div className="ItemPropertiesItem">
              <p className="ItemPropertiesText" style={this.props.item.completed ? completedStyleAsignee: null}>Price:</p>

              <div 
                className="ItemProperties" 
                style={this.props.item.completed ? completedStyleAsignee: null}
                onMouseDown={() => this.handleClick(this.props.item.id, this.props.item.completed, clicked_price, "price")}
              >
                {!clicked_price && (this.props.item.price ? this.props.item.price : !this.props.item.completed ? <p className="ItemNoProperties">Click to add</p> : <p className="ItemNoProperties">None</p>)}
                {
                  clicked_price && 
                  <span>
                    <form onSubmit={e => this.handleButton(e, this.props.item.id, "price")}>
                      <input 
                        id="ItemAsigneeInputID"
                        className="ItemPropertiesInput"
                        type="textbox" 
                        placeholder="Enter price..."
                        value={this.state.price}
                        onChange={e => this.handleTyping(e.target.value, "price")}
                        autoFocus
                      /> 
                      <input type="submit" className="ItemPropertiesButton" value="✓"/>
                      <button type="button" className="ItemPropertiesButtonX" onClick={() => this.handleButtonX(this.props.item.id, "price")}>✕</button> 
                    </form>
                  </span>
                }
              </div>

            </div>
            

          </div>
        </div>
      </div>
    );
  }
}

export default Item;
