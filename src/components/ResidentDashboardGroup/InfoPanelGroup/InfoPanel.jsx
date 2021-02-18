import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import EPASpeedInfo from './EPASpeedInfo';
import RecentEPATrend from './RecentEPATrend';
import { toggleChecklistVisbility } from '../../../redux/actions/actions';

class InfoPanel extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let { residentData, residentFilter, residentList,
            programInfo, width, smallScreen } = this.props,
            residentInfo = false;

        if (residentFilter && residentFilter.username) {
            residentInfo = _.find(residentList, (resident) => resident.username == residentFilter.username)
        }

        return (
            <div className='info-panel'>
                {residentInfo &&
                    <div className='info-panel-inner'>
                        {!!residentData &&
                            <EPASpeedInfo
                                width={width}
                                smallScreen={smallScreen}
                                residentData={residentData}
                                residentInfo={residentInfo}
                                residentFilter={residentFilter} />}
                        <div className="info-panel-subcharts-wrapper">
                            {!smallScreen && <RecentEPATrend width={width} residentData={residentData} programInfo={programInfo} />}
                        </div>

                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        residentData: state.oracle.residentData,
        residentFilter: state.oracle.residentFilter,
        residentList: state.oracle.residentList,
        programInfo: state.oracle.programInfo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ toggleChecklistVisbility }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoPanel);