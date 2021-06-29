import React, { useRef } from 'react';

export default function MainPage(props) {
    const msgRefName = useRef(null)
    const msgRefLocation = useRef(null)
    const msgRefUrl = useRef(null)
    const msgRefUser = useRef(null)
    const msgRefPass = useRef(null)
    const msgRefUserReg = useRef(null)
    const msgRefEmail = useRef(null)
    const msgRefPassReg = useRef(null)
    let recentsFound = false;
    let list = [];
    let yourTripsFound = false;
    let yourTripslist = [];
    [ list, recentsFound ] = fillRecentList(props.recents[0])

    if (props.currentUser && props.currentUserTrips && props.currentUserTrips.length > 0) {
        [ yourTripslist, yourTripsFound ] = fillRecentList(props.currentUserTrips)
    }

    const handleFormButton = (event) => {
        event.preventDefault()
        let name = msgRefName.current.value
        let location = msgRefLocation.current.value
        props.handleAddTrip(name, location)
    }

    const handleLoginButton = (event) => {
        event.preventDefault()
        let username = msgRefUser.current.value
        let password = msgRefPass.current.value
        props.handleLogin(username, password)
    }

    const handleRegisterButton = (event) => {
        event.preventDefault()
        let username = msgRefUserReg.current.value
        let email = msgRefEmail.current.value
        let password = msgRefPassReg.current.value
        props.handleRegister(username, email, password)
    }

    const openTripById = (url) => { 
        window.location.href = `?tripUrl=${url}` 
    }

    const clearRegForm = () => {
        msgRefUserReg.current.value = ""
        msgRefEmail.current.value = ""
        msgRefPassReg.current.value = ""
        props.handleRegStatusClear()
    }

    return (
        <div className="C5procTop"  style={{paddingBottom:"10%"}}>
            { getWarningMessage(props.warning) &&
                <div className="alert alert-danger" role="alert">
                    {getWarningMessage(props.warning)}
                </div>
            }

            <div className="row">
                <div className="col-sm">
                    { props.currentUser &&
                        <div>
                            <div className="card border-light box-shadow">
                                <div className="card-header border-white bg-white">
                                    <h4>Logged in as <span className="txt-1">{props.currentUser.username}</span>
                                    <span>
                                        <button type="button" className="btn btn-sm CItemButtonRight" onClick={() => props.handleLogout()}>
                                            <span className="material-icons-outlined">logout</span>
                                        </button>
                                    </span>
                                    </h4>
                                </div>
                            </div>
                            <br />
                            <div className="card border-light box-shadow">
                                <div className="card-header border-white bg-white">
                                    <h4>Create new trip</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={e => handleFormButton(e)}>
                                        <div className="form-group">
                                            <input className="form-control border-light bg-light" placeholder="Enter name" ref={msgRefName} required />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control border-light bg-light" placeholder="Enter location information" ref={msgRefLocation} />
                                        </div>
                                        <button type="submit" className="btn btn-secondary float-right btn-1 brd-1">Create trip</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                    { !props.currentUser &&
                        <div className="card border-light box-shadow">
                            <div className="card-header border-white bg-white">
                                <h4>Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={e => handleLoginButton(e)}>
                                    <div className="form-group">
                                        <input className="form-control border-light bg-light" placeholder="Username" ref={msgRefUser} required />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control border-light bg-light" type="password" placeholder="Password" ref={msgRefPass} required />
                                    </div>
                                    <button type="submit" className="btn btn-secondary float-right btn-1 brd-1">Login</button>
                                </form>
                                <button className="btn btn-outline-secondary float-right reg-button" data-toggle="modal" data-target="#signUpModal">Sign up</button>
                            </div>
                        </div>
                    }
                    <br />
                    <div className="card border-light box-shadow">
                        <div className="card-header border-white bg-white">
                            <h4>Open public trip by ID</h4>
                        </div>
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <input className="form-control border-light bg-light" placeholder="Enter trip ID" ref={msgRefUrl} />
                                <div className="input-group-append">
                                    <button type="button" className="btn btn-secondary btn-1 brd-1" onClick={() => openTripById(msgRefUrl.current.value)}>Open by ID</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
                <div className="col-sm">
                    { props.currentUser &&
                        <div>
                            <div className="card border-light box-shadow">
                                <div className="card-header border-white bg-white">
                                    <h4>Your trips</h4>
                                </div>
                                <div className="card-body">
                                    {
                                        yourTripsFound &&
                                        <div style={{ borderTop: "0 none" }}>
                                            <ul className="list-group list-group-flush">
                                                {yourTripslist}
                                            </ul>
                                        </div>
                                    }
                                    {
                                        !yourTripsFound &&
                                        <p>
                                            No trips
                                        </p>
                                    }
                                    <br />
                                </div>
                            </div>
                            <br />
                        </div>
                    }
                    <div className="card border-light box-shadow">
                        <div className="card-header border-white bg-white">
                            <h4>Recently opened
                                {
                                    recentsFound &&
                                    <span>
                                        <button type="button" className="btn btn-sm CItemButtonRight" onClick={() => props.handleClearRecents()}>
                                            <span className="material-icons-outlined txt-1">clear</span>
                                        </button>
                                    </span>
                                }
                            </h4>
                        </div>
                        <div className="card-body">
                            {
                                recentsFound &&
                                <div style={{ borderTop: "0 none" }}>
                                    <ul className="list-group list-group-flush">
                                        {list}
                                    </ul>
                                </div>
                            }
                            {
                                !recentsFound &&
                                <p>
                                    No trips
                                </p>
                            }
                            <br />
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="signUpModal" tabIndex="-1" aria-labelledby="signUpModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="signUpModal">Sign up form</h5>
                        </div>
                        <form onSubmit={e => handleRegisterButton(e)}>
                            <div className="modal-body">

                                <div>
                                    <div className="form-group">
                                        <input className="form-control border-light bg-light" placeholder="Username" ref={msgRefUserReg} required />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control border-light bg-light" type="email" placeholder="Email" ref={msgRefEmail} required />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control border-light bg-light" type="password" placeholder="Password" ref={msgRefPassReg} required />
                                    </div>
                                </div>

                                { props.regStatus !== "User registered successfully!" &&
                                    <div>
                                    { props.regStatus !== "" &&
                                        <div className="alert alert-danger" role="alert">
                                            {props.regStatus}
                                        </div>
                                    }
                                    </div>
                                }

                                { props.regStatus === "User registered successfully!" &&
                                    <div className="alert alert-success" role="alert">
                                        {props.regStatus} Now you can log in.
                                    </div>
                                }

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => clearRegForm()}>Close</button>
                                { props.regStatus !== "User registered successfully!" &&
                                    <button type="submit" className="btn btn-secondary float-right btn-1 brd-1">Sign Up</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

function RecentItem(props) {
    const openTripById = (url) => {
        window.location.href = `?tripUrl=${url}`
    }

    return (
        <a href="# " className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-dark" onClick={() => openTripById(props.url)}>
            {props.name}
            <span className="material-icons-outlined text-secondary" style={{fontSize:"18px"}}>open_in_new</span>
        </a>
    );
}

function fillRecentList(props) {
    let recentsFound = false
    let list = []
    let iterator = 0

    props.forEach(element => {
        if (element) {
            recentsFound = true
            list.push(<RecentItem
                key={iterator++}
                url={element.url}
                name={element.name}
            />)
        }
    })

    return [ list, recentsFound ] 
}

function getWarningMessage(warning) {
    if (warning === "login") {
        return "Can't login, please check username and password"
    } else if (warning === "trip") {
        return "Can't find requested trip, please check trip ID or make it public"
    } else if (warning === "acc") {
        return "Unauthorized, please login"
    }
    return null
}
