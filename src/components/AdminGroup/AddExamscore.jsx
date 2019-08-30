import React, { Component } from 'react';
import Loading from 'react-loading';
import toastr from '../../utils/toastr';
import { getResidentList, updateExamscore } from '../../utils/requestServer';
import { ROTATION_SCHEDULE_MAP } from '../../utils/programInfo';
import { RadioButton } from '../';

const possibleAcademicYears = _.keys(ROTATION_SCHEDULE_MAP);

export default class AddExamscore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderState: true,
            innerLoaderState: false,
            deleteLoaderState: false,
            userList: [],
            selectedUserIndex: 0,
            username: '',
            academicYear: '2019',
            oralExamScore: {},
            citeExamScore: {},
            activeEdit: 'written',
            scoreOption: '',
            narrative: '',
            scoreValue: '',
            addModeOn: false
        }
        this.onSelectUsername = this.onSelectUsername.bind(this);
        this.submitWrittenScores = this.submitWrittenScores.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onWrittenScoreChange = this.onWrittenScoreChange.bind(this);
        this.onSelectScore = this.onSelectScore.bind(this);

        this.onOralSubmit = this.onOralSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        // get list of non graduated residents
        getResidentList(true)
            .then((users) => { this.setState({ userList: [...users] }) })
            .finally(() => { this.setState({ loaderState: false }) });
    }

    onSelectUsername(event) {
        if (event.target.value != 'user-0') {
            let { userList } = this.state,
                selectedUserIndex = event.target.value.split("-")[1],
                user = userList[selectedUserIndex - 1],
                citeExamScore = user.citeExamScore || {},
                oralExamScore = user.oralExamScore || {};

            this.setState({
                selectedUserIndex,
                username: user.username,
                citeExamScore,
                oralExamScore,
                scoreOption: '',
                scoreValue: '',
                narrative: '',
                addModeOn: false
            });
        }
    }

    onChange(event) {
        this.setState({ [event.target.id.split('-')[1]]: event.target.value })
    }

    onWrittenScoreChange(event) {
        const { academicYear, citeExamScore } = this.state;
        citeExamScore[academicYear] = event.target.value;
        this.setState({ citeExamScore });
    }


    submitWrittenScores(event) {
        event.preventDefault();
        let { username, userList, citeExamScore, oralExamScore } = this.state;
        // only if a user is selected
        if (username.length > 0) {
            updateExamscore(username, citeExamScore, oralExamScore)
                .then((examScores) => {
                    citeExamScore = examScores.citeExamScore;
                    oralExamScore = examScores.oralExamScore;
                    userList[selectedUserIndex - 1].citeExamScore = citeExamScore;
                    userList[selectedUserIndex - 1].oralExamScore = oralExamScore;
                    // reset form values
                    this.setState({ userList, citeExamScore, oralExamScore })
                })
                // toggle loader once request is completed
                .finally(() => {
                    this.setState({ innerLoaderState: false });
                });
        }
        else {
            toastr["error"]("Please select a resident to update", "UPDATE ERROR");
        }
    }


    onSelectScore(event) {
        const scoreOption = event.target.value, { academicYear, oralExamScore = {} } = this.state;

        if (scoreOption != 'score-select') {
            if (scoreOption == 'score-add') {
                this.setState({
                    scoreOption,
                    scoreValue: '',
                    narrative: '',
                    addModeOn: true
                });
            }
            else {
                const oralScoreValues = oralExamScore[academicYear] || [],
                    datapoint = oralScoreValues[scoreOption.split("-")[1]] || {};

                this.setState({
                    scoreOption,
                    scoreValue: datapoint.value || '',
                    narrative: datapoint.narrative || '',
                    addModeOn: false
                });
            }
        }
    }



    onOralSubmit(event) {
        event.preventDefault();
        let { username, scoreOption, addModeOn,
            academicYear, oralExamScore, citeExamScore,
            narrative, scoreValue, userList, selectedUserIndex } = this.state;

        const oralScoreValues = oralExamScore[academicYear] || [];

        if (username && scoreValue) {
            // set the narrative and values in the list and 
            // then copy the list into the score object
            if (addModeOn) {
                oralScoreValues.push({ narrative, 'value': scoreValue });
            }
            else {
                let indexOfModifiedItem = +scoreOption.split('-')[1];
                oralScoreValues[indexOfModifiedItem] = { narrative, 'value': scoreValue };
            }

            oralExamScore[academicYear] = oralScoreValues;
            // turn the loader on
            this.setState({ innerLoaderState: true });

            updateExamscore(username, citeExamScore, oralExamScore)
                .then((examScores) => {
                    citeExamScore = examScores.citeExamScore;
                    oralExamScore = examScores.oralExamScore;
                    userList[selectedUserIndex - 1].citeExamScore = citeExamScore;
                    userList[selectedUserIndex - 1].oralExamScore = oralExamScore;
                    // reset form values
                    this.setState({
                        userList,
                        citeExamScore,
                        oralExamScore,
                        narrative: '',
                        scoreValue: '',
                        scoreOption: '',
                        addModeOn: false
                    })
                })
                // toggle loader once request is completed
                .finally(() => { this.setState({ innerLoaderState: false }) });
        }
        else {
            toastr["error"]("Please select a resident and an oral score value", "ERROR");
        }
    }


    onDelete(event) {
        event.preventDefault();
        let { username, scoreOption, selectedUserIndex,
            academicYear, oralExamScore, citeExamScore, userList } = this.state;

        const oralScoreValues = oralExamScore[academicYear] || [];

        if (username && scoreOption && scoreOption != 'score-add' || scoreOption != 'score-select') {
            //    splice that element out of the list
            let indexOfDeletedItem = +scoreOption.split('-')[1];
            // splice deletes value in place 
            oralScoreValues.splice(indexOfDeletedItem, 1);
            oralExamScore[academicYear] = oralScoreValues;
            // turn the loader on
            this.setState({ deleteLoaderState: true });

            updateExamscore(username, citeExamScore, oralExamScore)
                .then((examScores) => {
                    citeExamScore = examScores.citeExamScore;
                    oralExamScore = examScores.oralExamScore;
                    userList[selectedUserIndex - 1].citeExamScore = citeExamScore;
                    userList[selectedUserIndex - 1].oralExamScore = oralExamScore;
                    // reset form values
                    this.setState({
                        userList,
                        citeExamScore,
                        oralExamScore,
                        narrative: '',
                        scoreValue: '',
                        scoreOption: '',
                        addModeOn: false
                    })
                })
                // toggle loader once request is completed
                .finally(() => { this.setState({ innerLoaderState: false }) });
        }
    }


    render() {
        let { loaderState, innerLoaderState, deleteLoaderState,
            userList, scoreOption, scoreValue,
            academicYear, citeExamScore, oralExamScore, activeEdit,
            narrative, selectedUserIndex, addModeOn
        } = this.state;

        // Sort the residents alphabetically so that they are easier to look up
        userList.sort((previous, current) => previous.fullname.localeCompare(current.fullname));

        const writtenScoreValues = citeExamScore[academicYear] || '';
        const oralScoreValues = oralExamScore[academicYear] || [];

        return (
            <div className='add-data-root m-t' >
                {
                    loaderState ?
                        <Loading className='loader-modify' type='spin' height='100px' width='100px' color='#d6e5ff' delay={-1} /> :

                        <form className='col-xs-12 admin-inner-container'>

                            <div className="input-group m-a">
                                <span className='inner-span'>RESIDENT NSID</span>
                                <select name="username" className='custom-select' value={'user-' + selectedUserIndex} onChange={this.onSelectUsername}>
                                    <option key={'user-default'} value={'user-0'} >{'Select NSID'}</option>
                                    {userList.map((user, index) => <option key={'user-' + (index + 1)} value={'user-' + (index + 1)} >{user.fullname} - {user.username}</option>)}
                                </select>
                            </div>

                            <div className="input-group m-a">
                                <span className='inner-span'>ACADEMIC YEAR</span>
                                <select id='select-academicYear' name="academicYear" className='custom-select' value={academicYear} onChange={this.onChange}>
                                    {_.map(possibleAcademicYears, (year => { return <option key={'year-' + year} value={year}>{year}-{+year + 1}</option> }))}
                                </select>
                            </div>


                            <div className="input-group m-a">
                                <span className='inner-span'>WHAT DO YOU WANT TO EDIT</span>
                                <div className='radio-button-container'>
                                    <RadioButton value={'written'} id={'radio_written-activeEdit'} className='track-radio' name='track-select'
                                        label={"Written Exam Scores"}
                                        onChange={this.onChange}
                                        checked={activeEdit == 'written'} />
                                    <RadioButton value={'oral'} id={'radio_oral-activeEdit'} className='track-radio' name='track-select'
                                        label={"Oral Exam Scores"}
                                        onChange={this.onChange}
                                        checked={activeEdit == 'oral'} />
                                </div>
                            </div>

                            {activeEdit == 'written' ?
                                <div>
                                    <div className="input-group m-a">
                                        <span className='inner-span'>WRITTEN EXAM SCORE</span>
                                        <input type="text" className="form-control" name="citeExamScore"
                                            value={writtenScoreValues} placeholder="Comma Separated Value"
                                            onChange={this.onWrittenScoreChange} />
                                    </div>
                                    <button className={"btn btn-success-outline create-btn m-l"} type="submit" onClick={this.submitWrittenScores}>
                                        <span className='create-span'>UPDATE</span>
                                        {innerLoaderState && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                                    </button>
                                </div>
                                :
                                <div>
                                    <p className='text-info m-a banner'>Oral Exam scores have narrative comments associated with them and so need to be set one at a time. </p>
                                    <p className='text-info m-a banner'>If you want to add a new score, Select <b>Add New Score</b> from the dropdown then set the score value and the corresponding comment.<br />Finally click the <b>Add</b> button when you are done.  </p>
                                    <p className='text-info m-a banner'> If you want to remove or edit a previous score select it from the dropdown and click the corresponding button. </p>

                                    <div className="input-group m-a">
                                        <span className='inner-span'>SCORE LIST</span>
                                        <select name="score-select" className='custom-select' value={scoreOption} onChange={this.onSelectScore}>
                                            <option key={'score-select'} value={'score-select'} >{'Select Score'}</option>
                                            {oralScoreValues.map((point, index) => <option key={'score-' + (index)} value={'score-' + (index)} >{point.value}</option>)}
                                            <option style={{ background: '#67bb67' }} key={'score-add'} value={'score-add'} >{'Add New Score'}</option>
                                        </select>
                                    </div>

                                    {scoreOption.length > 0 &&
                                        <div>
                                            <div className="input-group m-a">
                                                <span className='inner-span'>ORAL SCORE VALUE</span>
                                                <input type="text" className="form-control" id="oral-scoreValue"
                                                    value={scoreValue} placeholder="Set a value between 0-100"
                                                    onChange={this.onChange} />
                                            </div>

                                            <div className="input-group m-a">
                                                <span className='inner-span' style={{ verticalAlign: 'top' }}>NARRATIVE</span>
                                                <textarea style={{ color: 'black' }} onChange={this.onChange}
                                                    id="oral-narrative" rows="10" cols="50" value={narrative} />
                                            </div>

                                            <button className={"btn btn-success-outline create-btn m-l"} type="submit" onClick={this.onOralSubmit}>
                                                <span className='create-span'>{addModeOn ? "ADD" : "UPDATE"} </span>
                                                {innerLoaderState && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                                            </button>
                                            {!addModeOn &&
                                                <button className={"btn btn-danger-outline  create-btn m-l"} type="submit" onClick={this.onDelete}>
                                                    <span className='create-span'>DELETE </span>
                                                    {deleteLoaderState && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                                                </button>}
                                        </div>}

                                </div>}
                        </form>
                }
            </div>
        );
    }
}

