import React from 'react';
import Item from './Item'

class ItemList extends React.Component {
  render() {
    const list_remaining = this.props.items.map(item => !item.completed && <Item 
      key={item.id} 
      item={item}
      people={this.props.people}
      handleDone={this.props.handleDone}
      handleEdit={this.props.handleEdit}
      handleRemoveItem={this.props.handleRemoveItem}
    />)
    
    const list_completed = this.props.items.map(item => item.completed && <Item 
      key={item.id} 
      item={item}
      people={this.props.people}
      handleDone={this.props.handleDone}
      handleEdit={this.props.handleEdit}
      handleRemoveItem={this.props.handleRemoveItem}
    />)

    return (
        <div>
          {(!list_remaining.every(item => (item === false))) && 
            <div className="my-3 p-3 bg-white rounded box-shadow">
              <h6 className="border-bottom border-gray pb-2 mb-0">Remaining items</h6>
              {list_remaining}
            </div>
          }

          {(!list_completed.every(item => (item === false))) && 
            <div className="my-3 p-3 bg-white rounded box-shadow">
              <h6 className="border-bottom border-gray pb-2 mb-0">Completed items</h6>
              {list_completed}
            </div>
          }

        </div>
    );
  }
}

export default ItemList;
