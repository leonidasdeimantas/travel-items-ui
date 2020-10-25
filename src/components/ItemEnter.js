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
        <form className="input-group mb-3 C5procTop" onSubmit={e => this.handleButton(e)}>
          <input id="ItemEnterInputID" type="textbox" className="form-control" placeholder="Add item..." ref={this.msgRef} autoFocus/>
          <div className="input-group-append">
            <input type="submit" className="btn btn-outline-secondary" value="Add"/>
          </div>
        </form>
      </div>
    );
  }
}

export default ItemEnter;
