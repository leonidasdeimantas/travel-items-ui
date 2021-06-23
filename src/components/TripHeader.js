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
                                <span className="badge badge-pill badge-info" style={{ marginLeft: "10px" }}>Public</span>
                            }
                            { !props.tripPublic &&
                                <span className="badge badge-pill badge-secondary" style={{ marginLeft: "10px" }}>Private</span>
                            }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
