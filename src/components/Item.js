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

  handleButtonX(id) {
    this.setState({ typing: false })
    if (id) this.props.handleAsignee(id, "")
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
          <div className="FlexRow">
            <div className="ItemMainText" style={this.props.item.completed ? completedStyle : null}>
              {this.props.item.text}
            </div>
            {hovered &&
              <button className="XButtonButton">✕</button>
            }

          </div>

          {/* Properties field */}
          <div className="ItemPropertiesContainer row">
            <div className="ItemPropertiesItem col-8">
              <p className="ItemPropertiesText" style={this.props.item.completed ? completedStyleAsignee: null}>Asignee:</p>

              <div 
                className="ItemAsignee" 
                style={this.props.item.completed ? completedStyleAsignee: null}
                onMouseDown={() => this.handleClick(this.props.item.id, this.props.item.completed, clicked)}
              >
                {!clicked && (this.props.item.asignee ? this.props.item.asignee : !this.props.item.completed ? <p className="ItemNoAsignee">Click to assign</p> : <p className="ItemNoAsignee">None</p>)}
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
                      <button type="button" className="ItemAsigneeButtonX" onClick={() => this.handleButtonX(this.props.item.id)}>✕</button>
                    </form>
                  </span>
                }
              </div>

            </div>
            
            <div className="ItemPropertiesItem col-4">
              <p className="ItemPropertiesText" style={this.props.item.completed ? completedStyleAsignee: null}>Price:</p>
            </div>
            

          </div>
        </div>
      </div>
    );
  }
}

export default Item;
