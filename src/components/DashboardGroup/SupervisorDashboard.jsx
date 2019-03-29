import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SupervisorDashboard extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { allData } = this.props;
        // toggle loader before fetching data
        this.props.actions.toggleLoader();
        // get list of all residents
        getResidentList()
            .then((residentList) => {
                this.props.actions.setResidentList(residentList);
            })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching resident list"); })
            .finally(() => {
                this.props.actions.toggleLoader();
            });
    }


    render() {
        return (
            <div className='m-a' >
                Supervisory Metrics Page Coming Soon...
            </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ toggleLoader }, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        residentList: state.oracle.residentList,
        loaderState: state.oracle.loaderState
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SupervisorDashboard);