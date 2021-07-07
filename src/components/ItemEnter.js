import React, { useRef } from 'react';
import ShareButton from '../components/ShareButton';
import TripHeader from '../components/TripHeader';

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

    return (
        <div>
            
            { !props.hideLabel && 
                <TripHeader 
                    tripName={props.tripName}
                    tripPublic={props.tripPublic}
                />
            }

            <form className={"input-group mb-3" + (props.hideLabel ? "" : " C5procTop")} onSubmit={e => handleButton(e)}>
                <input id="ItemEnterInputID" type="textbox" className="form-control border-white" maxLength={props.item === "assignee" ? "20" : ""} placeholder={"Add " + props.item + "..."} ref={msgRef} />
                <div className="input-group-append">
                    <input type="submit" className="btn btn-outline-secondary" value="Add" />
                </div>
            </form>

            <ShareButton 
                tripUrl={props.tripUrl}
                tripPublic={props.tripPublic}
            />
        </div>
    );
}
