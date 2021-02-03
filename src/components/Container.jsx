import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loading from 'react-loading';
import { setResidentList } from '../redux/actions/actions';
import { getLearnerList } from '../utils/requestServer';

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = { showPresetLoader: true };
    }

    componentDidMount() {
        // preset info from elentra global to redux store
        let dashboardPreset = {
            'userId': proxy_id,
            'courseId': course_id,
            'organisationId': organisation_id,
            'cperiodId': cperiod_id,
            'filterOptions': dashboard_filter_options
        };
        // Call the learner list API to get a list of all residents
        // for the select filter parameters and store the response in redux
        getLearnerList({ course_id, organisation_id, cperiod_id }).then((residentList) => {
            this.props.actions.setResidentList(residentList);
        })
            .catch((err) => { console.log(err) })
            .finally(() => { this.setState({ showPresetLoader: false }) })
    }


    render() {
        return (
            <div id='app-container'>
                {this.state.showPresetLoader ?
                    <Loading type='spin'
                        className='preset-loader' height='100px'
                        width='100px' color='#1b6699' delay={-1} />
                    : <div id='container-body'> {this.props.children} </div>}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ setResidentList }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(Container);