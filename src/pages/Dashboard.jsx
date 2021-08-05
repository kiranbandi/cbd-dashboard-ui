import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setactivePage } from '../redux/actions/actions';
import { ResidentDashboard, NormativeDashboard, FacultyDashboard } from '../components';
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
            { dashboard_mode = 'resident' } = dashboard_options;

        return (
            <div className='custom-dashboard-page-root' >
                <div>
                    {dashboard_mode != 'resident' &&
                        <div className="hr-divider nav-pill-container-dashboard">
                            <ul className="nav nav-pills hr-divider-content hr-divider-nav">
                                <li className={activePage == 'resident' ? 'active' : ''}>
                                    <a data-tip={infoTooltipReference.residentMetrics.main} id='resident-tab' onClick={this.onTabClick} >RESIDENT METRICS</a>
                                </li>
                                <li className={activePage == 'normative' ? 'active' : ''}>
                                    <a data-tip={infoTooltipReference.normativeAssessment.main} id='normative-tab' onClick={this.onTabClick} >NORMATIVE ASSESSMENT</a>
                                </li>
                                <li className={activePage == 'supervisor' ? 'active' : ''}>
                                    <a data-tip={infoTooltipReference.facultyDevlopment.main} id='supervisor-tab' onClick={this.onTabClick} >FACULTY DEVELOPMENT</a>
                                </li>
                            </ul>
                        </div>}
                    <div className='control-inner-container'>
                        {(activePage == 'resident') && <ResidentDashboard dashboard_mode={dashboard_mode} />}
                        {(activePage == 'normative') && <NormativeDashboard />}
                        {(activePage == 'supervisor') && <FacultyDashboard />}
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



