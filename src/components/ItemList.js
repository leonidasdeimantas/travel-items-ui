import React from 'react';
import Item from './Item'

class ItemList extends React.Component {
  render() {
    const list = this.props.items.map(item => <Item 
      key={item.id} 
      item={item} 
      hovered={this.props.hovered} 
      handleHover={this.props.handleHover} 
      clicked={this.props.clicked} 
      handleClick={this.props.handleClick} 
      handleDone={this.props.handleDone}
      handleAsignee={this.props.handleAsignee}
    />)

    return (
      <div className="ItemListContainer">
        {list}
      </div>
    );
  }
}

export default ItemList;
