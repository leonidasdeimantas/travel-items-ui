import React, { useState, useEffect } from 'react';

export default function Item(props) {
    const [assignee, setAssingnee] = useState("");
    const [assigneeObj, setAssingneeObj] = useState("");
    const [price, setPrice] = useState("");

    const reloadProps = () => {
        setAssingnee(props.item.assignee)
        setPrice(props.item.price)
    }

    useEffect(() => {
        reloadProps();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    useEffect(() => {
        props.people.every(element => {
            if (element.id === assignee) {
                setAssingneeObj(element);
                return false
            }
            setAssingneeObj({ name: "", id: "" })
            return true
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [assignee]);

    const completedStyle = {
        color: "#cdcdcd",
        textDecoration: "line-through"
    }

    const assigneeList = props.people.map(item => <option key={item.id} value={item.id}>{item.name}</option>)

    return (
        <div className="media text-muted pt-3">
            <div className="mr-2 rounded">
                <button
                    type="button"
                    className={props.item.completed ? "btn btn-secondary btn-sm C5procTop" : "btn btn-outline-secondary btn-sm brd-1 C5procTop disabled"}
                    style={{ padding: "12px" }}
                    onClick={() => props.handleDone(props.item.id)}>
                </button>
            </div>
            <div className="media-body pb-3 mb-0 medium lh-125 border-bottom border-gray text-break" style={{ marginLeft: "1%" }}>
                <div style={props.item.completed ? completedStyle : null}> {props.item.text} </div>
                <div className="media-body" style={{ marginTop: "2%" }}>
                    <h5 className="CItemButtonLeft">
                        <span className={"badge " + (props.item.completed ? "badge-secondary" : "badge-info")} style={{ marginRight: "10px" }}>{assigneeObj.name}</span>
                        <span className={"badge " + (props.item.completed ? "badge-secondary" : "badge-info")} style={{ marginRight: "10px" }}>{props.item.price ? (props.item.price + "€") : ""}</span>
                    </h5>
                    <button type="button" className="btn btn-sm CItemButtonRight" onClick={() => props.handleRemoveItem(props.item.id)}>
                        <span className="material-icons-outlined text-danger">delete</span>
                    </button>
                    <button type="button" className="btn btn-sm CItemButtonRight" data-toggle="modal" data-target={"#editItemModal" + props.item.id}>
                        <span className="material-icons-outlined text-secondary">person_add</span>
                    </button>

                    <div className="modal fade" id={"editItemModal" + props.item.id} tabIndex="-1" aria-labelledby={"editItemModal" + props.item.id} aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editItemModalLabel">Edit item details</h5>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="assigneeInput">Assignee</label>
                                        {
                                            !assignee &&
                                            <select className="custom-select" id="assigneeInput" onChange={e => { setAssingnee(parseInt(e.target.value))}}>
                                                <option>Choose...</option>
                                                {assigneeList}
                                            </select>
                                        }
                                        {
                                            assignee &&
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" placeholder={assigneeObj.name} disabled/>
                                                <div className="input-group-append">
                                                    <button className="btn btn-secondary" type="button" onClick={() => setAssingnee()}>
                                                        <span className="material-icons-outlined text-light">person_remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="priceInput">Price</label>
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" id="priceInput" aria-describedby="priceHelp"
                                                value={price ? price : ""}
                                                onChange={e => setPrice(e.target.value)} />
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <span className="material-icons-outlined text-secondary">euro_symbol</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => reloadProps()}>Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => props.handleEdit(props.item.id, assignee, price)}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
