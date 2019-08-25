/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleCCEditModal } from '../../redux/actions/actions';

class CCFeedbackModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            session: '',
            feedback: '',
            meetingDate: '',
            wasPromoted: false,
            promotedStage: '',
            loaderState: false
        };
        // this.onChange = this.onChange.bind(this);
        // this.onSelect = this.onSelect.bind(this);
        // this.togglePromoted = this.toggleVisibility.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    closeModal(event) {
        event.preventDefault();
        this.props.actions.toggleCCEditModal();
    }

    togglePromoted(selectedOption) {
        // this.setState({ selectedRotation: selectedOption.value });
    }

    onChange(event) {
        event.preventDefault();
        // this.setState({ isVisible: !this.state.isVisible });
    }



    render() {

        const { year, session, feedback, meetingDate, wasPromoted, promotedStage, loaderState } = this.state;

        return (
            <div className='cc-modal-root'>
                <div className='modal-main admin-root'>
                    <button type="button" className="close" onClick={this.closeModal}>
                        <span>×</span>
                    </button>
                    <form className='col-xs-12 admin-inner-container'>
                        <h3 className='m-l m-b-md m-t-0'>Edit Competence Committee Feedback</h3>
                        <div className="input-group m-a">
                            <span className='inner-span'>SELECT YEAR</span>
                            <select id='select-access-type' name="accessType" className='custom-select' value={''} onChange={this.onChange}>
                                <option value='1' >PG Year 1</option>
                                <option value='2' >PG Year 2</option>
                                <option value='3' >PG Year 3</option>
                                <option value='4' >PG Year 4</option>
                                <option value='5' >PG Year 5</option>
                            </select>
                        </div>

                        <div className="input-group m-a">
                            <span className='inner-span'>SELECT MEETING</span>
                            <select id='select-access-type' name="accessType" className='custom-select' value={''} onChange={this.onChange}>
                                <option value='1' >Session 1</option>
                                <option value='2' >Session 2</option>
                                <option value='3' >Session 3</option>
                                <option value='4' >Session 4</option>
                            </select>
                        </div>

                        <div className="input-group m-a">
                            <span className='inner-span'>MEETING DATE</span>
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <span className="icon icon-calendar"></span>
                                </span>
                                <input type="text" id='programStartDate' defaultValue={''} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>

                        <div className="input-group m-a">
                            <span className='inner-span' style={{ verticalAlign: 'top' }}>FEEDBACK</span>
                            <textarea id="story" name="story" rows="10" cols="50" />
                        </div>

                        <button className={"btn btn-success-outline m-l"} type="submit" onClick={this.onSubmit}>
                            <span className='create-span'>{"UPDATE"} </span>
                            {loaderState && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                        </button>
                        <button className={"btn btn-danger-outline m-l"} onClick={this.closeModal}>
                            <span className='create-span'>{"CLOSE"} </span>
                        </button>
                    </form>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ toggleCCEditModal }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CCFeedbackModal);






