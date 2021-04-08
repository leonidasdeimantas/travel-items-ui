import React from 'react';

export default function Spinner(props) {
    return (
        props.loading &&
        <div id="overlay">
            <div className="spinner-border txt-1" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
