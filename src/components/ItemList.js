import React from 'react';
import Item from './Item'

class ItemList extends React.Component {
  render() {
    const list = this.props.items.map(item => <Item 
      key={item.id} 
      item={item}
      clicked_assignee={this.props.clicked_assignee} 
      clicked_price={this.props.clicked_price} 
      handleClick={this.props.handleClick} 
      handleDone={this.props.handleDone}
      handleAsignee={this.props.handleAsignee}
      handlePrice={this.props.handlePrice}
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
