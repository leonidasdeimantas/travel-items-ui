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
                <div className="mb-0 h5 text-dark">{props.tripName}<span className="text-info"></span>
                { props.tripPublic &&
                    <span className="badge badge-info" style={{ marginLeft: "10px" }} onClick={() => props.handleChangePublic()}>Public</span>
                }
                { !props.tripPublic &&
                    <span className="badge badge-secondary" style={{ marginLeft: "10px" }} onClick={() => props.handleChangePublic()}>Private</span>
                }
                </div>
            </blockquote>
            <form className="input-group mb-3 C5procTop" onSubmit={e => handleButton(e)}>
                <input id="ItemEnterInputID" type="textbox" className="form-control border-white" maxLength={props.item === "assignee" ? "20" : ""} placeholder={"Add " + props.item + "..."} ref={msgRef} />
                <div className="input-group-append">
                    <input type="submit" className="btn btn-outline-secondary" value="Add" />
                </div>
            </form>

            { props.tripPublic &&
                <div className="dropdown CShareBtn" style={{ marginTop: "10px"}}>
                    <button className="btn btn-secondary CRoundBtn brd-2 btn-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="material-icons-outlined ico-1">share</span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="# " onClick={() => handleCopyID()}>Copy ID <span className="material-icons-outlined" style={{fontSize:"18px", marginLeft:"4px"}}>content_copy</span></a>
                        <a className="dropdown-item" href="# " onClick={() => handleCopyUrl()}>Copy link <span className="material-icons-outlined" style={{fontSize:"18px", marginLeft:"4px"}}>content_copy</span></a>
                    </div>
                </div>
            }
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
