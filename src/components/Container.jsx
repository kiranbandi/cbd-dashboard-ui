import React, { Component } from 'react';
export default class Container extends Component {

    render() {

        return (
            <div id='app-container'>
                    : <div id='container-body'>
                        {this.props.children}
                    </div>
            </div>
        );
    }
}

