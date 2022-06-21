import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveDashboard } from '../redux/actions/actions';
import {
    ResidentDashboard, ProgramDashboard,
    FacultyDashboard, Modal,
    NormativeDashboard, DownloadDashboard
} from '../components';
import infoTooltipReference from '../utils/infoTooltipReference';

class DashboardRoot extends Component {

    constructor(props) {
        super(props);
        this.onTabClick = this.onTabClick.bind(this);
    }

    onTabClick(event) {
        event.preventDefault();
        const boardId = event.target.id.split("-")[0];
        this.props.actions.setActiveDashboard(boardId);
    }


    render() {

        let { userType, isModalVisible, infoCard, isChecklistVisible,
            programInfo, activeDashboard = 'resident' } = this.props;

        let boardsLevel = '0';

        if (userType == 'super-admin' || userType == 'admin' || userType == "director") {
            boardsLevel = '1';
        }
        else if (userType == 'reviewer' || userType == "supervisor") {
            boardsLevel = '2';
        }

        return (
            <div className='dashboard-page-root' >
                {isModalVisible && <Modal infoCard={infoCard} />}
                {boardsLevel == '1' &&
                    <div>
                        <s-tooltip border-width="1px" show-delay="1000" style={{ fontFamily: 'inherit' }} attach-to=".dashboard-tab"></s-tooltip>
                        <div className="hr-divider nav-pill-container-dashboard">
                            <ul className="nav nav-pills hr-divider-content hr-divider-nav">
                                <li className={activeDashboard == 'resident' ? 'active' : ''}>
                                    <a id='resident-tab' className="dashboard-tab" onClick={this.onTabClick} data-s-tooltip-text={infoTooltipReference.residentMetrics.main}>
                                        RESIDENT METRICS
                                    </a>
                                </li>
                                <li className={activeDashboard == 'normative' ? 'active' : ''}>
                                    <a id='normative-tab' className="dashboard-tab" onClick={this.onTabClick} data-s-tooltip-text={infoTooltipReference.normativeAssessment.main}>
                                        NORMATIVE ASSESSMENT
                                    </a>
                                </li>
                                <li className={activeDashboard == 'supervisor' ? 'active' : ''}>
                                    <a id='supervisor-tab' className="dashboard-tab" onClick={this.onTabClick} data-s-tooltip-text={infoTooltipReference.facultyDevlopment.main}>
                                        FACULTY DEVELOPMENT
                                    </a>
                                </li>
                                <li className={activeDashboard == 'program' ? 'active' : ''}>
                                    <a id='program-tab' className="dashboard-tab" onClick={this.onTabClick} data-s-tooltip-text={infoTooltipReference.programEvaluation.main}>
                                        PROGRAM EVALUATION
                                    </a>
                                </li>
                                {/* <li className={activeDashboard == 'table' ? 'active' : ''}>
                                    <a id='table-tab' onClick={this.onTabClick}>EXPORT DATA</a>
                                </li> */}
                            </ul>
                        </div>
                        <div className='control-inner-container'>
                            {(activeDashboard == 'resident') && <ResidentDashboard />}
                            {(activeDashboard == 'supervisor') && <FacultyDashboard programInfo={programInfo} />}
                            {(activeDashboard == 'program') && <ProgramDashboard programInfo={programInfo} />}
                            {(activeDashboard == 'table') && <DownloadDashboard />}
                            {(activeDashboard == 'normative') && <NormativeDashboard />}
                        </div>
                    </div>}
                {boardsLevel == '2' &&
                    <div>
                        <div className="hr-divider nav-pill-container-dashboard">
                            <ul className="nav nav-pills hr-divider-content hr-divider-nav">
                                <li className={activeDashboard == 'resident' ? 'active' : ''}>
                                    <a id='resident-tab' onClick={this.onTabClick} >RESIDENT METRICS</a>
                                </li>
                                <li className={activeDashboard == 'normative' ? 'active' : ''}>
                                    <a id='normative-tab' onClick={this.onTabClick} >NORMATIVE ASSESSMENT</a>
                                </li>
                            </ul>
                        </div>
                        <div className='control-inner-container'>
                            {(activeDashboard == 'resident') && <ResidentDashboard />}
                            {(activeDashboard == 'normative') && <NormativeDashboard />}
                        </div>
                    </div>}
                {boardsLevel == '0' && <ResidentDashboard programInfo={programInfo} />}
            </div >
        );
    }
}


function mapStateToProps(state) {
    return {
        userType: state.oracle.userDetails.accessType,
        programInfo: state.oracle.programInfo,
        activeDashboard: state.oracle.activeDashboard,
        isModalVisible: state.oracle.isModalVisible,
        isChecklistVisible: state.oracle.isChecklistVisible,
        infoCard: state.oracle.infoCard
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ setActiveDashboard }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardRoot);



