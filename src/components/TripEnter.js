import React from 'react';

class TripEnter extends React.Component  {
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
    this.props.handleNewTrip(name, location)
  }

  openTripById(){
    window.location.href=`?tripUrl=${this.msgRefUrl.current.value}`
  }

  render() {
    return (
      <div className="container C5procTop">
        <div className="row">
          <div className="col-sm">
            <h2>Add new trip</h2>
            <br/>
            <form onSubmit={e => this.handleFormButton(e)}>
              <div className="form-group">
                <input className="form-control" placeholder="Enter name" ref={this.msgRefName} autoFocus/>
              </div>
              <div className="form-group">
                <input className="form-control" placeholder="Enter location information" ref={this.msgRefLocation}/>
              </div>
              <button type="submit" className="btn btn-info">Create trip</button>
            </form>
            <br/>
          </div>
          <div className="col-sm">
            <h2>Open existing trip</h2>
            <br/>
            <div className="input-group mb-3">
              <input className="form-control" placeholder="Enter trip ID" ref={this.msgRefUrl}/>
              <div className="input-group-append">
                <button type="button" className="btn btn-info" onClick={() => this.openTripById()}>Open by ID</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TripEnter;
