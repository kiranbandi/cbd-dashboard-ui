import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UGFacultyDashboard, UGProgramDashboard } from '../components';
import { requestLogin } from '../utils/requestServer';
import { setLoginData } from '../redux/actions/actions';
import { bindActionCreators } from 'redux';

class DashboardRoot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeDashboard: 'supervisor'
        };
        this.onTabClick = this.onTabClick.bind(this);
    }

    componentDidMount() {
        requestLogin('UG')
            .then((user) => { this.props.actions.setLoginData(user) })
            .catch((err) => { console.log(err) });
    }


    onTabClick(event) {
        event.preventDefault();
        const activeDashboard = event.target.id.split("-")[0];
        this.setState({ activeDashboard });
    }


    render() {

        let { programInfo } = this.props,
            { activeDashboard = 'supervisor' } = this.state;

        return (
            <div className='dashboard-page-root' >
                <div>
                    <div className="hr-divider nav-pill-container-dashboard">
                        <ul className="nav nav-pills hr-divider-content hr-divider-nav">
                            <li className={activeDashboard == 'supervisor' ? 'active' : ''}>
                                <a id='supervisor-tab' onClick={this.onTabClick}>FACULTY DEVELOPMENT</a>
                            </li>
                            <li className={activeDashboard == 'program' ? 'active' : ''}>
                                <a id='program-tab' onClick={this.onTabClick}>PROGRAM EVALUATION</a>
                            </li>
                        </ul>
                    </div>
                    <div className='control-inner-container'>
                        {(activeDashboard == 'supervisor') && <UGFacultyDashboard programInfo={programInfo} />}
                        {(activeDashboard == 'program') && <UGProgramDashboard programInfo={programInfo} />}
                    </div>
                </div>
            </div >
        );
    }
}


function mapStateToProps(state) {
    return {
        programInfo: state.oracle.programInfo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ setLoginData }, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardRoot);



