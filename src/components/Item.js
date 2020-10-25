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

  handleFormSave(event, id) {
    event.preventDefault()
    this.props.handleEdit(id, this.state.assignee, this.state.price)
  }

  handleEdit() {
    this.setState({ assignee: this.props.item.assignee, price: this.props.item.price })
  }

  handleKey(event) {
    /* handle key press here sometime xD */
  }

  componentDidMount(){
    //document.addEventListener("keydown", this.handleKey, false)
  }

  componentWillUnmount(){
    //document.removeEventListener("keydown", this.handleKey, false)
  }

  componentDidUpdate() {

  }

  render() {
    const completedStyle = {
      color: "#cdcdcd",
      textDecoration: "line-through"
    }

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
          <div className="media-body" style={{marginTop:"1%"}}>
            <button type="button" className="btn btn-outline-danger btn-sm CItemButtonRight" onClick={() => this.props.handleRemoveItem(this.props.item.id)}>Delete</button>
            <button type="button" className="btn btn-outline-secondary btn-sm CItemButtonRight" data-toggle="modal" data-target="#editItemModal"
              onClick={() => this.handleEdit()}>
              Edit
            </button>

            <div className="modal fade" id="editItemModal" tabIndex="-1" aria-labelledby="editItemModal" aria-hidden="true">
              <div className="modal-dialog">
                <form className="modal-content" onSubmit={e => this.handleFormSave(e, this.props.item.id)}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="editItemModalLabel">Edit item details</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="assigneeInput">Assignee</label>
                      <input type="textbox" className="form-control" id="assigneeInput" aria-describedby="assigneeHelp"
                        value={this.state.assignee}
                        onChange={e => this.handleTypingAssignee(e.target.value)}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="priceInput">Price</label>
                      <input type="textbox" className="form-control" id="priceInput" aria-describedby="priceHelp"
                        value={this.state.price}
                        onChange={e => this.handleTypingPrice(e.target.value)}/>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" data-dismiss="modal">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Item;
