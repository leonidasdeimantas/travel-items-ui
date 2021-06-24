import React, { useRef }  from 'react';
import { copyToClipboard } from '../utils/Utils'
import ShareButton from './ShareButton';
import TripHeader from '../components/TripHeader';

export default function TripPage(props) {
    const msgRefLocation = useRef(null)

    const handleCopyUrl = () => { copyToClipboard(window.location.href) }
    const handleCopyID = () => { copyToClipboard(props.tripUrl) }

    const handleLocationButton = () => {
        let location = msgRefLocation.current.value
        props.handleChangeLocation(location)
    }


    return (
        <div style={{paddingBottom:"10%"}}>

            <TripHeader 
                tripName={props.tripName}
                tripPublic={props.tripPublic}
            />

            <div className="row C5procTop" >
                <div className="col-sm">
                    <div className="card border-light box-shadow">
                        <div className="card-header border-white bg-white">
                            <h4>Trip summary</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-8">
                                    Number of items
                                </div>
                                <div className="col-4 d-flex flex-row-reverse">
                                    <button className="btn btn-outline-secondary btn-sm float-right" onClick={() => props.handleChangePage("items")}>Add</button>
                                    <h5><span className="badge badge-info btn-1" style={{marginRight:"20px"}}>{props.items.length}</span></h5>
                                </div>
                            </div>
                            <hr className="my-2"></hr>
                            <div className="row">
                                <div className="col-8">
                                    Number of people
                                </div>
                                <div className="col-4 d-flex flex-row-reverse">
                                    <button className="btn btn-outline-secondary btn-sm float-right" onClick={() => props.handleChangePage("people")}>Add</button>
                                    <h5><span className="badge badge-info btn-1" style={{marginRight:"20px"}}>{props.peopleCnt}</span></h5>
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                    <br />
                    <div className="card border-light box-shadow">
                        <div className="card-header border-white bg-white">
                            <h4>Notes
                            <span>
                                <button type="button" className="btn btn-sm CItemButtonRight" data-toggle="modal" data-target="#NotesModal">
                                    <span className="material-icons-outlined">edit</span>
                                </button>
                            </span>
                            </h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                <li href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                        <p><span className="material-icons-outlined">close</span></p>
                                    </div>
                                    <div className="d-flex w-100 justify-content-between">
                                        <small className="font-weight-bold">Donec id elit non mi porta.</small>
                                        <small>3 days ago</small>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <br />
                    </div>
                    <br />
                </div>

                <div className="col-sm">

                    <div className="card border-light box-shadow">
                        <div className="card-header border-white bg-white">
                            <h4>Location
                            <span>
                                <button type="button" className="btn btn-sm CItemButtonRight" data-toggle="modal" data-target="#LocationModal">
                                    <span className="material-icons-outlined">edit</span>
                                </button>
                            </span>
                            </h4>
                        </div>
                        { (props.tripLoc && props.tripLoc !== "") && 
                            <div className="card-body d-flex justify-content-between align-items-center">
                                {props.tripLoc} 
                                <button className="btn btn-outline-secondary btn-sm float-right" onClick={() => window.open("https://www.google.com/maps/search/?api=1&query="+props.tripLoc.split(' ').join('+'), "_blank")}>
                                    Directions <span className="material-icons-outlined">near_me</span> 
                                </button>
                            </div>
                        }
                        { (!props.tripLoc || props.tripLoc === "") && 
                            <div className="card-body d-flex justify-content-between align-items-center">
                                No location provided
                            </div>
                        }
                        <br />
                    </div>
                    <br />

                    { props.tripOwner &&
                        <div className="card border-danger box-shadow">
                            <div className="card-header border-white bg-white">
                                <h4>Admin panel</h4>
                            </div>
                            <div className="card-body">
                                { props.tripPublic &&
                                    <div>
                                        <div className="row">
                                            <div className="col-6 txt-1">
                                                This trip is public <span className="material-icons-outlined txt-1">public</span>
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-outline-secondary btn-sm float-right" onClick={() => props.handleChangePublic()}>Make private</button>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-8">
                                                You can share this trip by sending ID or link to your friends
                                            </div>
                                            <div className="col-4">
                                                <div className="dropdown">
                                                    <button className="btn btn-outline-secondary btn-sm float-right txt-1 brd-1" type="button" id="1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Share
                                                    </button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                        <a className="dropdown-item" href="# " onClick={() => handleCopyID()}>Copy ID <span className="material-icons-outlined" style={{fontSize:"18px", marginLeft:"4px"}}>content_copy</span></a>
                                                        <a className="dropdown-item" href="# " onClick={() => handleCopyUrl()}>Copy link <span className="material-icons-outlined" style={{fontSize:"18px", marginLeft:"4px"}}>content_copy</span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                }
                                { !props.tripPublic &&
                                    <div className="row">
                                        <div className="col-6">
                                            This trip is private <span className="material-icons-outlined text-secondary">lock</span>
                                        </div>
                                        <div className="col-6">
                                            <button className="btn btn-outline-secondary btn-sm float-right" onClick={() => props.handleChangePublic()}>Make public</button>
                                        </div>
                                    </div>
                                }
                                <hr className="my-3"></hr>
                                
                                <div className="row">
                                    <div className="col-8">
                                        Delete trip
                                    </div>
                                    <div className="col-4">
                                    <button className="btn btn-outline-danger btn-sm float-right" onClick={() => props.handleDeleteTrip()}><span className="material-icons-outlined mr-1">delete_forever</span></button>
                                    </div>
                                </div>
                                <br />
                            </div>
                        </div>
                    }
                    <br />
                </div>

            </div>

            <ShareButton 
                tripUrl={props.tripUrl}
                tripPublic={props.tripPublic}
            />

            <div className="modal fade" id="LocationModal" tabIndex="-1" aria-labelledby="LocationModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="LocationModal">Change location</h5>
                        </div>
                        <div className="modal-body">

                                <div className="form-group">
                                    <input className="form-control border-light bg-light" placeholder="Location" ref={msgRefLocation} required />
                                </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-secondary float-right btn-1 brd-1" data-dismiss="modal" onClick={() => handleLocationButton()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
