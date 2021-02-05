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

  openTripById(url){
    window.location.href=`?tripUrl=${url}`
  }

  fillRecentList() {
    let list = []

    for (let i = 1; i <= this.props.recentsCnt; i++) {
      let tripStr = "trip" + i
      if (this.props.recents["0"][tripStr] != undefined) {
        list.push(<RecentItem 
          key={i} 
          url={this.props.recents["0"][tripStr].tripUrl}
          name={this.props.recents["0"][tripStr].name}
          location={this.props.recents["0"][tripStr].location}
        />)
      }
    }

    return list
  }


  render() {
    let recentsFound = (this.props.recents["0"].trip1 != undefined);
    let list = this.fillRecentList();

    console.log(list)

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
                    <input className="form-control" placeholder="Enter name" ref={this.msgRefName} autoFocus required/>
                  </div>
                  <div className="form-group">
                    <input className="form-control" placeholder="Enter location information" ref={this.msgRefLocation}/>
                  </div>
                  <button type="submit" className="btn btn-info float-right">Create trip</button>
                </form>
              </div>
            </div>
            <br/>
            <div className="card border-light box-shadow">
              <div className="card-header border-white bg-white">
                <h4>Open existing trip</h4>
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <input className="form-control" placeholder="Enter trip ID" ref={this.msgRefUrl}/>
                  <div className="input-group-append">
                    <button type="button" className="btn btn-info" onClick={() => this.openTripById(this.msgRefUrl.current.value)}>Open by ID</button>
                  </div>
                </div>
              </div>
            </div>
            <br/>
          </div>
          <div className="col-sm">
            <div className="card border-light box-shadow">
              <div className="card-header border-white bg-white">
                <h4>Recents</h4>
              </div>
              <div className="card-body">
                { 
                  recentsFound && 
                  <ul className="list-group border-light">
                    {list}
                  </ul>
                }
                { 
                  !recentsFound && 
                  <p>
                    No recent trips
                  </p>
                }
                <br/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class RecentItem extends React.Component {
  openTripById(url){
    window.location.href=`?tripUrl=${url}`
  }

  render() {
    return (
      <a href="#" className="list-group-item d-flex justify-content-between align-items-center text-dark" onClick={() => this.openTripById(this.props.url)}>
        {this.props.name}
        <span class="badge badge-info badge-pill">Reopen</span>
      </a>
    );
  }
}

export default TripEnter;
