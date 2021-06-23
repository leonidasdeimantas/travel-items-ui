import React from 'react';

export default function Header(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-md fixed-top navbar-dark" style={{ backgroundColor: "#151515" }}>
                <a className="navbar-brand mx-auto order-0 CLogoText" href="# ">Travel items</a>
            </nav>
            {
                (props.tripFound) &&
                <div className="nav-scroller bg-white box-shadow">
                    <nav className="nav nav-underline">
                        <a className={"nav-link " + (props.page === "main" ? "active" : "")} href="# " onClick={() => props.handleChangePage("main")}>
                            Main
                        </a>
                        <a className={"nav-link " + (props.page === "items" ? "active" : "")} href="# " onClick={() => props.handleChangePage("items")}>
                            Items
                            <span className="badge badge-pill bg-light align-text-bottom">{props.itemCnt}</span>
                        </a>
                        <a className={"nav-link " + (props.page === "people" ? "active" : "")} href="# " onClick={() => props.handleChangePage("people")}>
                            People
                            <span className="badge badge-pill bg-light align-text-bottom">{props.peopleCnt}</span>
                        </a>
                        {
                            (props.tripOwner) &&
                            <a className={"nav-link " + (props.page === "settings" ? "active" : "")} href="# " onClick={() => props.handleChangePage("settings")}>
                                Settings
                            </a>
                        }
                    </nav>
                </div>
            }
        </div>
    );
}