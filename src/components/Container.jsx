import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setResidentList, setResidentFilter, setResidentData } from '../redux/actions/actions';
import { getLearnerList, getLearnerData } from '../utils/requestServer';
import processCourseData from '../utils/processors/processCourseData';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import _ from 'lodash';
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

        const { dashboard_mode = 'resident' } = dashboard_options;

        if (dashboard_mode != 'resident') {
            // Call the learner list API to get a list of all residents
            // for the select filter parameters and store the response in redux
            getLearnerList({ course_id, organisation_id, cperiod_id }).then((residentList) => {
                this.props.actions.setResidentList(residentList);
            })
                .catch((err) => { console.log(err) })
                .finally(() => { this.setState({ showPresetLoader: false }) })
        }
        // If the dashboard is opened in single resident mode
        // automatically prefetch data for the active resident
        else {
            const [learner_list = []] = dashboard_options.dashboard_reference || [];            // process the resident list 
            const residentList = processCourseData([learner_list, [], []], 'resident');
            // Set the resident list list 
            this.props.actions.setResidentList(residentList);
            // Set the resident filter 
            const { residentFilter } = this.props;
            // Get resident data from the only resident in the list
            const residentInfo = residentList[0];
            residentFilter.username = residentInfo.username;
            this.props.actions.setResidentFilter(residentFilter);
            // fetch data from server based on the filter params
            getLearnerData(residentFilter.username, residentInfo)
                .then((processedData) => {
                    const { programInfo, residentData, rotationSchedule, expiredData } = processedData;
                    // mark records to so record is set in a date period filter
                    var markedResidentData = _.map(residentData, (d) => {
                        if (residentFilter.isAllData) { d.mark = false }
                        else if (!!residentFilter.startDate && !!residentFilter.endDate) {
                            d.mark = moment(d.Date, 'YYYY-MM-DD').isBetween(residentFilter.startDate, residentFilter.endDate, 'days', '[]')
                        }
                        else { d.mark = false }
                        return d;
                    });
                    // group data on the basis of EPA
                    var groupedResidentData = _.groupBy(markedResidentData, (d) => d.EPA);
                    // if uncommenced EPAs are needed to be seen then sub in empty records and 
                    // sort records by Date --force
                    _.map(programInfo.epaSourceMap, (source) => {
                        _.map(source.subRoot, (epa, innerKey) => {
                            groupedResidentData[innerKey] = _.sortBy(groupedResidentData[innerKey] || [], (d) => d.Date);
                        })
                    })
                    // store the info of visibility of phase into resident info
                    residentInfo.openOnlyCurrentPhase = true;
                    this.props.actions.setResidentData(groupedResidentData, residentInfo, programInfo, rotationSchedule, expiredData);
                })
                .finally(() => { this.setState({ showPresetLoader: false }) });
        }

    }


    render() {
        return (
            <div id='app-container'>
                {this.state.showPresetLoader ?
                    <div className='text-center'>
                        <i className='fa fa-spinner fa-5x fa-spin m-t-lg' aria-hidden="true"></i>
                    </div>
                    : <div id='container-body'>
                        {this.props.children}
                        <ReactTooltip delayShow={500} className='custom-react-tooltip' />
                    </div>}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setResidentList,
            setResidentFilter,
            setResidentData
        }, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        residentFilter: state.oracle.residentFilter
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);