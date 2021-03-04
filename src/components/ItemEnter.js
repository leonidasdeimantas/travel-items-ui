import React from 'react';

class ItemEnter extends React.Component {
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

    handleCopyID() {
        this.copyToClipboard(this.props.tripUrl)
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
                <br />
                <blockquote className="blockquote text-center">
                    <p className="mb-0 h5 text-dark">{this.props.tripName}<span className="text-info"></span>
                        <span className="dropdown" style={{ marginLeft: "10px"}}>
                            <button className="btn btn-outline-info btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "5px" }}  width="14" height="14" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                                </svg>
                                Share
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#" onClick={() => this.handleCopyID()}>Copy ID</a>
                                <a className="dropdown-item" href="#" onClick={() => this.handleCopyUrl()}>Copy link</a>
                            </div>
                        </span>
                    </p>
                </blockquote>
                <form className="input-group mb-3 C5procTop" onSubmit={e => this.handleButton(e)}>
                    <input id="ItemEnterInputID" type="textbox" className="form-control border-white" placeholder={"Add " + this.props.item + "..."} ref={this.msgRef} />
                    <div className="input-group-append">
                        <input type="submit" className="btn btn-outline-secondary" value="Add" />
                    </div>
                </form>
            </div>
        );
    }
}

export default ItemEnter;
