import React from 'react';

class Item extends React.Component {
    constructor() {
        super()
        this.state = {
            assignee: "",
            price: ""
        }
        this.handleEdit = this.handleEdit.bind(this)
        this.handleTypingAssignee = this.handleTypingAssignee.bind(this)
        this.handleTypingPrice = this.handleTypingPrice.bind(this)
    }

    handleTypingAssignee(value) {
        this.setState({ assignee: value })
    }

    handleTypingPrice(value) {
        this.setState({ price: value })
    }

    handleFormSave(id) {
        this.props.handleEdit(id, this.state.assignee, this.state.price)
    }

    handleEdit() {
        this.setState({ assignee: this.props.item.assignee, price: this.props.item.price })
    }

    handleKey(event) {
        // handle key press here sometime xD
    }

    componentDidMount() {
        // document.addEventListener("keydown", this.handleKey, false)
    }

    componentWillUnmount() {
        // document.removeEventListener("keydown", this.handleKey, false)
    }

    componentDidUpdate() {

    }

    render() {
        const completedStyle = {
            color: "#cdcdcd",
            textDecoration: "line-through"
        }

        let assignee = this.props.people.find(people => people.id === this.props.item.assignee)
        if (assignee === undefined) assignee = { name: "", id: "" }
        const assigneeList = this.props.people.map(item => <option key={item.id} value={item.id}>{item.name}</option>)

        return (

            <div className="media text-muted pt-3">
                <div className="mr-2 rounded">
                    <button
                        type="button"
                        className={this.props.item.completed ? "btn btn-secondary btn-sm C5procTop" : "btn btn-outline-info btn-sm C5procTop disabled"}
                        style={{ padding: "12px" }}
                        onClick={() => this.props.handleDone(this.props.item.id)}>
                    </button>
                </div>
                <div className="media-body pb-3 mb-0 medium lh-125 border-bottom border-gray text-break" style={{ marginLeft: "1%" }}>
                    <div style={this.props.item.completed ? completedStyle : null}> {this.props.item.text} </div>
                    <div className="media-body" style={{ marginTop: "2%" }}>
                        <h5 className="CItemButtonLeft">
                            <span className={"badge " + (this.props.item.completed ? "badge-secondary" : "badge-info")} style={{ marginRight: "10px" }}>{assignee.name}</span>
                            <span className={"badge " + (this.props.item.completed ? "badge-secondary" : "badge-info")} style={{ marginRight: "10px" }}>{this.props.item.price ? (this.props.item.price + "€") : ""}</span>
                        </h5>
                        <button type="button" className="btn btn-sm CItemButtonRight" onClick={() => this.props.handleRemoveItem(this.props.item.id)}>
                            <span className="material-icons-outlined text-danger">delete</span>
                        </button>
                        <button type="button" className="btn btn-sm CItemButtonRight" data-toggle="modal" data-target={"#editItemModal" + this.props.item.id} onClick={() => this.handleEdit()}>
                            <span class="material-icons-outlined text-secondary">person_add</span>
                        </button>

                        <div className="modal fade" id={"editItemModal" + this.props.item.id} tabIndex="-1" aria-labelledby={"editItemModal" + this.props.item.id} aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="editItemModalLabel">Edit item details</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label htmlFor="assigneeInput">Assignee</label>
                                            <select className="custom-select" id="assigneeInput" onChange={e => this.handleTypingAssignee(e.target.value)}>
                                                <option selected>Choose...</option>
                                                {assigneeList}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="priceInput">Price</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">€</span>
                                                </div>
                                                <input type="number" className="form-control" id="priceInput" aria-describedby="priceHelp"
                                                    value={this.state.price}
                                                    onChange={e => this.handleTypingPrice(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.handleFormSave(this.props.item.id)}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default Item;
