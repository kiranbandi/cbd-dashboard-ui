import React, { Component } from 'react';
import { NavBar } from './';

export default class Container extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='app-container'>
                {/* navbar content , common for entire application */}
                <NavBar />
                <div id='container-body'>
                    {this.props.children}
                </div>
                <footer className="footer w-full m-t hidden-xs">
                    <div className="container-fluid">
                        <div className='w-md footer-inner'>
                            <span className="left text-xs-left">
                                <a className="footer-link" href="mailto:venkat.bandi@usask.ca?subject=EM CBD Dashboard&amp;body=Please%20Fill%20">Contact Us</a>
                            </span>
                        </div>
                        <div className='w-md footer-inner text-xs-right'>
                            <a className="footer-link right" href="http://vga.usask.ca/"> VGA Lab University of Saskatchewan</a>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}  