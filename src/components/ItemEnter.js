import React from 'react';

class ItemEnter extends React.Component  {
  constructor() {
    super()
    this.msgRef = React.createRef()
  }
  btnHandler() {
    let text = this.msgRef.current.value
    if (text === "") return
    this.props.handleAddItem(text)
    this.msgRef.current.value = ""
  }
  render() {
    return (
      <div>
        <input type="textbox" className="InputEntry" placeholder="Add item..." ref={this.msgRef} />
        <button type="button" className="InputBtnEntry" onClick={() => this.btnHandler()}>Add</button>
      </div>
    );
  }
}

export default ItemEnter;
