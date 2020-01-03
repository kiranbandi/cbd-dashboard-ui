import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getResidentList, getAllData } from '../../../utils/requestServer';
import Loading from 'react-loading';
import UGStudentFilterPanel from '../UGStudentFilterPanel';
import UGGraphGroup from '../UGGraphGroup';
import moment from 'moment';

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
            showUncommencedEPA: false,
            currentStudent: '',
            currentRotation: '',
        }
        this._isMounted = false;

        this.onSubmit = this.onSubmit.bind(this);
        this.onDateFilterToggle = this.onDateFilterToggle.bind(this);
        this.showUncommencedEPAToggle = this.showUncommencedEPAToggle.bind(this);
        this.onStudentSelect = this.onStudentSelect.bind(this);
        this.onRotationSelect = this.onRotationSelect.bind(this);
    }

    onRotationSelect(option) {
        this.setState({ currentRotation: option.value });
    }

    onDateFilterToggle() {
        this.setState({ dateFilterActive: !this.state.dateFilterActive });
    }

    showUncommencedEPAToggle() {
        this.setState({ showUncommencedEPA: !this.state.showUncommencedEPA });
    }



    onSubmit() {
        const startDate = document.getElementById('student-filter-startDate') && document.getElementById('student-filter-startDate').value;
        const endDate = document.getElementById('student-filter-endDate') && document.getElementById('student-filter-endDate').value;
        this.setState({ startDate, endDate });
    }

    onStudentSelect(option) {
        this.setState({ currentStudent: option.value });
    }


    componentDidMount() {

        let { username, accessType } = this.props;

        this._isMounted = true;
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });
        getAllData()
            .then((data) => {
                let studentRecords = _.map(data, (d) => ({
                    'epa': d.epa,
                    'name': d.resident_name,
                    'nsid': d.username,
                    'observer_name': d.observer_name,
                    'date': d.observation_date,
                    'rating': d.rating,
                    'rotation': d.rotationTag,
                    'feedback': d.feedback,
                    'patient_type': d.situation_context,
                    'admission_type': d.professionalism_safety
                }));

                if (accessType == 'resident') {
                    studentRecords = _.filter(studentRecords, (d) => d.nsid == username);
                }

                const studentList = _.map(_.groupBy(studentRecords, (d) => d.name), (records, name) => {
                    return { name, records };
                }).sort((a, b) => a.name.localeCompare(b.name));

                // filter out records that dont have rotation and phase tag on them or are expired
                this._isMounted && this.setState({
                    studentList,
                    studentRecords
                });
            })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching records"); })
            .finally(() => {
                this._isMounted && this.setState({ isLoaderVisible: false });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        const { studentList, currentStudent, dateFilterActive, currentRotation,
            showUncommencedEPA, startDate, endDate, studentRecords } = this.state;

        const { rotationList } = this.props.programInfo;

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let width = document.body.getBoundingClientRect().width - 125;

        let currentStudentRecords = _.filter(studentRecords, (d) => d.name == currentStudent)
            .map((d) => {
                if (!dateFilterActive) { d.mark = false; }
                else { d.mark = moment(d.date, 'YYYY-MM-DD').isAfter(moment(startDate, 'MM/DD/YYYY')) && moment(d.date, 'YYYY-MM-DD').isBefore(moment(endDate, 'MM/DD/YYYY')) }
                return d;
            });

        currentStudentRecords = _.map(currentStudentRecords, (d) => {
            d.rotationMark = (d.rotation == currentRotation);
            return d;
        })


        return (
            <div className='dashboard-root-resident m-t ug-student-dashboard' >
                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div className='m-t-md'>
                        <UGStudentFilterPanel
                            studentList={studentList}
                            currentStudent={currentStudent}
                            rotationList={rotationList}
                            currentRotation={currentRotation}
                            dateFilterActive={dateFilterActive}
                            showUncommencedEPA={showUncommencedEPA}
                            onCheckboxChange={this.onDateFilterToggle}
                            showUncommencedEPAToggle={this.showUncommencedEPAToggle}
                            onStudentSelect={this.onStudentSelect}
                            onRotationSelect={this.onRotationSelect}
                            onSubmit={this.onSubmit} />
                        {currentStudent != '' &&
                            <UGGraphGroup
                                currentRotation={currentRotation}
                                showUncommencedEPA={showUncommencedEPA}
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
        programInfo: state.oracle.programInfo ? state.oracle.programInfo : {},
        userType: state.oracle.userDetails.accessType,
        username: state.oracle.userDetails.username
    };
}

export default connect(mapStateToProps, null)(UGStudentDashboard);










