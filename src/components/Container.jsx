import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setResidentList } from '../redux/actions/actions';
import { getLearnerList } from '../utils/requestServer';

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = { showPresetLoader: true };
    }

    componentDidMount() {
        // Before the content is mounted, hide the sidebar if its shown, quick patch
        // to conserve visual space for charting
        if (jQuery('#grid-layout').hasClass('grid-sidebar')) {
            jQuery('#grid-layout').removeClass('grid-sidebar');
            jQuery('#grid-layout').addClass('grid-no-sidebar');
            jQuery('.inner-sidebar div').each(function () {
                jQuery(this).addClass('hide');
            });
        }

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
                    <div className='text-center'>
                        <i className='fa fa-spinner fa-5x fa-spin m-t-lg' aria-hidden="true"></i>
                    </div>
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