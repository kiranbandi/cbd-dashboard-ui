/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { PROGRAM_INFO } from '../utils/programInfo';
import { CARDS_LIST } from '../utils/programInfo';
import ReactSelect from 'react-select';

const rotationScheduleMap = PROGRAM_INFO.EM.rotationScheduleMap;

class InfoCardsPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRotation: '',
            isVisible: false
        };
        this.onSelectRotation = this.onSelectRotation.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    onSelectRotation(selectedOption) {
        this.setState({ selectedRotation: selectedOption.value });
    }

    toggleVisibility(event) {
        event.preventDefault();
        this.setState({ isVisible: !this.state.isVisible });
    }



    render() {


        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let panelWidth = document.body.getBoundingClientRect().width - 125;

        if (panelWidth > 350) {
            panelWidth = 350;
        }

        const { residentFilter, residentList } = this.props;
        let residentInfo = false, currentAcademicYear,
            currentSchedule = [], currentScheduleDates = [], currentRotation = '';

        let { selectedRotation } = this.state;

        if (residentFilter && residentFilter.username) {
            residentInfo = _.find(residentList, (resident) => resident.username == residentFilter.username);

            // if the current month is before july then pick the last year  
            currentAcademicYear = moment().month() <= 5 ? moment().year() - 1 : moment().year();
            currentScheduleDates = rotationScheduleMap[currentAcademicYear];
            currentSchedule = residentInfo.rotationSchedule && residentInfo.rotationSchedule[currentAcademicYear] || [];

            // find the rotation which has todays date
            let currentRotationIndex = _.findIndex(currentScheduleDates, (period, index) => {
                // skip the last record
                if (index < currentScheduleDates.length - 1) {
                    let periodStartDate = moment(period, "DD-MMM-YYYY"),
                        endingDate = moment(currentScheduleDates[index + 1], "DD-MMM-YYYY");
                    return moment().isBetween(periodStartDate, endingDate, 'days', '(]') ? 'between-lot' : '';
                }
                return false;

            })
            currentRotation = currentSchedule[currentRotationIndex] || 'EM';
            // split and replace back slashes "/" in the names
            currentRotation = currentRotation.split("/").join("-");
        }

        // create a select option label list 
        let rotationSelectList = _.map(CARDS_LIST, (card) => {
            return { label: card, value: card }
        })

        // if there is no selected rotation then set it based on resident schedule
        if (selectedRotation == '') {
            selectedRotation = CARDS_LIST.indexOf(currentRotation) > -1 ? currentRotation : 'EM';
        }

        let imageName = selectedRotation, currentPhase = residentInfo.currentPhase || '';
        if (imageName == 'EM') {

            if (currentPhase == 'transition-to-discipline') {
                imageName = ['EM-TTD']
            }
            else if (currentPhase == 'foundations-of-discipline') {
                imageName = ['EM-F']
            }
            else if (currentPhase == 'core-of-discipline') {
                imageName = ['EM-C-1', 'EM-C-2', 'EM-C-3']
            }
            else {
                imageName = ['EM-TP-1', 'EM-TP-2']
            }
        }

        return (
            <div className='info-card-panel-root m-t'>
                {residentInfo && <div>
                    <h4 onClick={this.toggleVisibility} className="text-left">
                        {this.state.isVisible ? <span className="icon icon-chevron-down"></span> : <span className="icon icon-chevron-right"></span>}
                        View Infographic Cards
                </h4>
                    {this.state.isVisible &&
                        <div className='info-panel-inner'>
                            <div className='rotation-select text-center'>
                                <div style={{ width: panelWidth }} className='react-select-root'>
                                    <ReactSelect
                                        placeholder='test'
                                        value={_.find(rotationSelectList, (d) => d.value == selectedRotation)}
                                        options={rotationSelectList}
                                        styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                        onChange={this.onSelectRotation} />
                                </div>
                            </div>
                            <div className='image-container'>
                                {selectedRotation == 'EM' ? <div>{_.map(imageName, (image) =>
                                    <img style={{ width: panelWidth }} key={image} className='info-card' src={"assets/img/cards/" + image + ".png"} />
                                )}</div> :
                                    <img style={{ width: panelWidth }} className='info-card' src={"assets/img/cards/" + imageName + ".png"} />
                                }
                            </div>
                        </div>}
                </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        residentFilter: state.oracle.residentFilter,
        residentList: state.oracle.residentList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoCardsPanel);






