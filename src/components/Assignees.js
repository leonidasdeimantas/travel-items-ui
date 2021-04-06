import React from 'react';

export default function Assignees(props) {
    const list = props.people.map(item => <AssigneeItem
        key={item.id}
        people={item}
        handleRemove={props.handleRemove}
    />)

    return (
        <div className="C5procTop d-flex flex-wrap">
            {list}
        </div>
    );
}

function AssigneeItem(props) {
    return (
        <div className="p-2">
            <button className="btn btn-info" onClick={() => props.handleRemove(props.people.id)}>{props.people.name}
                <span style={{ marginLeft: "10px" }} aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}
