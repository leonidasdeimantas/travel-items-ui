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
                    <input className="form-control border-light bg-light" placeholder="Enter name" ref={this.msgRefName} required/>
                  </div>
                  <div className="form-group">
                    <input className="form-control border-light bg-light" placeholder="Enter location information" ref={this.msgRefLocation}/>
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
                  <input className="form-control border-light bg-light" placeholder="Enter trip ID" ref={this.msgRefUrl}/>
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
                  <div style={{borderTop:"0 none"}}>
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
      <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-dark" onClick={() => this.openTripById(this.props.url)}>
        {this.props.name}
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
          </svg>
        </span>
      </a>
    );
  }
}

export default TripEnter;
