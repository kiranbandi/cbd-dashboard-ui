import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    UGStudentDashboard, UGStub,
    UGDownloadDashboard, UGProgramDashboard
} from '../../components';

class DashboardRoot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeDashboard: 'student'
        };
        this.onTabClick = this.onTabClick.bind(this);
    }

    onTabClick(event) {
        event.preventDefault();
        const activeDashboard = event.target.id.split("-")[0];
        this.setState({ activeDashboard });
    }


    render() {

        let { userType, programInfo } = this.props,
            { activeDashboard = 'student' } = this.state;

        let boardsLevel = '0';

        if (userType == 'super-admin' || userType == 'admin' || userType == "director") {
            boardsLevel = '1';
        }

        return (
            <div className='dashboard-page-root' >
                {boardsLevel == '1' &&
                    <div>
                        <div className="hr-divider nav-pill-container-dashboard">
                            <ul className="nav nav-pills hr-divider-content hr-divider-nav">
                                <li className={activeDashboard == 'student' ? 'active' : ''}>
                                    <a id='student-tab' onClick={this.onTabClick} >STUDENT METRICS</a>
                                </li>
                                <li className={activeDashboard == 'supervisor' ? 'active' : ''}>
                                    <a id='supervisor-tab' onClick={this.onTabClick}>FACULTY DEVELOPMENT</a>
                                </li>
                                <li className={activeDashboard == 'program' ? 'active' : ''}>
                                    <a id='program-tab' onClick={this.onTabClick}>PROGRAM EVALUATION</a>
                                </li>
                                <li className={activeDashboard == 'table' ? 'active' : ''}>
                                    <a id='table-tab' onClick={this.onTabClick}>EXPORT DATA</a>
                                </li>
                            </ul>
                        </div>
                        <div className='control-inner-container'>
                            {(activeDashboard == 'student') && <UGStudentDashboard />}
                            {(activeDashboard == 'supervisor') && <UGStub programInfo={programInfo} />}
                            {(activeDashboard == 'program') && <UGProgramDashboard programInfo={programInfo} />}
                            {(activeDashboard == 'table') && <UGDownloadDashboard />}
                            {(activeDashboard == 'normative') && <UGStub />}
                        </div>
                    </div>}
                {boardsLevel == '0' && <UGStudentDashboard programInfo={programInfo} />}
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



