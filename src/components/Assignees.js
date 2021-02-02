import React from 'react';

class Assignees extends React.Component {
  render() {
    const list = this.props.people.map(item => <AssigneeItem 
      key={item.id} 
      people={item}
      handleRemove={this.props.handleRemove}
    />)

    return (
      <div className="C5procTop d-flex flex-wrap">
        {list}
      </div>
    );
  }
}

class AssigneeItem extends React.Component {
  render() {
    return (
      <div className="p-2">
        <button className="btn btn-info" onClick={() => this.props.handleRemove(this.props.people.id)}>{this.props.people.name}
          <span style={{marginLeft: "10px"}} aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default Assignees;
