import React from 'react';
import ok_img from '../ok_btn.svg';

class Item extends React.Component  {
  constructor(){
    super()
    this.state = {
      asignee: "",
      typing: false
    }
    this.handleTyping = this.handleTyping.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleButton = this.handleButton.bind(this)
  }

  handleTyping(value) {
    this.setState({ asignee: value, typing: true })
  }

  handleClick(id, completed_item, clicked) {
    if (completed_item || clicked) return
    this.setState({ asignee: this.props.item.asignee })
    this.props.handleClick(this.props.item.id)
  }

  handleButton(id) {
    this.setState({ typing: false })
    this.props.handleAsignee(id, this.state.asignee)
    this.props.handleClick(-1);
  }

  componentDidUpdate() {
    let inputBox = document.getElementById("inputAsigneeBox")
    if (inputBox) {
      inputBox.focus()
    }
  }

  render() {
    const completedStyle = {
      fontStyle: "italic",
      color: "#cdcdcd",
      textDecoration: "line-through"
    }
    const completedStyleAsignee = {
      fontStyle: "italic",
      color: "#dddddd",
    }

    let hovered = false;
    let clicked = false;
    if(this.props.item.id === this.props.hovered) hovered = true;
    if(this.props.item.id === this.props.clicked) clicked = true;

    return (
      <div 
        className="ItemEntry" 
        onMouseOver={() => this.props.handleHover(this.props.item.id)}
        onMouseLeave={() => this.props.handleHover(-1)}
      >

        {/* Item text and checkbox */}
        <div className="ItemEntryText" style={this.props.item.completed ? completedStyle: null}>
          {hovered && <input type="checkbox" 
                             checked={this.props.item.completed} 
                             onChange={() => this.props.handleDone(this.props.item.id)}
                     />}
          {this.props.item.text}
        </div>

        {/* Asignee field */}
        <div 
          className="Asignee" 
          style={this.props.item.completed ? completedStyleAsignee: null}
          onMouseDown={() => this.handleClick(this.props.item.id, this.props.item.completed, clicked)}
        >
          {!clicked && (this.props.item.asignee ? this.props.item.asignee : !this.props.item.completed ? <p className="NoAsignee">Click to assign</p> : null)}
          {clicked && 
            <span>
              <input  
                id="inputAsigneeBox"
                className="AsigneeBox"
                type="textbox" 
                placeholder="Enter name..."
                value={this.state.asignee}
                onChange={e => this.handleTyping(e.target.value)}
              />
              <button 
                type="button" 
                className="AsigneeBtn" 
                onClick={() => this.handleButton(this.props.item.id)}
              >→</button>
            </span>
          }
        </div>

      </div>
    );
  }
}

export default Item;
