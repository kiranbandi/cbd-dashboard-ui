/*global $*/
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactSelect from 'react-select';
import { setLogoutData } from '../redux/actions/actions';

//  Image url handling is convoluted in scss , much easier to set inline and get images from root
let logoIconStyle = { background: 'url(assets/img/pawslogo.png)', backgroundSize: '100%' };
const programsList = [{ value: 'EM', label: 'Emergency Medicine' }, { value: 'ANESTHESIA', label: 'Anesthesia' }, { value: 'OBGYN', label: 'Obstetrics and Gynecology' }];

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
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


    // program change is bubbled up to the container level and handled there
    render() {
        const { userDetails, onProgramChange } = this.props,
            { accessType = '', program } = userDetails,
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
                                    <div className="input-group program-select">
                                        <span className='inner-span'>Program</span>
                                        <ReactSelect
                                            className='select-box'
                                            value={_.find(programsList, (entry) => entry.value == program)}
                                            options={programsList}
                                            styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                            onChange={onProgramChange} />
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
