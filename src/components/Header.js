import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md fixed-top navbar-dark" style={{ backgroundColor: "#151515" }}>
                    <a className="navbar-brand mx-auto order-0 CLogoText" href="# ">Travel items</a>
                </nav>
                {
                    (this.props.tripFound) &&
                    <div className="nav-scroller bg-white box-shadow">
                        <nav className="nav nav-underline">
                            <a className={"nav-link " + (this.props.page === "main" ? "active" : "")} href="# " onClick={() => this.props.handleChangePage("main")}>
                                Home
              </a>
                            <a className={"nav-link " + (this.props.page === "items" ? "active" : "")} href="# " onClick={() => this.props.handleChangePage("items")}>
                                Items
                <span className="badge badge-pill bg-light align-text-bottom">{this.props.itemCnt}</span>
                            </a>
                            <a className={"nav-link " + (this.props.page === "people" ? "active" : "")} href="# " onClick={() => this.props.handleChangePage("people")}>
                                People
                <span className="badge badge-pill bg-light align-text-bottom">{this.props.peopleCnt}</span>
                            </a>
                        </nav>
                    </div>
                }
            </div>
        );
    }
}

export default Header;
