/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import rotationScheduleMap from '../utils/rotationScheduleMap';
import { cardsList } from '../utils/programInfo';
import ReactSelect from 'react-select';

class InfoCardsPanel extends Component {

    constructor(props) {
        super(props);
        this.onSelectRotation = this.onSelectRotation.bind(this);
    }

    onSelectRotation(value) {

        debugger;

    }

    render() {

        const { residentFilter, residentList } = this.props;
        let residentInfo = false, currentAcademicYear,
            currentSchedule = [], currentScheduleDates = [];

        if (residentFilter && residentFilter.username) {
            residentInfo = _.find(residentList, (resident) => resident.username == residentFilter.username);

            // if the current month is before july then pick the last year  
            currentAcademicYear = moment().month() <= 5 ? moment().year() - 1 : moment().year();
            currentScheduleDates = rotationScheduleMap[currentAcademicYear];
            currentSchedule = residentInfo.rotationSchedule && residentInfo.rotationSchedule[currentAcademicYear];

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
            let currentRotation = currentSchedule[currentRotationIndex];
        }

        // create a select option label list 
        let rotationSelectList = _.map(cardsList, (card) => {
            return { label: card, value: card }
        })


        return (
            <div className='info-card-panel-root'>
                {residentInfo && <div className='rotation-select'>
                    <span className='inner-span'>Rotation</span>
                    <div className='react-select-root'>
                        <ReactSelect
                            value={''}
                            options={rotationSelectList}
                            styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                            onChange={this.onSelectRotation} />
                    </div>
                </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        residentFilter: state.oracle.residentFilter,
        residentList: state.oracle.residentList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoCardsPanel);
