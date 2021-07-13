import React from 'react';

export default function Header(props) {
    const list_lists = props.lists.map(list => <ListItem
        key={list.id}
        list={list}
        selected={props.listSelected}
        itemCnt={props.items.filter(item => item.list === list.id).length}
        handleChangePage={props.handleChangePage}
    />)

    const list_lists_edit = props.lists.map(list => <ListItemEdit
        key={list.id}
        list={list}
        handleRemoveList={props.handleRemoveList}
    />)

    const handleBackButton = () => {
        if (props.page === "items") {
            props.handleChangePage("trip", -1)
        } else {
            props.handleChangePage("main", -1)
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark testfooter" style={{ backgroundColor: "#151515" }}>
                <a className="navbar-brand CLogoText" href="# ">Travel items</a>

                {
                    (props.tripFound && props.page !== "main") &&
                    <button className="navbar-toggler" type="button" onClick={() => handleBackButton()} aria-expanded="false" aria-label="Toggle navigation">
                        <span className="material-icons-outlined" style={{paddingRight: "5px"}}>arrow_back</span> 
                    </button>
                }         

                {
                    (props.tripFound) &&
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">

                            <li className="nav-item">
                                <a className={"nav-link " + (props.page === "main" ? "active" : "")} href="# " onClick={() => props.handleChangePage("main", -1)}>
                                    Home
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className={"nav-link " + (props.page === "trip" ? "active" : "")} href="# " onClick={() => props.handleChangePage("trip", -1)}>
                                    Trip info
                                </a>
                            </li>

                            <li className="nav-item dropdown ">
                                <a className="nav-link dropdown-toggle" href="# " id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Lists</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {list_lists}
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="# " data-toggle="modal" data-target="#SummaryModal">Edit lists</a>
                                </div>
                            </li>

                        </ul>
                    </div>
                }

            </nav>

            <div className="modal fade" id="SummaryModal" tabIndex="-1" aria-labelledby="SummaryModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="SummaryModal">Edit lists</h5>
                        </div>
                        <div className="modal-body">
                            {list_lists_edit}
                            {list_lists_edit.length === 0 &&
                                <p className="text-center font-italic text-muted">No lists <span className="material-icons-outlined text-muted">search_off</span></p>
                            }
                            <br />
                            <button type="button" className="btn btn-secondary float-right" data-dismiss="modal">Close</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

function ListItem(props) {
    return (
        <a className={"dropdown-item " + (props.selected === props.list.id ? "active" : "")} href="# " onClick={() => props.handleChangePage("items", props.list.id)}>
            {props.list.name} <span className="badge badge-pill bg-secondary align-text-bottom">{props.itemCnt}</span>
        </a>
    );
}

function ListItemEdit(props) {
    return (
        <div>
            <div className="row">
                <div className="col-8">
                    {props.list.name}
                </div>
                <div className="col-4 d-flex flex-row-reverse">
                    <button className="btn btn-outline-danger btn-sm float-right" onClick={() => props.handleRemoveList(props.list.id)}><span className="material-icons-outlined mr-1">delete_forever</span></button>
                </div>
            </div>
            <hr className="my-2"></hr>
        </div>
    );
}