import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import RotationSchedule from './RotationSchedule';
import EPASpeedInfo from './EPASpeedInfo';
import CiteScoreGraph from './CiteScoreGraph';
import OralScoreGraph from './OralScoreGraph';
import RecentEPATrend from './RecentEPATrend';
import FeedbackBlock from './FeedbackBlock';
import { toggleChecklistVisbility } from '../../../redux/actions/actions';
import ReactTooltip from 'react-tooltip';

class InfoPanel extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        // needs to be hidden in the future
        // show tootlip for now to let users know of this new feature.
        ReactTooltip.show(document.getElementById('checklist-trigger-btn'));
    }

    render() {

        let { residentData, residentFilter,
            residentList, expiredResidentData, infoCardsVisible,
            programInfo, width, smallScreen } = this.props,
            residentInfo = false, citeScoreData = {}, oralScoreData = {}, ccFeedbackList = [];

        if (residentFilter && residentFilter.username) {
            residentInfo = _.find(residentList, (resident) => resident.username == residentFilter.username);
            citeScoreData = residentInfo && residentInfo.citeExamScore;
            oralScoreData = residentInfo && residentInfo.oralExamScore;
            // sort the feedback list by date from oldest to recent
            ccFeedbackList = residentInfo && residentInfo.ccFeedbackList.sort((a, b) => (new Date(a.meetingDate) - new Date(b.meetingDate)));
        }

        return (
            <div className='info-panel'>
                {residentInfo &&
                    <div className='info-panel-inner'>
                        <div className='titular-block'>
                            <span className='inner-title-block'><b>CURRENT PHASE -</b> {residentInfo.currentPhase.split("-").join(" ")}</span>
                            <span className='inner-title-block'><b>PROGRAM START DATE -</b> {(new Date(residentInfo.programStartDate)).toDateString()}</span>
                            <span className='inner-title-block'><b>LAST UPDATED ON -</b> {(new Date(residentInfo.uploadedData)).toDateString()}</span>
                            <ReactTooltip type='info' />
                            <button
                                id='checklist-trigger-btn'
                                data-tip="New feature to set goals and milestones !!"
                                onClick={this.props.actions.toggleChecklistVisbility}
                                className='view-checklist-button btn btn-primary-outline'>
                                <span className="icon icon-new-message"></span>
                                <span>Checklist</span>
                            </button>
                        </div>
                        {!!residentData &&
                            <RotationSchedule
                                // info cards will be shown in a modal when rotations are clicked
                                // in desktop
                                infoCardsVisible={infoCardsVisible && !smallScreen}
                                residentData={residentData}
                                residentInfo={residentInfo}
                                rotationRequired={programInfo.rotationRequired} />}
                        {!!residentData &&
                            <EPASpeedInfo
                                width={width}
                                smallScreen={smallScreen}
                                residentData={residentData}
                                residentInfo={residentInfo}
                                expiredResidentData={expiredResidentData}
                                residentFilter={residentFilter} />}

                        {!smallScreen && programInfo.examScoresVisible && <CiteScoreGraph width={width / 2} citeScoreData={filterOutEmptyKeys(citeScoreData)} />}
                        {!smallScreen && programInfo.examScoresVisible && < OralScoreGraph width={width / 2} oralScoreData={filterOutEmptyKeys(oralScoreData)} />}
                        {!smallScreen && <RecentEPATrend width={width / 2} residentData={residentData} programInfo={programInfo} />}
                        {!smallScreen && <FeedbackBlock
                            width={width / 2}
                            programInfo={programInfo}
                            residentInfo={residentInfo}
                            ccFeedbackList={ccFeedbackList} />}
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


// This santizes the exam scores so if that if a key is empty it is deleted
function filterOutEmptyKeys(scores) {

    if (scores) {
        _.map(Object.keys(scores), (key) => {
            if (!scores[key] && scores[key] !== 0) {
                delete scores[key];
            }
            // if its an empty array then also delete it
            if (scores[key] && scores[key].length == 0) {
                delete scores[key];
            }
        })
    }

    return scores;
}