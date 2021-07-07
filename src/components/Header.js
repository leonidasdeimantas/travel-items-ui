import React from 'react';

export default function Header(props) {

    const list_lists = props.lists.map(list => <ListItem
        key={list.id}
        list={list}
        selected={props.listSelected}
        handleChangePage={props.handleChangePage}
    />)

    return (
        <div>
            <nav className="navbar navbar-expand-md fixed-top navbar-dark" style={{ backgroundColor: "#151515" }}>
                <a className="navbar-brand mx-auto order-0 CLogoText" href="# ">Travel items</a>
            </nav>
            {
                (props.tripFound) &&
                <div className="nav bg-white box-shadow justify-content-center">
                    <nav className="nav nav-underline">
                        <a className={"nav-link " + (props.page === "main" ? "active" : "")} href="# " onClick={() => props.handleChangePage("main", -1)}>
                            Home
                        </a>
                        <a className={"nav-link " + (props.page === "trip" ? "active" : "")} href="# " onClick={() => props.handleChangePage("trip", -1)}>
                            Trip info
                        </a>
                        {list_lists}
                    </nav>
                </div>
            }
        </div>
    );
}

function ListItem(props) {
    return (
        <a className={"nav-link " + (props.selected === props.list.id ? "active" : "")} href="# " onClick={() => props.handleChangePage("items", props.list.id)}>
            {props.list.name}
            <span className="badge badge-pill bg-light align-text-bottom">{props.itemCnt}</span>
        </a>
    );
}