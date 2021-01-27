import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLoginData } from '../redux/actions/actions';

class Container extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var user = {
            accessType: "sampleType",
            program: "EM",
            token: "testtoken",
            username: "testusername"
        };
        this.props.actions.setLoginData(user);
    }


    render() {

        return (
            <div id='app-container'>
                <div id='container-body'> {this.props.children} </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ setLoginData }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(Container);