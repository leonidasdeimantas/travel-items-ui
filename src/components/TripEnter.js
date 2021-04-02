import React from 'react';

class TripEnter extends React.Component {
    constructor() {
        super()
        this.msgRefName = React.createRef()
        this.msgRefLocation = React.createRef()
        this.msgRefUrl = React.createRef()
    }

    handleFormButton(event) {
        event.preventDefault()
        let name = this.msgRefName.current.value
        let location = this.msgRefLocation.current.value
        this.props.handleAddTrip(name, location)
    }

    openTripById(url) {
        window.location.href = `?tripUrl=${url}`
    }

    fillRecentList() {
        let recentsFound = false
        let list = []
        let iterator = 0

        this.props.recents[0].forEach(element => {
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


    render() {
        let recentsFound = false;
        let list = [];
        [ list, recentsFound ] = this.fillRecentList()

        return (
            <div className="container C5procTop">
                <div className="row">
                    <div className="col-sm">
                        <div className="card border-light box-shadow">
                            <div className="card-header border-white bg-white">
                                <h4>Add new trip</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={e => this.handleFormButton(e)}>
                                    <div className="form-group">
                                        <input className="form-control border-light bg-light" placeholder="Enter name" ref={this.msgRefName} required />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control border-light bg-light" placeholder="Enter location information" ref={this.msgRefLocation} />
                                    </div>
                                    <button type="submit" className="btn btn-info float-right">Create trip</button>
                                </form>
                            </div>
                        </div>
                        <br />
                        <div className="card border-light box-shadow">
                            <div className="card-header border-white bg-white">
                                <h4>Open existing trip</h4>
                            </div>
                            <div className="card-body">
                                <div className="input-group mb-3">
                                    <input className="form-control border-light bg-light" placeholder="Enter trip ID" ref={this.msgRefUrl} />
                                    <div className="input-group-append">
                                        <button type="button" className="btn btn-info" onClick={() => this.openTripById(this.msgRefUrl.current.value)}>Open by ID</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                    <div className="col-sm">
                        <div className="card border-light box-shadow">
                            <div className="card-header border-white bg-white">
                                <h4>Recents
                                    <span>
                                        <button type="button" className="btn btn-outline-secondary border-white btn-sm CItemButtonRight" onClick={() => this.props.handleClearRecents()}>
                                            <svg width="20px" height="20px" viewBox="0 0 16 17" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                            </svg>
                                        </button>
                                    </span>
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
                                        No recent trips
                  </p>
                                }
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class RecentItem extends React.Component {
    openTripById(url) {
        window.location.href = `?tripUrl=${url}`
    }

    render() {
        return (
            <a href="# " className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-dark" onClick={() => this.openTripById(this.props.url)}>
                {this.props.name}
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                        <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                </span>
            </a>
        );
    }
}

export default TripEnter;
