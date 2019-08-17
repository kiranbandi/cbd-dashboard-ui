/*global $*/
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLogoutData } from '../redux/actions/actions';

//  Image url handling is convoluted in scss , much easier to set inline and get images from root
let logoIconStyle = { background: 'url(assets/img/pawslogo.png)', backgroundSize: '100%' };

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
            program: 'EM'
        };
        this.onSelectProgram = this.onSelectProgram.bind(this);
    }

    componentDidMount() {
        //fix for mobile browsers , navbar doesnt automatically collapse and needs to be toggled manually
        $('.navbar-collapse').on('click', function (e) {
            var toggle = $(".navbar-toggle").is(":visible");
            if ($(e.target).is('a') && toggle) {
                $(this).collapse('hide');
            }
        });

    }

    logOut(event) {
        event.preventDefault();
        this.props.setLogoutData();
    }

    onSelectProgram() {
        const program = event.target.value;
        this.setState({ program });
    }

    render() {
        const { program } = this.state, { accessType = '' } = this.props.userDetails,
            loginRedirectURL = 'https://cas.usask.ca/cas/login?service=' + encodeURIComponent((process.env.NODE_ENV == 'development') ? 'https://localhost:8888/' : 'https://cbd.usask.ca/');

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link data-toggle="collapse" data-target="#navbar" className="navbar-brand navbar-brand-emphasized" to='/'>
                            <span className="icon icon-home navbar-brand-icon"></span> Home
                            </Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse ">

                        <ul className='nav navbar-nav'>
                            <li>
                                <Link to={'/Dashboard'}>
                                    <span className="icon icon-line-graph"></span> Dashboard
                                </Link>
                            </li>
                            {(accessType == 'admin' || accessType == 'super-admin') &&
                                <li>
                                    <Link to={'/Admin'}>
                                        <span className="icon icon-add-user"></span> Admin
                                </Link>
                                </li>
                            }
                            <li>
                                <Link to={'/Tools'}>
                                    <span className="icon icon-tools"></span> Tools
                                </Link>
                            </li>
                        </ul>
                        <ul className='nav navbar-nav navbar-right'>

                            {(accessType == 'super-admin') &&
                                <li>
                                    <div className="input-group">
                                        <span className='inner-span'>Program</span>
                                        <select name="program" className='custom-select' value={program} onChange={this.onSelectProgram}>
                                            <option key={'pg-1'} value={'EM'} >{'Emergency Medicine'}</option>
                                            <option key={'pg-2'} value={'AN'} >{'Anesthesia '}</option>
                                        </select>
                                    </div>
                                </li>
                            }

                            <li> {this.props.logged_in ?
                                <Link to='/Logout' onClick={this.logOut}>
                                    <span className="icon icon-log-out"></span> Logout
                                        </Link>
                                :
                                <a href={loginRedirectURL}>
                                    <span style={logoIconStyle} className="paws-icon"></span>
                                    <span>Login</span>
                                </a>
                            }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        logged_in: state.oracle.sessionStatus,
        userDetails: state.oracle.userDetails
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setLogoutData: bindActionCreators(setLogoutData, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
