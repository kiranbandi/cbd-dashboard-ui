import React, { Component } from 'react';
import { getAllData } from '../../utils/requestServer';
import _ from 'lodash';
import ProgramsSummary from '../ProgramOversightGroup/ProgramsSummary';

export default class OversightDashboard extends Component {

    constructor(props) {
        super(props);
        window.global_summary = {};
        this.state = {
            isLoaderVisible: false,
            programList: []
        };
        this._isMounted = false;
    }


    async componentDidMount() {
        this._isMounted = true;
        // turn loader on
        this.setState({ isLoaderVisible: true });

        let courses = [
            "3000000",
            "3000014",
            "3000006",
            "3000022",
            "3000003",
            "3000061",
            "3000051",
            "3000002",
            "3000005",
            "3000020",
            "3000013",
            "3000001",
            "3000128",
            "3000096",
            "3000154"];


        Promise.all(courses.map((c) => getAllData(c)))
            .then((course_data_list) => {
                // create a list of acad emic years 
                let programList = _.map(_.sortBy(course_data_list, d => d.allResidentRecords.length || 0), (e, index) => {
                    let courseName = e.courseName.indexOf(':') > -1 ? e.courseName.split(':')[1].trim() : e.courseName.trim();
                    window.global_summary[courseName] = e.allResidentRecords;
                    return { 'label': courseName, 'value': courseName };
                });
                // set the values on the state 
                this._isMounted && this.setState({ programList, isLoaderVisible: false });
            })
            .catch(() => {
                this._isMounted && this.setState({ isLoaderVisible: false });
                console.log("error in fetching all resident records");
            });

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        const { programList = [] } = this.state,
            fullWidth = document.body.getBoundingClientRect().width - 300;

        return (
            <div className='m-a dashboard-root-program m-b-lg' >
                {this.state.isLoaderVisible ?
                    <div className='text-center'>
                        <i className='fa fa-spinner fa-5x fa-spin m-t-lg' aria-hidden="true"></i>
                    </div> :
                    <div className='container-fluid'>
                        {programList.length > 0 ?
                            <div>
                                <ProgramsSummary
                                    width={fullWidth}
                                    programList={_.reverse(programList)} />
                            </div>
                            : <h2 className='text-primary text-center m-t-lg'>No program data available currently</h2>}
                    </div>}
            </div >
        );
    }
}


