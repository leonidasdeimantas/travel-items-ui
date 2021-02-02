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

  componentDidMount(){
    // document.addEventListener("keydown", this.handleKey, false)
  }

  componentWillUnmount(){
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
    if (assignee === undefined) assignee = {name: "", id: ""}
    const assigneeList = this.props.people.map(item => <option key={item.id} value={item.id}>{item.name}</option>)

    return (

      <div className="media text-muted pt-3">
        <div className="mr-2 rounded">
          <button 
            type="button" 
            className={this.props.item.completed ? "btn btn-info btn-sm C5procTop" : "btn btn-outline-info btn-sm C5procTop"} 
            style={{padding:"12px"}} 
            onClick={() => this.props.handleDone(this.props.item.id)}>            
          </button>
        </div>
        <div className="media-body pb-3 mb-0 medium lh-125 border-bottom border-gray text-break" style={{marginLeft:"1%"}}>
          <div style={this.props.item.completed ? completedStyle : null}> {this.props.item.text} </div>
          <div className="media-body" style={{marginTop:"2%"}}>
            <h5 className="CItemButtonLeft">
              <span className={"badge " + (this.props.item.completed ? "badge-secondary" : "badge-info")} style={{marginRight:"10px"}}>{assignee.name}</span>
              <span className={"badge " + (this.props.item.completed ? "badge-secondary" : "badge-info")} style={{marginRight:"10px"}}>{this.props.item.price ? (this.props.item.price + "€") : ""}</span>
            </h5>
            <button type="button" className="btn btn-outline-danger btn-sm CItemButtonRight" onClick={() => this.props.handleRemoveItem(this.props.item.id)}>
              <svg width="20px" height="20px" viewBox="0 0 16 17" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
              </svg>            
            </button>
            <button type="button" className="btn btn-outline-secondary btn-sm CItemButtonRight" data-toggle="modal" data-target={"#editItemModal" + this.props.item.id}
              onClick={() => this.handleEdit()}>
              <svg width="20px" height="20px" viewBox="0 0 16 17" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
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
                          onChange={e => this.handleTypingPrice(e.target.value)}/>
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
