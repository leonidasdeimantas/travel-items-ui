import React from 'react';
import Item from './Item'

class ItemList extends React.Component {
  render() {
    const list = this.props.items.map(item => <Item 
      key={item.id} 
      item={item}
      handleDone={this.props.handleDone}
      handleEdit={this.props.handleEdit}
      handleRemoveItem={this.props.handleRemoveItem}
    />)

    return (
        <div className="my-3 p-3 bg-white rounded box-shadow">
          {list}
        </div>
    );
  }
}

export default ItemList;
