import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecordsByYear, getUser, getAllUsers,setUGRecords } from '../../../utils/requestServer';
import processUGRecords from '../../../utils/processUGRecords';
import Loading from 'react-loading';
import UGStudentFilterPanel from '../UGStudentFilterPanel';
import UGGraphGroup from '../UGGraphGroup';
import UGNormativePanel from './UGNormativePanel';
import UGInfoPanel from './UGInfoPanel';
import downloadCSV from '../../../utils/downloadCSV';
import moment from 'moment';
import _ from 'lodash';
const possibleCohorts = ["2025","2026","2027"];


class UGStudentDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cohort: '2025',
            isLoaderVisible: false,
            availableAcademicYearsInData: [],
            studentRecords: [],
            groupedByYear: [],
            studentList: [],
            startDate: '',
            endDate: '',
            dateFilterActive: false,
            showUncommencedEPA: true,
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
        this.exportSelectedData = this.exportSelectedData.bind(this);
    }

    getRecords = (event) => {


        event.preventDefault();
        let { cohort } = this.state;
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });


        // var list = [];
        // var urls = ["epa1","epa1h","epa2","epa2h","epa3","epa3h","epa4","epa4h","epa5","epa5h",
        //     "epa6","epa6h","epa7","epa7h","epa8","epa8h","epa9","epa9h","epa10","epa10h","epa11","epa11h","epa12","epa12h","epa13"];
        // var epaDataList = [];

        // urls.forEach(function(url, i) { list.push(fetch(`/assets/files/`+url+`.csv`))});

        // Promise
        //   .all(list)
        //   .then(results => Promise.all(results.map(result=> result.text())))
        //     .then((fileDataList) => {
        //         fileDataList.forEach((fileData, i) => {

        //             let localdata = CSVToArray(fileData);

        //             let referenceColumns = localdata[0];

        //             let pendingData = localdata.slice(1);

        //             let processedData = pendingData.map((d) => {
        //                 let store = {};
        //                 referenceColumns.forEach((column, i) => {
        //                     store[column] = d[i];
        //                 });
        //                 return store;
        //             });
        //             epaDataList = epaDataList.concat(processedData);
        //         });

        //         let processedData = epaDataList.map((d) => {

        //             let handoverAssessor = d["Name of assessor completing this form:"] || d["Name of assessor completing this EPA form:"];
        //             let observerName = handoverAssessor? handoverAssessor: d["Evaluator first name"]+" "+(d["Evaluator middle name"]?d["Evaluator middle name"]+" ":"")+d["Evaluator last name"];

        //             let patientType = d["Patient Type:"];
        //             let admissionType = d["Admission Type:"];

        //             let handoverType = d["Handover type:"];

        //             let feedback = d["Narrative feedback to the learner (include any concerns about professionalism):"];

        //             feedback = handoverType? "Handover Type: " + handoverType + ", Feedback: " + feedback: feedback;

        //             return {
        //                     "epa": String(Number(d["Form name"].slice(19,21))),
        //                     "resident_name": d["Target first name"]+" "+(d["Target middle name"]?d["Target middle name"]+" ":"")+d["Target last name"],
        //                     "username": d["Target email"].split("@")[0].trim().toLocaleLowerCase(),
        //                     "observer_name": observerName,
        //                     "observation_date": moment(d["Evaluation completed date"],'DD-MMM-YYYY').format('YYYY-MM-DD'),
        //                     "observer_type": "",
        //                     "year_tag": d["Target grad year"],
        //                     "rating": d["Observation Rating: (Numerical Answer)"],
        //                     "rotationTag": d["Rotation / course:"].trim().toLocaleLowerCase(),
        //                     "feedback": feedback,
        //                     // patient type is rewritten under situation_context
        //                     "situation_context": (patientType?patientType:'').toLocaleLowerCase().trim(),
        //                         // admission type is rewritten under professionalism_safety
        //                     "professionalism_safety": (admissionType?admissionType:'').toLocaleLowerCase().trim(),
        //                     "type": "app",
        //                     "isExpired": false,
        //                     "phaseTag": "",
        //                     "program": "UNDERGRADUATE",
        //             }
        //         });
        //         setUGRecords(processedData);
        //     })


            getRecordsByYear(cohort)
            .then((data) => {
                    let studentRecords = processUGRecords(data);
                // store raw dump before filtering for normative dashboard
                let groupedByYear = _.groupBy(studentRecords, (d) => d.academicYear),
                    availableAcademicYearsInData = _.keys(groupedByYear).sort((a, b) => b - a);

                const studentList = _.map(_.groupBy(studentRecords, (d) => d.nsid),
                    (records) => ({ name: records[0].name, nsid: records[0].nsid, records }))
                    .sort((a, b) => a.name.localeCompare(b.name));

                // set records and raw dump on the state 
                this._isMounted && this.setState({
                    studentList,
                    studentRecords,
                    groupedByYear,
                    availableAcademicYearsInData
                });
            })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching records"); })
            .finally(() => {
                this._isMounted && this.setState({ isLoaderVisible: false });
            });
    }

    onRotationSelect = (option) => { this.setState({ currentRotation: option.value }) }
    onCohortSelect = (event) => { this.setState({ 'cohort': event.target.value }) }
    onDateFilterToggle() { this.setState({ dateFilterActive: !this.state.dateFilterActive }) }
    showUncommencedEPAToggle() { this.setState({ showUncommencedEPA: !this.state.showUncommencedEPA }) }


    onSubmit() {
        const startDate = document.getElementById('student-filter-startDate') && document.getElementById('student-filter-startDate').value;
        const endDate = document.getElementById('student-filter-endDate') && document.getElementById('student-filter-endDate').value;
        this.setState({ startDate, endDate });
    }

    exportSelectedData () {
        const { studentRecords, currentStudent } = this.state;
        let selectedStudentRecords = _.filter(studentRecords, (d) => d.nsid == currentStudent);
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Date,Resident Name,Rotation,EPA,Rating,Observer,Feedback,Admission Type,Patient Type\n";
        selectedStudentRecords.forEach(function (record) {
            csvContent += record.date + "," + record.name + "," + record.rotation + "," + record.epa + "," + record.rating + "," + record.observer_name + "," + record.feedback + "," + record.admission_type + "," + record.patient_type + "\n";
        });
        
        window.emCBD = {
            'rcmData': _.map(selectedStudentRecords, (_r) => {
                return [_r.date, _r.name, _r.rotation, _r.epa, _r.rating, _r.observer_name, _r.feedback, _r.patient_type, _r.admission_type];
            })
        };
        downloadCSV(['Date', 'Resident Name', 'Rotation', 'EPA', 'Rating', 'Observer', 'Feedback', 'Patient Type', 'Admission Type']);

    }

    onStudentSelect(option) {
        const { studentList } = this.state, currentStudent = option.nsid;
        // set currentStudent name 
        this.setState({ currentStudent });
        // then check if its valid, then turn on loader fetch the students details
        if (currentStudent != '') {
            this.setState({ isStudentInfoLoaderVisible: true });
            // Get nsid of the student from his records
            // get users rotation schedule and other related information
            getUser(currentStudent)
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

    // prevent heavy operations when umnounted
    componentDidMount() { this._isMounted = true }
    componentWillUnmount() { this._isMounted = false }

    render() {
        const { studentList, currentStudent,
            dateFilterActive, currentRotation,
            isStudentInfoLoaderVisible, showUncommencedEPA,
            startDate, endDate, studentRecords, availableAcademicYearsInData,
            groupedByYear, studentInfo = false } = this.state;

        const { accessType = 'resident', programInfo } = this.props,
            rotationList = _.keys(_.groupBy(studentRecords, d => d.rotation));

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let width = document.body.getBoundingClientRect().width - 125;

        let currentStudentRecords = _.filter(studentRecords, (d) => d.nsid == currentStudent) || [];

        currentStudentRecords.map((d) => {
            if (!dateFilterActive) { d.mark = false }
            else {
                d.mark = moment(d.date, 'YYYY-MM-DD')
                    .isAfter(moment(startDate, 'MM/DD/YYYY')) &&
                    moment(d.date, 'YYYY-MM-DD').isBefore(moment(endDate, 'MM/DD/YYYY'))
            }
            return d;
        });

        currentStudentRecords = _.map(currentStudentRecords, (d) => {
            d.rotationMark = (d.rotation == currentRotation);
            return d;
        })

        const { cohort = '' } = this.state;

        return (
            <div className='dashboard-root-resident m-t ug-student-dashboard' >
                <div className='filter-panel m-b-0'>
                    <div className="advanced-filter-box" style={{ width: '455px' }}>
                        <span className='inner-span m-r'>SELECT STUDENT COHORT</span>
                        <select name="yearTag" className='custom-select' value={cohort} onChange={this.onCohortSelect}>
                            {possibleCohorts.map((cohort, index) =>
                                <option key={'cohort-' + (index + 1)} value={cohort}>
                                    {cohort}
                                </option>)}
                        </select>
                        <button type="submit" className="m-l filter-button btn btn-primary-outline" onClick={this.getRecords}>
                            GET RECORDS
                        </button>
                    </div>
                </div>
                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div>
                        {studentRecords.length > 0 && <div>
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

                            {accessType != 'resident' && availableAcademicYearsInData.length > 0 &&
                                <div>{_.map(availableAcademicYearsInData, (academicYear) =>
                                    <UGNormativePanel
                                        academicYear={academicYear}
                                        onStudentSelect={this.onStudentSelect}
                                        currentStudent={currentStudent}
                                        // normalise extra width
                                        width={width + 65}
                                        recordData={groupedByYear[academicYear]} />)}</div>}

                            {isStudentInfoLoaderVisible ?
                                <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                                <div>
                                    {/* {currentStudent != '' && !!studentInfo &&
                                        <UGInfoPanel
                                            width={width}
                                            studentInfo={studentInfo}
                                            programInfo={programInfo}
                                            studentRecords={currentStudentRecords} />} */}

                                            {currentStudent != '' && <div className='text-right'>
                                                <p className='m-r-md'>* All the data corresponding to the selected student can be downloaded using the button below in a spreadsheet format</p>
                                                <button className="btn btn-primary-outline m-r-md" onClick={this.exportSelectedData}>Download Student Data</button>
                                                </div>}
                                    {currentStudent != '' &&
                                        <UGGraphGroup
                                            currentRotation={currentRotation}
                                            showUncommencedEPA={showUncommencedEPA}
                                            width={width}
                                            studentRecords={currentStudentRecords} />}
                                </div>}
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

function CSVToArray(CSV_string, delimiter) {
    delimiter = (delimiter || ","); // user-supplied delimeter or default comma

    var pattern = new RegExp( // regular expression to parse the CSV values.
        ( // Delimiters:
            "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + delimiter + "\\r\\n]*))"
        ), "gi"
    );

    var rows = [
        []
    ]; // array to hold our data. First row is column headers.
    // array to hold our individual pattern matching groups:
    var matches = false; // false if we don't find any matches
    // Loop until we no longer find a regular expression match
    while (matches = pattern.exec(CSV_string)) {
        var matched_delimiter = matches[1]; // Get the matched delimiter
        // Check if the delimiter has a length (and is not the start of string)
        // and if it matches field delimiter. If not, it is a row delimiter.
        if (matched_delimiter.length && matched_delimiter !== delimiter) {
            // Since this is a new row of data, add an empty row to the array.
            rows.push([]);
        }
        var matched_value;
        // Once we have eliminated the delimiter, check to see
        // what kind of value was captured (quoted or unquoted):
        if (matches[2]) { // found quoted value. unescape any double quotes.
            matched_value = matches[2].replace(
                new RegExp("\"\"", "g"), "\""
            );
        } else { // found a non-quoted value
            matched_value = matches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        rows[rows.length - 1].push(matched_value);
    }
    return rows; // Return the parsed data Array
}