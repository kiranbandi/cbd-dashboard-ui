import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setactivePage } from '../redux/actions/actions';
import {
    ResidentDashboard, NormativeDashboard,
    FacultyDashboard, ProgramDashboard,
    RotationImport, OversightDashboard
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
        this.props.actions.setactivePage(boardId);
    }

    render() {

        let { activePage = 'resident' } = this.props,
            { dashboard_mode = 'resident', advanced_mode = 'disabled', user_type = 'non-admin' } = dashboard_options;


        return (
            <div className='custom-dashboard-page-root' >
                <div>
                    {dashboard_mode != 'resident' &&
                        <div className='no-printing'>
                            <ul className="dashboard-navigation clearfix">
                                <li className={activePage == 'resident' ? 'active' : ''}>
                                    <a data-tip={infoTooltipReference.residentMetrics.main} id='resident-tab' onClick={this.onTabClick} >Resident Metrics</a>
                                </li>
                                <li className={activePage == 'normative' ? 'active' : ''}>
                                    <a data-tip={infoTooltipReference.normativeAssessment.main} id='normative-tab' onClick={this.onTabClick} >Normative Assessment</a>
                                </li>
                                {advanced_mode == 'enabled' && <li className={activePage == 'supervisor' ? 'active' : ''}>
                                    <a data-tip={infoTooltipReference.facultyDevlopment.main} id='supervisor-tab' onClick={this.onTabClick} >Faculty Development</a>
                                </li>}
                                {advanced_mode == 'enabled' && <li className={activePage == 'program' ? 'active' : ''}>
                                    <a data-tip={infoTooltipReference.programEvaluation.main} id='program-tab' onClick={this.onTabClick} >Program Evaluation</a>
                                </li>}
                                {advanced_mode == 'enabled' && <li className={activePage == 'oversight' ? 'active' : ''}>
                                    <a data-tip={infoTooltipReference.programOversight.main} id='oversight-tab' onClick={this.onTabClick} >Program Oversight</a>
                                </li>}
                                {user_type == 'medtech' && <li className={activePage == 'rotation' ? 'active' : ''}>
                                    <a data-tip={infoTooltipReference.rotationModule.main} id='rotation-tab' onClick={this.onTabClick} > Schedule Import</a>
                                </li>}
                            </ul>
                            <div className='clearfix'></div>
                        </div>}
                    <div className='control-inner-container'>
                        {(activePage == 'resident') && <ResidentDashboard dashboard_mode={dashboard_mode} />}
                        {(activePage == 'normative') && <NormativeDashboard />}
                        {(activePage == 'supervisor') && <FacultyDashboard />}
                        {(activePage == 'program') && <ProgramDashboard />}
                        {(activePage == 'oversight') && <OversightDashboard />}
                        {(activePage == 'rotation') && <RotationImport />}
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        programInfo: state.oracle.programInfo,
        activePage: state.oracle.activePage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ setactivePage }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardRoot);



