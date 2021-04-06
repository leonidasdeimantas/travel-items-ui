import React, { useRef } from 'react';

export default function ItemEnter(props) {
    const msgRef = useRef(null)

    const handleButton = (event) => {
        event.preventDefault()
        let text = msgRef.current.value
        if (text === "") return
        props.handleAddItem(text)
        msgRef.current.value = ""
        document.getElementById("ItemEnterInputID").focus()
    }

    const handleCopyUrl = () => { copyToClipboard(window.location.href) }
    const handleCopyID = () => { copyToClipboard(props.tripUrl) }

    return (
        <div>
            <br />
            <blockquote className="blockquote text-center">
                <p className="mb-0 h5 text-dark">{props.tripName}<span className="text-info"></span>
                    <span className="dropdown" style={{ marginLeft: "10px"}}>
                        <button className="btn btn-outline-info btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="material-icons-outlined" style={{fontSize:"18px", marginRight:"4px"}}>share</span>
                            Share
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="# " onClick={() => handleCopyID()}>Copy ID <span className="material-icons-outlined" style={{fontSize:"18px", marginLeft:"4px"}}>content_copy</span></a>
                            <a className="dropdown-item" href="# " onClick={() => handleCopyUrl()}>Copy link <span className="material-icons-outlined" style={{fontSize:"18px", marginLeft:"4px"}}>content_copy</span></a>
                        </div>
                    </span>
                </p>
            </blockquote>
            <form className="input-group mb-3 C5procTop" onSubmit={e => handleButton(e)}>
                <input id="ItemEnterInputID" type="textbox" className="form-control border-white" placeholder={"Add " + props.item + "..."} ref={msgRef} />
                <div className="input-group-append">
                    <input type="submit" className="btn btn-outline-secondary" value="Add" />
                </div>
            </form>
        </div>
    );
}

function copyToClipboard(text) {
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
