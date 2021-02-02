import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLoginData } from '../redux/actions/actions';

import { getLearnerList } from '../utils/requestServer';

class Container extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let dashboard_prep = {
            'jwt': JWT,
            'api': ENTRADA_URL,
            'user_id': proxy_id,
            'course_id': course_id,
            'organisation_id': organisation_id,
            'cperiod_id': cperiod_id,
            'epa_list': epa_list
        };



        getLearnerList({ course_id, organisation_id, cperiod_id }).then(() => {
            debugger;
        })



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