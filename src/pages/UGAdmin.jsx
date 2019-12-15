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
                <h2 className='m-a'>Under Construction</h2>
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



