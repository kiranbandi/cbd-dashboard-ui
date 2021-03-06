import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    AddData, CreateUser, AddExamscore,
    ModifyUser, AddCCFeedback
} from '../components';

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'create-tab'
        };
        this.onTabClick = this.onTabClick.bind(this);
    }

    onTabClick(event) {
        event.preventDefault();
        const id = event.target.id;
        this.setState({ activeTab: id });
    }

    render() {
        const { activeTab = 'create-tab' } = this.state, { programInfo } = this.props;

        return (
            <div className='admin-root m-t container' >
                <div className="hr-divider">
                    <ul className="nav nav-pills hr-divider-content hr-divider-nav">
                        <li className={activeTab == 'create-tab' ? 'active' : ''}>
                            <a id='create-tab' onClick={this.onTabClick} >Create User</a>
                        </li>
                        <li className={activeTab == 'modify-tab' ? 'active' : ''}>
                            <a id='modify-tab' onClick={this.onTabClick}>Modify User</a>
                        </li>
                        <li className={activeTab == 'add-cc-tab' ? 'active' : ''}>
                            <a id='add-cc-tab' onClick={this.onTabClick}>Add CC Feedback</a>
                        </li>
                        <li className={activeTab == 'add-exam-tab' ? 'active' : ''}>
                            <a id='add-exam-tab' onClick={this.onTabClick}>Add Exam Scores</a>
                        </li>
                        <li className={activeTab == 'addData-tab' ? 'active' : ''}>
                            <a id='addData-tab' onClick={this.onTabClick}>Upload Data</a>
                        </li>
                    </ul>
                </div>
                <div className='admin-inner-container'>
                    {(activeTab == 'create-tab') && <CreateUser programInfo={programInfo} />}
                    {(activeTab == 'modify-tab') && <ModifyUser programInfo={programInfo} />}
                    {(activeTab == 'add-exam-tab') && <AddExamscore programInfo={programInfo} />}
                    {(activeTab == 'add-cc-tab') && <AddCCFeedback programInfo={programInfo} />}
                    {(activeTab == 'addData-tab') && <AddData programInfo={programInfo} />}
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

export default connect(mapStateToProps, null)(Admin);



