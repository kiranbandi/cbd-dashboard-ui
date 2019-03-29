import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ResidentDashboard, ProgramDashboard, SupervisorDashboard, DownloadDashboard } from '../components';


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

        const { userType } = this.props,
            { activeBoard = 'resident' } = this.state,
            isAllowedMultiMode = (userType == 'admin' || userType == "reviewer");

        return (
            <div className='dashboard-page-root' >
                {isAllowedMultiMode ?
                    <div>
                        <div className="hr-divider">
                            <ul className="nav nav-pills hr-divider-content hr-divider-nav">
                                <li className={activeBoard == 'resident' ? 'active' : ''}>
                                    <a id='resident-tab' onClick={this.onTabClick} >RESIDENT METRICS</a>
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
                        <div className='admin-inner-container'>
                            {(activeBoard == 'resident') && <ResidentDashboard />}
                            {(activeBoard == 'supervisor') && <SupervisorDashboard />}
                            {(activeBoard == 'program') && <ProgramDashboard />}
                            {(activeBoard == 'table') && <DownloadDashboard />}
                        </div>

                    </div>
                    : <ResidentDashboard />}
            </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        userType: state.oracle.userDetails.accessType,

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardRoot);



