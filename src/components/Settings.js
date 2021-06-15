import React from 'react';
import { copyToClipboard } from '../utils/Utils'

export default function Settings(props) {

    const handleCopyUrl = () => { copyToClipboard(window.location.href) }
    const handleCopyID = () => { copyToClipboard(props.tripUrl) }

    return (
        <div className="container C5procTop" style={{paddingBottom:"10%"}}>

            <div className="row" >
                <div className="col-sm">
                    <div className="card border-light box-shadow">
                        <div className="card-header border-white bg-white">
                            <h4>Sharing</h4>
                        </div>
                        <div className="card-body">
                            { props.tripPublic &&
                                <div>
                                    <div className="row">
                                        <div className="col-6">
                                            This trip is public
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
                                                <button className="btn btn-outline-info btn-sm float-right" type="button" id="1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                                        This trip is private
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-outline-secondary btn-sm float-right" onClick={() => props.handleChangePublic()}>Make public</button>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                    <br />
                </div>
                <div className="col-sm">
                    <div className="card border-light box-shadow">
                        <div className="card-header border-white bg-white">
                            <h4>General</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-8">
                                    Delete trip
                                </div>
                                <div className="col-4">
                                <button className="btn btn-outline-danger btn-sm float-right" onClick={() => props.handleDeleteTrip()}><span className="material-icons-outlined mr-1">delete_forever</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            </div>

        </div>
    );
}
