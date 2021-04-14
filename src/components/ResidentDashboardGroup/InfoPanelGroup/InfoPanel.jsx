import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import EPASpeedInfo from './EPASpeedInfo';
import RecentEPATrend from './RecentEPATrend';
import { toggleChecklistVisbility } from '../../../redux/actions/actions';
import RotationSchedule from '../RotationScheduleGroup/RotationSchedule';

class InfoPanel extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let { residentData, residentFilter, rotationSchedule = [],
            programInfo, width, smallScreen, residentInfo } = this.props;

        return (
            <div className='info-panel'>
                <div className='info-panel-inner'>
                    {!!residentData && rotationSchedule.length > 0 &&
                        <RotationSchedule residentData={residentData} width={width} rotationSchedule={rotationSchedule} />}
                    {!!residentData &&
                        <EPASpeedInfo
                            width={width}
                            smallScreen={smallScreen}
                            residentData={residentData}
                            residentInfo={residentInfo}
                            residentFilter={residentFilter} />}
                    <div className="info-panel-subcharts-wrapper">
                        {!smallScreen &&
                            <RecentEPATrend width={width}
                                residentData={residentData} programInfo={programInfo} />}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        residentData: state.oracle.residentData,
        programInfo: state.oracle.programInfo,
        rotationSchedule: state.oracle.rotationSchedule
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ toggleChecklistVisbility }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel);