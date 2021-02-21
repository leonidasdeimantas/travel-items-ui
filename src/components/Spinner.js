import React from 'react';

class Spinner extends React.Component {
    render() {
        return (
            this.props.loading &&
            <div id="overlay">
                <div className="spinner-border text-info" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}


export default Spinner;
