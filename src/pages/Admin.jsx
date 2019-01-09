import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AddData, CreateUser, ModifyUser } from '../components';

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
        const { activeTab = 'create-tab' } = this.state;

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
                        <li className={activeTab == 'addData-tab' ? 'active' : ''}>
                            <a id='addData-tab' onClick={this.onTabClick}>Upload Data</a>
                        </li>
                    </ul>
                </div>
                <div className='admin-inner-container'>
                    {(activeTab == 'create-tab') && <CreateUser />}
                    {(activeTab == 'modify-tab') && <ModifyUser />}
                    {(activeTab == 'addData-tab') && <AddData />}
                </div>
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

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);



