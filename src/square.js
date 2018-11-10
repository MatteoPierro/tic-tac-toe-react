import React from 'react';
import './index.css';

export default class Square extends React.Component {
    render() {
        return (
            <button className="square"
                    onClick={() => this.props.onClick(this.props.position)}>
                {this.props.owner}
            </button>
        );
    }
}