import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllData, getUser } from '../../../utils/requestServer';
import Loading from 'react-loading';
import UGStudentFilterPanel from '../UGStudentFilterPanel';
import UGGraphGroup from '../UGGraphGroup';
import UGNormativePanel from './UGNormativePanel';
import UGInfoPanel from './UGInfoPanel';
import moment from 'moment';

class UGStudentDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            studentRecords: [],
            rawDump: [],
            studentList: [],
            startDate: '',
            endDate: '',
            dateFilterActive: false,
            showUncommencedEPA: false,
            currentStudent: '',
            currentRotation: '',
            isStudentInfoLoaderVisible: false,
            studentInfo: null
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
        const { studentList } = this.state, currentStudent = option.value;
        // set currentStudent name 
        this.setState({ currentStudent: option.value });
        // then check if its valid, then turn on loader fetch the students details
        if (currentStudent != '') {
            this.setState({ isStudentInfoLoaderVisible: true });
            // Get nsid of the student from his records
            const username = _.find(studentList, (d) => d.name == option.value).records[0].nsid;
            // get users rotation schedule and other related information
            getUser(username)
                .then((studentData) => {
                    const { currentPhase = '', programStartDate,
                        rotationSchedule = {}, longitudinalSchedule = {} } = studentData;
                    // set information of the selected student onto the state
                    this.setState({
                        'isStudentInfoLoaderVisible': false,
                        'studentInfo': {
                            currentPhase,
                            rotationSchedule,
                            longitudinalSchedule,
                            programStartDate
                        }
                    })
                })
                .catch(() => {
                    this.setState({ isStudentInfoLoaderVisible: false, studentInfo: null })
                });
        };
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

                // store raw dump before filtering for normative dashboard
                let rawDump = _.clone(studentRecords);

                if (accessType == 'resident') {
                    studentRecords = _.filter(studentRecords, (d) => d.nsid == username);
                }

                const studentList = _.map(_.groupBy(studentRecords, (d) => d.nsid), (records, nsid) => {
                    return { name: records[0].name, records };
                }).sort((a, b) => a.name.localeCompare(b.name));

                // filter out records that dont have rotation and phase tag on them or are expired
                this._isMounted && this.setState({
                    studentList,
                    studentRecords,
                    rawDump
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
        const { studentList, currentStudent, dateFilterActive,
            currentRotation, isStudentInfoLoaderVisible, showUncommencedEPA,
            startDate, endDate, studentRecords, rawDump, studentInfo = false } = this.state;

        const { accessType = 'resident', programInfo } = this.props,
            { rotationList } = programInfo;

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
                        {accessType != 'resident' && rawDump.length > 0 &&
                            <UGNormativePanel
                                onStudentSelect={this.onStudentSelect}
                                currentStudent={currentStudent}
                                // normalise extra width
                                width={width + 65}
                                rawDump={rawDump} />}

                        {isStudentInfoLoaderVisible ?
                            <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                            <div>
                                {currentStudent != '' && !!studentInfo &&
                                    <UGInfoPanel
                                        width={width}
                                        studentInfo={studentInfo}
                                        programInfo={programInfo}
                                        studentRecords={currentStudentRecords} />}
                                {currentStudent != '' &&
                                    <UGGraphGroup
                                        currentRotation={currentRotation}
                                        showUncommencedEPA={showUncommencedEPA}
                                        width={width}
                                        studentRecords={currentStudentRecords} />}
                            </div>}
                    </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        //  can be null occasionally so better to check and set it
        programInfo: state.oracle.programInfo ? state.oracle.programInfo : {},
        accessType: state.oracle.userDetails.accessType,
        username: state.oracle.userDetails.username
    };
}

export default connect(mapStateToProps, null)(UGStudentDashboard);










