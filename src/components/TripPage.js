import React from 'react';
import { copyToClipboard } from '../utils/Utils'
import ShareButton from './ShareButton';
import TripHeader from '../components/TripHeader';

export default function TripPage(props) {

    const handleCopyUrl = () => { copyToClipboard(window.location.href) }
    const handleCopyID = () => { copyToClipboard(props.tripUrl) }


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
                                    <h5><span class="badge badge-info btn-1" style={{marginRight:"20px"}}>{props.items.length}</span></h5>
                                </div>
                            </div>
                            <hr class="my-2"></hr>
                            <div className="row">
                                <div className="col-8">
                                    Number of people
                                </div>
                                <div className="col-4 d-flex flex-row-reverse">
                                    <button className="btn btn-outline-secondary btn-sm float-right" onClick={() => props.handleChangePage("people")}>Add</button>
                                    <h5><span class="badge badge-info btn-1" style={{marginRight:"20px"}}>{props.items.length}</span></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>

                <div className="col-sm">

                    <div className="card border-light box-shadow">
                        <div className="card-header border-white bg-white">
                            <h4>Location</h4>
                        </div>
                        <div className="card-body">
                            No location added
                        </div>
                    </div>
                    <br />
                    <div className="card border-light box-shadow">
                        <div className="card-header border-white bg-white">
                            <h4>Notes</h4>
                        </div>
                        <div className="card-body">
                            No notes
                        </div>
                    </div>
                    <br />

                    { props.tripOwner &&
                        <div className="card border-light box-shadow">
                            <div className="card-header border-white bg-white">
                                <h4>Admin panel</h4>
                            </div>
                            <div className="card-body">
                                <hr class="my-3"></hr>
                                { props.tripPublic &&
                                    <div>
                                        <div className="row">
                                            <div className="col-6">
                                                This trip is public <span class="material-icons-outlined txt-1">public</span>
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
                                            This trip is private <span class="material-icons-outlined text-secondary">lock</span>
                                        </div>
                                        <div className="col-6">
                                            <button className="btn btn-outline-secondary btn-sm float-right" onClick={() => props.handleChangePublic()}>Make public</button>
                                        </div>
                                    </div>
                                }
                                <hr class="my-3"></hr>
                                
                                <div className="row">
                                    <div className="col-8">
                                        Delete trip
                                    </div>
                                    <div className="col-4">
                                    <button className="btn btn-outline-danger btn-sm float-right" onClick={() => props.handleDeleteTrip()}><span className="material-icons-outlined mr-1">delete_forever</span></button>
                                    </div>
                                </div>
                                
                                <hr class="my-3"></hr>
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
        </div>
    );
}
