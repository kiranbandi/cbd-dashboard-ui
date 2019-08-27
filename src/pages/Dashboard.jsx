import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ResidentDashboard, ProgramDashboard,
    SupervisorDashboard, Modal,
    NormativeDashboard, DownloadDashboard
} from '../components';

class DashboardRoot extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeBoard: 'resident'
        };
        this.onTabClick = this.onTabClick.bind(this);
    }


    onTabClick(event) {
        event.preventDefault();
        const id = event.target.id.split("-")[0];
        this.setState({ activeBoard: id });
    }


    render() {

        let { userType, programInfo } = this.props,
            { activeBoard = 'resident' } = this.state;

        let boardsLevel = '0';

        if (userType == 'super-admin' || userType == 'admin' || userType == "director") {
            boardsLevel = '1';
        }
        else if (userType == 'reviewer' || userType == "supervisor") {
            boardsLevel = '2';
        }


        return (
            <div className='dashboard-page-root' >
                {boardsLevel == '1' &&
                    <div>
                        <div className="hr-divider nav-pill-container-dashboard">
                            <ul className="nav nav-pills hr-divider-content hr-divider-nav">
                                <li className={activeBoard == 'resident' ? 'active' : ''}>
                                    <a id='resident-tab' onClick={this.onTabClick} >RESIDENT METRICS</a>
                                </li>
                                <li className={activeBoard == 'normative' ? 'active' : ''}>
                                    <a id='normative-tab' onClick={this.onTabClick} >NORMATIVE ASSESSMENT</a>
                                </li>
                                <li className={activeBoard == 'supervisor' ? 'active' : ''}>
                                    <a id='supervisor-tab' onClick={this.onTabClick}>FACULTY DEVELOPMENT</a>
                                </li>
                                <li className={activeBoard == 'program' ? 'active' : ''}>
                                    <a id='program-tab' onClick={this.onTabClick}>PROGRAM EVALUATION</a>
                                </li>
                                <li className={activeBoard == 'table' ? 'active' : ''}>
                                    <a id='table-tab' onClick={this.onTabClick}>EXPORT DATA</a>
                                </li>
                            </ul>
                        </div>
                        <div className='control-inner-container'>
                            {(activeBoard == 'resident') && <ResidentDashboard />}
                            {(activeBoard == 'supervisor') && <SupervisorDashboard programInfo={programInfo} />}
                            {(activeBoard == 'program') && <ProgramDashboard programInfo={programInfo} />}
                            {(activeBoard == 'table') && <DownloadDashboard />}
                            {(activeBoard == 'normative') && <NormativeDashboard />}
                        </div>
                    </div>}
                {boardsLevel == '2' &&
                    <div>
                        <div className="hr-divider nav-pill-container-dashboard">
                            <ul className="nav nav-pills hr-divider-content hr-divider-nav">
                                <li className={activeBoard == 'resident' ? 'active' : ''}>
                                    <a id='resident-tab' onClick={this.onTabClick} >RESIDENT METRICS</a>
                                </li>
                                <li className={activeBoard == 'normative' ? 'active' : ''}>
                                    <a id='normative-tab' onClick={this.onTabClick} >NORMATIVE ASSESSMENT</a>
                                </li>
                            </ul>
                        </div>
                        <div className='control-inner-container'>
                            {(activeBoard == 'resident') && <ResidentDashboard />}
                            {(activeBoard == 'normative') && <NormativeDashboard />}
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
        programInfo: state.oracle.programInfo
    };
}

export default connect(mapStateToProps, null)(DashboardRoot);



