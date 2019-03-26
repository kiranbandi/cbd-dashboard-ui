import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


export default class ResidentDashboard extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { allData } = this.props;

    //     // toggle loader before fetching data
    //     this.props.actions.toggleLoader();
    //     // get list of all residents
    //     getResidentList()
    //         .then((residentList) => {
    //             this.props.actions.setResidentList(residentList);
    //         })
    //         // toggle loader again once the request completes
    //         .catch(() => { console.log("error in fetching resident list"); })
    //         .finally(() => {
    //             this.props.actions.toggleLoader();
    //         });
    }


    render() {

        return (
            <div className='m-a' >
                Supervisory Metrics Page Coming Soon...
            </div >
        );
    }
}
