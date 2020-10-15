import React from 'react';

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
    this.handleButtonX = this.handleButtonX.bind(this)
    this.handleKey = this.handleKey.bind(this)
  }

  handleTyping(value) {
    this.setState({ asignee: value, typing: true })
  }

  handleClick(id, completed_item, clicked) {
    if (completed_item || clicked) return
    this.setState({ asignee: this.props.item.asignee })
    this.props.handleClick(this.props.item.id)
  }

  handleButton(event, id) {
    event.preventDefault()
    this.setState({ typing: false })
    this.props.handleAsignee(id, this.state.asignee)
    this.props.handleClick(-1);
  }

  handleKey(event) {
    if(event.keyCode === 27) this.handleButtonX()
  }

  handleButtonX() {
    this.setState({ typing: false })
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
      fontStyle: "italic",
      color: "#cdcdcd",
      textDecoration: "line-through"
    }
    const completedStyleAsignee = {
      fontStyle: "italic",
      color: "#dddddd",
    }
    const completedStyleButton = {
      background: "rgb(133, 235, 230)"
    }
    const zeroPaddingStyle = {
      padding: "0"
    }

    let hovered = false;
    let clicked = false;
    if(this.props.item.id === this.props.hovered) hovered = true;
    if(this.props.item.id === this.props.clicked) clicked = true;

    return (
      <div 
        className="ItemContainer row"
        style={zeroPaddingStyle}
        onMouseOver={() => this.props.handleHover(this.props.item.id)}
        onMouseLeave={() => this.props.handleHover(-1)}
      >
        <div className="col-2 col-md-1" style={zeroPaddingStyle}>
          <button type="button" className="ItemCompleteButton"
            style={this.props.item.completed ? completedStyleButton : null} 
            onClick={() => this.props.handleDone(this.props.item.id)}>
          </button>
        </div>

        <div className="col-10 col-md-11" style={zeroPaddingStyle}>
          <div className="ItemMainText" style={this.props.item.completed ? completedStyle : null}>
            {this.props.item.text}
          </div>

          {/* Asignee field */}
          <div 
            className="ItemAsignee" 
            style={this.props.item.completed ? completedStyleAsignee: null}
            onMouseDown={() => this.handleClick(this.props.item.id, this.props.item.completed, clicked)}
          >
            {!clicked && (this.props.item.asignee ? this.props.item.asignee : !this.props.item.completed ? <p className="ItemNoAsignee">Click to assign</p> : null)}
            {
              clicked && 
              <span>
                <form onSubmit={e => this.handleButton(e, this.props.item.id)}>
                  <input 
                    id="ItemAsigneeInputID"
                    className="ItemAsigneeInput"
                    type="textbox" 
                    placeholder="Enter name..."
                    value={this.state.asignee}
                    onChange={e => this.handleTyping(e.target.value)}
                    autoFocus
                  />
                  <input type="submit" className="ItemAsigneeButton" value="✓"/>
                  <button type="button" className="ItemAsigneeButtonX" onClick={() => this.handleButtonX()}>✕</button>
                </form>
              </span>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
