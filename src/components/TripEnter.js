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
                                    {
                                        recentsFound &&
                                        <span>
                                            <button type="button" className="btn btn-sm CItemButtonRight" onClick={() => this.props.handleClearRecents()}>
                                                <span className="material-icons-outlined text-info">clear</span>
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
                <span className="material-icons-outlined text-secondary" style={{fontSize:"18px"}}>open_in_new</span>
            </a>
        );
    }
}

export default TripEnter;
