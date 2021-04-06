import React from 'react';

function Spinner(props) {
    return (
        props.loading &&
        <div id="overlay">
            <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default Spinner;
