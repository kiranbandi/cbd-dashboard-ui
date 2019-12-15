import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUGData } from '../../utils/requestServer';
import Loading from 'react-loading';
import UGStudentFilterPanel from './UGStudentFilterPanel';
import UGGraphGroup from './UGGraphGroup';

class UGStudentDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            studentRecords: [],
            studentList: [],
            startDate: '',
            endDate: '',
            dateFilterActive: false,
            currentStudent: ''
        }
        this._isMounted = false;

        this.onSubmit = this.onSubmit.bind(this);
        this.onDateFilterToggle = this.onDateFilterToggle.bind(this);
        this.onStudentSelect = this.onStudentSelect.bind(this);

    }

    onDateFilterToggle() {
        this.setState({ dateFilterActive: !this.state.dateFilterActive });
    }

    onSubmit() {
        const startDate = document.getElementById('faculty-filter-startDate') && document.getElementById('faculty-filter-startDate').value;
        const endDate = document.getElementById('faculty-filter-endDate') && document.getElementById('faculty-filter-endDate').value;
        this.setState({ startDate, endDate });
    }

    onStudentSelect(option) {
        this.setState({ currentStudent: option.value });
    }


    componentDidMount() {

        this._isMounted = true;
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });
        // get data for all students
        getUGData()
            .then((data) => {
                const { studentRecords, studentList } = processStudentData(data);
                this.setState({ studentList, studentRecords });
            })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching UG data"); })
            .finally(() => {
                this._isMounted && this.setState({ isLoaderVisible: false });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        const { studentList, currentStudent, dateFilterActive, studentRecords } = this.state;

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let width = document.body.getBoundingClientRect().width - 125;

        let currentStudentRecords = _.filter(studentRecords, (d) => d.name == currentStudent);

        return (
            <div className='dashboard-root-resident m-t' >
                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div className='m-t-md'>
                        <UGStudentFilterPanel
                            studentList={studentList}
                            currentStudent={currentStudent}
                            dateFilterActive={dateFilterActive}
                            onCheckboxChange={this.onDateFilterToggle}
                            onStudentSelect={this.onStudentSelect}
                            onSubmit={this.onSubmit} />
                        {currentStudent != '' &&
                            <UGGraphGroup
                                width={width}
                                studentRecords={currentStudentRecords} />}
                    </div>}
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        //  can be null occasionally so better to check and set it
        programInfo: state.oracle.programInfo ? state.oracle.programInfo : {}
    };
}

export default connect(mapStateToProps, null)(UGStudentDashboard);



function processStudentData(records) {

    // remove the 1t head row ,as it contains column names, 
    // from the records list and then start processing it
    // remove spaces and convert to lowercase for uniformity
    const studentRecords = _.filter(records.slice(1), (d) => d[3].indexOf('@mail.usask.ca') > -1)
        .map((row) => {
            return {
                'epa': Number(row[0].slice(3)),
                'name': (row[1] + " " + row[2]).toLowerCase().trim(),
                'nsid': row[3].slice(0, 6).toLowerCase().trim(),
                'observer_name': row[4].toLowerCase().trim(),
                'date': row[6].slice(0, 10),
                'rating': row[7].toLowerCase().trim(),
                'rotation': row[8].toLowerCase().trim(),
                'feedback': row[9].toLowerCase().trim(),
                'patient_type': row[10].toLowerCase().trim(),
                'admission_type': row[11].toLowerCase().trim()
            };
        });

    const studentList = _.map(_.groupBy(studentRecords, (d) => d.name), (records, name) => {
        return { name, records };
    }).sort((a, b) => a.name.localeCompare(b.name));


    return { studentRecords, studentList };

}