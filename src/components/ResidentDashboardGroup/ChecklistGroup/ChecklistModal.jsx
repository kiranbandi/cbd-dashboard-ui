/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleChecklistVisbility } from '../../../redux/actions/actions';
import Loading from 'react-loading';

class ChecklistModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            taskFilter: 'all'
        }
    }

    filterClick = (event) => {
        const taskFilter = event.target.id.split("-")[1];
        this.setState({ taskFilter });
    }


    componentDidMount() {
        const { residentFilter } = this.props, { username = '' } = residentFilter;
        // turn on loader
        this.setState({ isLoading: true });
        // Get the checklist data for the selected resident
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 500)
    }

    render() {

        const { isLoading, taskFilter = 'all' } = this.state;

        return (
            <div className='checklist-modal-root'>
                <div className='modal-main'>
                    <button type="button" className="close" onClick={this.props.actions.toggleChecklistVisbility}>
                        <span>×</span>
                    </button>
                    <h3 className='text-center'>Resident Checklist</h3>
                    <div className='checklist-container text-center'>
                        {isLoading ?
                            <Loading className='loader-modify' type='spin' height='100px' width='100px' color='#d6e5ff' delay={-1} /> :
                            <div>
                                <h4 className='text-info'>This space can be used to keep track of your own goals and milestones for every academic year.</h4>
                                <div className="hr-divider">
                                    <ul className="nav nav-pills hr-divider-content hr-divider-nav">
                                        <li className={taskFilter == 'all' ? 'active' : ''}>
                                            <a id='taskFilter-all' onClick={this.filterClick} >View All</a>
                                        </li>
                                        <li className={taskFilter == 'current' ? 'active' : ''}>
                                            <a id='taskFilter-current' onClick={this.filterClick} >Active</a>
                                        </li>
                                        <li className={taskFilter == 'completed' ? 'active' : ''}>
                                            <a id='taskFilter-completed' onClick={this.filterClick}>Completed</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ toggleChecklistVisbility }, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        residentFilter: state.oracle.residentFilter
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ChecklistModal);






