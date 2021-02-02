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
        <br/>
        <blockquote className="blockquote text-center">
          <p className="mb-0">Your trip ID: <span className="text-info">{this.props.tripUrl}</span></p>
          <footer className="blockquote-footer">Share it with your friends</footer>
        </blockquote>
        <form className="input-group mb-3 C5procTop" onSubmit={e => this.handleButton(e)}>
          <input id="ItemEnterInputID" type="textbox" className="form-control" placeholder={"Add " + this.props.item + "..."} ref={this.msgRef} autoFocus/>
          <div className="input-group-append">
            <input type="submit" className="btn btn-outline-secondary" value="Add"/>
          </div>
        </form>
      </div>
    );
  }
}

export default ItemEnter;
