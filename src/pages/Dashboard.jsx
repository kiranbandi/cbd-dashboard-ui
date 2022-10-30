import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveDashboard, setLoginData } from '../redux/actions/actions';
import { requestLogin } from '../utils/requestServer';
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

    componentDidMount() {
        requestLogin()
            .then((user) => { this.props.actions.setLoginData(user) })
            .catch((err) => { console.log(err) });
    }


    render() {

        let { userType, isModalVisible, infoCard, isChecklistVisible,
            programInfo, activeDashboard = 'normative', route } = this.props,
            { pawsTicket = '' } = route,
            boardsLevel = '0';

        if (userType == 'super-admin' || userType == 'admin' || userType == "director") {
            boardsLevel = '1';
        }
        else if (userType == 'reviewer' || userType == "supervisor") {
            boardsLevel = '2';
        }

        // opening through the ticket 1867 would allow users to view resient dashboard
        // https://cbme.usask.ca/demo/?ticket=1867
        let residentDashboardEnabled = pawsTicket == '1867';
        // set to window ticket
        window.residentDashboardEnabled = residentDashboardEnabled;

        return (
            <div className='dashboard-page-root' >
                {isModalVisible && <Modal infoCard={infoCard} />}
                {boardsLevel == '1' &&
                    <div>
                        <s-tooltip border-width="1px" show-delay="1000" style={{ fontFamily: 'inherit' }} attach-to=".dashboard-tab"></s-tooltip>
                        <div className="hr-divider nav-pill-container-dashboard">
                            <ul className="nav nav-pills hr-divider-content hr-divider-nav">
                                {residentDashboardEnabled && <li className={activeDashboard == 'resident' ? 'active' : ''}>
                                    <a id='resident-tab' className="dashboard-tab" onClick={this.onTabClick} data-s-tooltip-text={infoTooltipReference.residentMetrics.main}>
                                        RESIDENT METRICS
                                    </a>
                                </li>}
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
                            </ul>
                        </div>
                        <div className='control-inner-container'>
                            {(activeDashboard == 'resident' && residentDashboardEnabled) && <ResidentDashboard />}
                            {(activeDashboard == 'supervisor') && <FacultyDashboard programInfo={programInfo} />}
                            {(activeDashboard == 'program') && <ProgramDashboard programInfo={programInfo} />}
                            {(activeDashboard == 'table') && <DownloadDashboard />}
                            {(activeDashboard == 'normative') && <NormativeDashboard />}
                        </div>
                    </div>}
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
        actions: bindActionCreators({ setActiveDashboard, setLoginData }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardRoot);



