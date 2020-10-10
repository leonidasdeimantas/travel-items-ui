import React from 'react';

class ItemEnter extends React.Component  {
  constructor() {
    super()
    this.msgRef = React.createRef()
  }
  btnHandler(event) {
    event.preventDefault()
    let text = this.msgRef.current.value
    if (text === "") return
    this.props.handleAddItem(text)
    this.msgRef.current.value = ""
    document.getElementById("inputEnterBox").focus()
  }
  render() {
    return (
      <div>
        <form onSubmit={e => this.btnHandler(e)}>
          <input id="inputEnterBox" type="textbox" className="InputEntry" placeholder="Add item..." ref={this.msgRef} autoFocus/>
          <input type="submit" className="InputBtnEntry" value="Add"/>
        </form> {/*
        </input><input id="inputEnterBox" type="textbox" className="InputEntry" placeholder="Add item..." ref={this.msgRef} autoFocus/>
        <button type="button" className="InputBtnEntry" onClick={() => this.btnHandler()}>Add</button> */}
      </div>
    );
  }
}

export default ItemEnter;
