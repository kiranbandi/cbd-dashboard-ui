import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import RotationSchedule from './RotationSchedule';
import EPASpeedInfo from './EPASpeedInfo';
import CiteScoreGraph from './CiteScoreGraph';
import RecentEPATrend from './RecentEPATrend';


class InfoPanel extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        let { residentData, residentFilter, residentList, expiredResidentData } = this.props,
            residentInfo = false, scheduleMap = false,
            longitudinalScheduleMap = false, citeScoreData = {};

        if (residentFilter && residentFilter.username) {
            residentInfo = _.find(residentList, (resident) => resident.username == residentFilter.username);
            scheduleMap = residentInfo && residentInfo.rotationSchedule && residentInfo.rotationSchedule['2018'];
            longitudinalScheduleMap = residentInfo && residentInfo.longitudinalSchedule && residentInfo.longitudinalSchedule['2018'] && residentInfo.longitudinalSchedule['2018'].split(",");
            citeScoreData = residentInfo && residentInfo.citeExamScore;
        }

        return (
            <div className='info-panel'>
                {residentInfo &&
                    <div className='info-panel-inner'>
                        <div className='titular-block'>
                            <span><b>CURRENT PHASE -</b> {residentInfo.currentPhase.split("-").join(" ")}</span>
                            <span><b>PROGRAM START DATE -</b> {(new Date(residentInfo.programStartDate)).toDateString()}</span>
                            <span><b>LAST UPDATED ON -</b> {(new Date(residentInfo.uploadedData)).toDateString()}</span>
                        </div>
                        {!!scheduleMap &&
                            <RotationSchedule
                                scheduleMap={scheduleMap}
                                longitudinalScheduleMap={longitudinalScheduleMap} />}
                        {!!residentData &&
                            <EPASpeedInfo
                                residentData={residentData}
                                expiredResidentData={expiredResidentData}
                                residentFilter={residentFilter} />}
                        <CiteScoreGraph citeScoreData={citeScoreData} />
                        <RecentEPATrend residentData={residentData} />
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        residentData: state.oracle.residentData,
        expiredResidentData: state.oracle.expiredResidentData,
        residentFilter: state.oracle.residentFilter,
        residentList: state.oracle.residentList
    };
}

export default connect(mapStateToProps, null)(InfoPanel);
