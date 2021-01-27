import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveDashboard } from '../redux/actions/actions';
import { ResidentDashboard, NormativeDashboard } from '../components';

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

        let { activeDashboard = 'resident' } = this.props;

        return (
            <div className='dashboard-page-root' >
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
                </div>
            </div>
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



