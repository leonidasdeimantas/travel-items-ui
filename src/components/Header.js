import React from 'react';
import logo from '../apple.png'

class Header extends React.Component  {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark">
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            {/*
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                      <a className="nav-link" href="#">Link</a>
                  </li>
              </ul>
            */}
          </div>
          <div className="mx-auto order-0">
            <p className="HeaderLogoText">Ti</p>
          </div>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            {/*
              <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                      <a className="nav-link" href="#">Right</a>
                  </li>
              </ul>
            */}
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
