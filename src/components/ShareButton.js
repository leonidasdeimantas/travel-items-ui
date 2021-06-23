import React from 'react';
import { copyToClipboard } from '../utils/Utils'

export default function ShareButton(props) {
    const handleCopyUrl = () => { copyToClipboard(window.location.href) }
    const handleCopyID = () => { copyToClipboard(props.tripUrl) }

    return (
        props.tripPublic &&
            <div className="dropdown CShareBtn" style={{ marginTop: "10px"}}>
                <button className="btn btn-secondary CRoundBtn brd-2 btn-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="material-icons-outlined ico-1">share</span>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="# " onClick={() => handleCopyID()}>Copy ID <span className="material-icons-outlined" style={{fontSize:"18px", marginLeft:"4px"}}>content_copy</span></a>
                    <a className="dropdown-item" href="# " onClick={() => handleCopyUrl()}>Copy link <span className="material-icons-outlined" style={{fontSize:"18px", marginLeft:"4px"}}>content_copy</span></a>
                </div>
            </div>
    );
}
