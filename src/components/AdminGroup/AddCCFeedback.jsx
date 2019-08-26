import React, { Component } from 'react';
import Loading from 'react-loading';
import toastr from '../../utils/toastr';
import { getResidentList, updateCCFeedbackList } from '../../utils/requestServer';

export default class AddCCFeedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaderState: true,
            innerLoaderState: false,
            deleteLoaderState: false,
            userList: [],
            selectedIndex: 0,
            username: '',
            ccFeedbackList: [],
            meetingDate: '',
            feedback: '',
            rating: '',
            meetingOption: '',
            addModeOn: false
        }
        this.onSelectUsername = this.onSelectUsername.bind(this);
        this.onSelectMeeting = this.onSelectMeeting.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
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
                selectedIndex = event.target.value.split("-")[1],
                user = userList[selectedIndex - 1],
                ccFeedbackList = user.ccFeedbackList || [];
            this.setState({
                selectedIndex, username: user.username,
                ccFeedbackList, meetingOption: '',
                meetingDate: '',
                feedback: '',
                rating: '',
                meetingOption: '',
                addModeOn: false
            });
        }
    }

    onSelectMeeting(event) {
        const meetingOption = event.target.value;
        if (meetingOption != 'meeting-select') {
            if (meetingOption == 'meeting-add') {
                this.setState({
                    meetingOption,
                    meetingDate: '',
                    feedback: '',
                    rating: '',
                    addModeOn: true
                });
            }
            else {
                const datapoint = this.state.ccFeedbackList[meetingOption.split("-")[1]] || {};
                this.setState({
                    meetingOption,
                    meetingDate: datapoint.meetingDate || '',
                    feedback: datapoint.feedback || '',
                    rating: datapoint.rating || '',
                    addModeOn: false
                });
            }
        }
    }

    onSubmit(event) {
        event.preventDefault();
        let { meetingDate, feedback, rating, addModeOn, meetingOption,
            ccFeedbackList, username, userList, selectedIndex } = this.state;
        meetingDate = document.getElementById('input-meetingDate').value;

        if (username && meetingDate && rating) {

            if (addModeOn) {

                ccFeedbackList.push({ feedback, meetingDate, rating });
                this.setState({ innerLoaderState: true });

                updateCCFeedbackList(username, ccFeedbackList)
                    .then((updatedList) => {
                        userList[selectedIndex - 1].ccFeedbackList = updatedList;
                        // reset form values
                        this.setState({
                            userList,
                            ccFeedbackList: updatedList,
                            meetingDate: '',
                            feedback: '',
                            rating: '',
                            meetingOption: '',
                            addModeOn: false
                        })
                    })
                    // toggle loader once request is completed
                    .finally(() => {
                        this.setState({ innerLoaderState: false });
                    });
            }

            else {
                let indexOfModifiedItem = +meetingOption.split('-')[1];
                // splice deletes value in place 
                ccFeedbackList[indexOfModifiedItem] = { feedback, meetingDate, rating };

                this.setState({ innerLoaderState: true });

                updateCCFeedbackList(username, ccFeedbackList)
                    .then((updatedList) => {
                        userList[selectedIndex - 1].ccFeedbackList = updatedList;
                        // reset form values
                        this.setState({
                            userList,
                            ccFeedbackList: updatedList,
                            meetingDate: '',
                            feedback: '',
                            rating: '',
                            meetingOption: '',
                            addModeOn: false
                        })
                    })
                    // toggle loader once request is completed
                    .finally(() => {
                        this.setState({ innerLoaderState: false });
                    });
            }

        }
        else {
            toastr["error"]("Resident/Rating/Meeting Date Missing", "UPDATE ERROR");
        }
    }


    onDelete(event) {

        event.preventDefault();

        let { meetingOption, ccFeedbackList, username, userList, selectedIndex } = this.state;
        if (meetingOption && meetingOption !== 'meeting-select' && meetingOption !== 'meeting-add') {
            let indexOfDeletedItem = +meetingOption.split('-')[1];
            // splice deletes value in place 
            ccFeedbackList.splice(indexOfDeletedItem, 1);

            this.setState({ deleteLoaderState: true });

            updateCCFeedbackList(username, ccFeedbackList)
                .then((updatedList) => {
                    userList[selectedIndex - 1].ccFeedbackList = updatedList;
                    // reset form values
                    this.setState({
                        userList,
                        ccFeedbackList: updatedList,
                        meetingDate: '',
                        feedback: '',
                        rating: '',
                        meetingOption: '',
                        addModeOn: false
                    })
                })
                // toggle loader once request is completed
                .finally(() => {
                    this.setState({ deleteLoaderState: false });
                });
        }
    }

    onChange(event) {
        // the on change for date is not fired but when the user edits the next 
        // tag in line we can pick the date by id and set it to state
        const meetingDate = document.getElementById('input-meetingDate').value;
        this.setState({ [event.target.id.split('-')[1]]: event.target.value, meetingDate })
    }

    render() {
        let { feedback, loaderState, userList,
            rating, innerLoaderState, deleteLoaderState,
            ccFeedbackList, selectedIndex, meetingOption,
            addModeOn, meetingDate } = this.state;

        // Sort the residents alphabetically so that they are easier to look up
        userList.sort((previous, current) => previous.fullname.localeCompare(current.fullname));

        return (
            <div className='add-data-root m-t' >
                {
                    loaderState ?
                        <Loading className='loader-modify' type='spin' height='100px' width='100px' color='#d6e5ff' delay={-1} /> :

                        <form className='col-xs-12 admin-inner-container'>

                            <div className="input-group m-a">
                                <span className='inner-span'>RESIDENT NSID</span>
                                <select name="username" className='custom-select' value={'user-' + selectedIndex} onChange={this.onSelectUsername}>
                                    <option key={'user-default'} value={'user-0'} >{'Select NSID'}</option>
                                    {userList.map((user, index) => <option key={'user-' + (index + 1)} value={'user-' + (index + 1)} >{user.fullname} - {user.username}</option>)}
                                </select>
                            </div>

                            <div className="input-group m-a">
                                <span className='inner-span'>MEETING</span>
                                <select name="username" className='custom-select' value={meetingOption} onChange={this.onSelectMeeting}>
                                    <option key={'meeting-select'} value={'meeting-select'} >{'Select Meeting'}</option>
                                    <option style={{ background: '#67bb67' }} key={'meeting-add'} value={'meeting-add'} >{'Add New'}</option>
                                    {ccFeedbackList.map((point, index) => <option key={'meeting-' + (index)} value={'meeting-' + (index)} >{point.meetingDate}</option>)}
                                </select>
                            </div>

                            <div className="input-group m-a">
                                <span className='inner-span'>MEETING DATE</span>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <span className="icon icon-calendar"></span>
                                    </span>
                                    <input type="text" id='input-meetingDate' style={{ width: '210px' }} onChange={this.onChange} value={meetingDate} className="form-control" data-provide="datepicker" />
                                </div>
                            </div>

                            <div className="input-group m-a">
                                <span className='inner-span'>SELECT RATING</span>
                                <select id='select-rating' name="rating" className='custom-select' value={rating} onChange={this.onChange}>
                                    <option key={'rating-select'} value={''} >{'Select Rating'}</option>
                                    <option value='Accelerated'>Accelerated</option>
                                    <option value='As Expected'>As Expected</option>
                                    <option value='Not as Expected' >Not as Expected</option>
                                    <option value='Not Progressing' >Not Progressing</option>
                                    <option value='Inactive' >Inactive</option>
                                </select>
                            </div>

                            <div className="input-group m-a">
                                <span className='inner-span' style={{ verticalAlign: 'top' }}>FEEDBACK</span>
                                <textarea style={{ color: 'black' }} onChange={this.onChange} id="meeting-feedback" name="meeting-feedback" rows="10" cols="50" value={feedback} />
                            </div>

                            <button className={"btn btn-success-outline create-btn m-l"} type="submit" onClick={this.onSubmit}>
                                <span className='create-span'>{addModeOn ? "ADD" : "UPDATE"} </span>
                                {innerLoaderState && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                            </button>
                            {!addModeOn &&
                                <button className={"btn btn-danger-outline  create-btn m-l"} type="submit" onClick={this.onDelete}>
                                    <span className='create-span'>DELETE </span>
                                    {deleteLoaderState && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                                </button>}
                        </form>
                }
            </div>
        );
    }
}

