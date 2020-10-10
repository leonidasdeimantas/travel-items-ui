import React from 'react';

class ItemEnter extends React.Component  {
  constructor() {
    super()
    this.msgRef = React.createRef()
  }
  handleButton(event) {
    event.preventDefault()
    let text = this.msgRef.current.value
    if (text === "") return
    this.props.handleAddItem(text)
    this.msgRef.current.value = ""
    document.getElementById("ItemEnterInputID").focus()
  }
  render() {
    return (
      <div>
        <form onSubmit={e => this.handleButton(e)}>
          <input id="ItemEnterInputID" type="textbox" className="ItemEnterInput" placeholder="Add item..." ref={this.msgRef} autoFocus/>
          <input type="submit" className="ItemEnterButton" value="Add"/>
        </form>
      </div>
    );
  }
}

export default ItemEnter;
