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
            <h2>Add new trip</h2>
            <br/>
            <form onSubmit={e => this.handleFormButton(e)}>
              <div className="form-group">
                <input className="form-control" placeholder="Enter name" ref={this.msgRefName} autoFocus required/>
              </div>
              <div className="form-group">
                <input className="form-control" placeholder="Enter location information" ref={this.msgRefLocation}/>
              </div>
              <button type="submit" className="btn btn-info float-right">Create trip</button>
            </form>
            <br/>
            <h2>Open existing trip</h2>
            <br/>
            <div className="input-group mb-3">
              <input className="form-control" placeholder="Enter trip ID" ref={this.msgRefUrl}/>
              <div className="input-group-append">
                <button type="button" className="btn btn-info" onClick={() => this.openTripById(this.msgRefUrl.current.value)}>Open by ID</button>
              </div>
            </div>
          </div>
          <div className="col-sm">
            <h2>Recents</h2>
            <br/>
            { 
              recentsFound && 
              <div>
                {list}
              </div>
            }
            { 
              !recentsFound && 
              <p>
                No recent trips
              </p>
            }
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
      <div>
        <div className="card" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">{this.props.name}</h5>
            <button type="button" className="btn btn-outline-info float-right" onClick={() => this.openTripById(this.props.url)}>Open</button>
          </div>
        </div>
        <br/>
      </div>
    );
  }
}

export default TripEnter;
