import React from 'react';

export default function TripHeader(props) {
    return (
        <div>
            <br />
            <div className="row" >
                <div className="col-sm">
                    <div className="card border-light box-shadow">
                        <div className="card-body d-flex flex-row justify-content-center">
                            <h4>{props.tripName}</h4>
                            <p className="mb-0 h5 text-dark">
                            { props.tripPublic &&
                                <span className="badge badge-pill badge-info btn-1" style={{ marginLeft: "10px" }}>Public</span> 
                            }
                            { !props.tripPublic &&
                                <span className="badge badge-pill badge-secondary" style={{ marginLeft: "10px" }}>Private</span>
                            }
                            </p>
                        </div>
                        {
                            props.listName && 
                            <div className="card-footer d-flex justify-content-center">
                                <h6>{props.listName}</h6>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
}
