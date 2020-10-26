import React from 'react';

class Header extends React.Component  {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md fixed-top navbar-dark" style={{backgroundColor:"#151515"}}>
          <a className="navbar-brand mx-auto order-0 CLogoText" href="#">Ti</a>
        </nav>

        <div className="nav-scroller bg-white box-shadow">
          <nav className="nav nav-underline">
            <a className="nav-link active" href="#">
              Items
              <span className="badge badge-pill bg-light align-text-bottom">{this.props.item_cnt}</span>
            </a>
            <a className="nav-link" href="#">People</a>
            <a className="nav-link" href="#">Location</a>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
