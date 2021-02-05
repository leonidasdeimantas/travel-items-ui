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

  handleCopyUrl() {
    this.copyToClipboard(window.location.href)
  }

  copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        return window.clipboardData.setData("Text", text);
    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
  }

  render() {
    return (
      <div>
        <br/>
        <blockquote className="blockquote text-center">
          <p className="mb-0 h5 text-dark">{this.props.tripName}<span className="text-info"></span></p>
          <footer className="font-weight-normal"><small>
            <a className="text-info" href="#" onClick={() => this.handleCopyUrl()}>
              Copy link
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{marginLeft: "5px", marginRight: "6px"}} className="bi bi-clipboard" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
              </svg>
            </a>
              and share it with your friends
          </small></footer>
        </blockquote>
        <form className="input-group mb-3 C5procTop" onSubmit={e => this.handleButton(e)}>
          <input id="ItemEnterInputID" type="textbox" className="form-control border-white" placeholder={"Add " + this.props.item + "..."} ref={this.msgRef}/>
          <div className="input-group-append">
            <input type="submit" className="btn btn-outline-secondary" value="Add"/>
          </div>
        </form>
      </div>
    );
  }
}

export default ItemEnter;
