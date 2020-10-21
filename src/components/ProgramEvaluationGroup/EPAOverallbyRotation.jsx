import React, { Component } from 'react';
import moment from 'moment';
import ReactSelect from 'react-select';
import { Bar } from 'react-chartjs';
import { ROTATION_SCHEDULE_MAP } from '../../utils/programInfo';
import { InfoTip } from '../';
import infoTooltipReference from '../../utils/infoTooltipReference';

export default class EPASpecRotation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            academicYear: { 'label': '2020-2021', 'value': '2020' },
        };
    }

    render() {
        const { possibleAcademicYears, residentList, allRecords, normalizeByCount = true, width, printModeON } = this.props;

        const programData = processAndFilterRecords(allRecords, residentList, this.state.academicYear.value, normalizeByCount)

        let lineData = {
            labels: _.map(programData, (d) => d.label),
            datasets: [{
                label: "Rotations",
                fillColor: "rgba(28,168,221,.03)",
                strokeColor: "#43b98e",
                pointColor: "#43b98e",
                pointStrokeColor: 'rgba(28,168,221,.03)',
                pointHighlightFill: "rgba(28,168,221,.03)",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: _.map(programData, (d) => d.value)
            }]
        }

        return (<div className='program-vis-box'
            style={printModeON ? { background: 'white' } : undefined}>
            <div>
                <h3
                    className='text-left m-a-0 pull-left'
                    style={printModeON ? { color: 'black' } : undefined}>
                    {normalizeByCount ? 'EPA per Rotation' : 'EPA Overall Count'}
                    <InfoTip info={infoTooltipReference.programEvaluation.EPACountPerRotation} />
                </h3>
                <div className='year-selection-box pull-right'>
                    <h2 className='header'>Academic Year: </h2>
                    <div className='react-select-root'>
                        <ReactSelect
                            value={this.state.academicYear}
                            options={possibleAcademicYears}
                            styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                            onChange={(academicYear) => this.setState({ academicYear })} />
                    </div>
                </div>
            </div>
            <div className='m-t'>
                <Bar
                    options={{ scaleBeginAtZero: true }}
                    data={lineData}
                    width={width} height={400}
                    redraw={true} />
            </div>
        </div>)
    };
};


function matchAcademicYear(recordDate, academicYear) {
    var timeObj = moment(recordDate, 'YYYY-MM-DD');
    return (timeObj.isBetween(moment('07/01/' + Number(academicYear), 'MM/DD/YYYY'), moment('06/30/' + (Number(academicYear) + 1), 'MM/DD/YYYY'), 'days', '[]'))
}

function processAndFilterRecords(allRecords, residentList, academicYear, normalizeByCount) {

    let recordsInYear = _.filter(allRecords, (d) => (!!d.rotationTag && !!d.phaseTag && matchAcademicYear(d.observation_date, academicYear)));

    // for some calculations we can ignore the expired records as for them the metrics dont
    // exist so we filter them out from the list
    let residentsWithData = _.groupBy(recordsInYear, (d) => d.username),
        rotationCount = calculateRotationCount(residentList, academicYear, residentsWithData);

    // group all the records by their rotation tag
    let groupedRecords = _.groupBy(recordsInYear, (d) => d.rotationTag);
    // Count records for each group and normalize by rotation count for that group
    return _.map(groupedRecords, (group, label) => {
        return {
            value: Math.ceil(group.length / (normalizeByCount ? rotationCount[label] : 1)),
            label
        };
    }).filter((d) => !isNaN(d.value)).sort((a, b) => (b.value - a.value));

}


// The following blocks involves some serious calculations !!!
function calculateRotationCount(residentList, academicYear, residentsWithData) {

    let rotationCount = {};
    // we filter out residents who were active in that current year and only get their rotations ,
    // so if we are looking at the year 2018-2019 then the academic year is 2018
    // so we only take residents who started before July 2019 
    var activeResidentList = _.filter(residentList, (d) => {
        return (moment(d.programStartDate).isBefore(moment('07/01/' + (Number(academicYear) + 1), 'MM/DD/YYYY')))
    });

    // some residents might be active but might not have any data,
    // so here we take remove them from the active resident list as it is obvious they arent active
    // this is an opinionated choice but can be changed later on
    var activeResidentListWithData = _.filter(activeResidentList, (d) => residentsWithData.hasOwnProperty(d.username));

    // Finally if the academic year is still on going we only take the rotations that have been completed,
    // if not we count all rotations in that year,
    // for this we check the rotation schedule and compare with todays date.

    // if today is in the selected academic year period
    if (moment().isBetween(moment('07/01/' + Number(academicYear), 'MM/DD/YYYY'), moment('06/30/' + (Number(academicYear) + 1), 'MM/DD/YYYY'), 'days', '[]')) {
        // remove rotations that will start after todays and get count of those before
        const rotationStopCount = _.filter(ROTATION_SCHEDULE_MAP[academicYear],
            (rotationDate) => moment().isAfter(moment(rotationDate, 'DD-MMM-YYYY'))).length;

        // if not count each rotation for the whole year
        _.map(activeResidentListWithData, (resident) => {
            // if a resident has a list then only get the rotations that have been done
            const rotationList = resident.rotationSchedule[academicYear] ?
                resident.rotationSchedule[academicYear].slice(0, rotationStopCount) : [];
            _.map(rotationList, (rotation, rindex) => {
                if (rotationCount.hasOwnProperty(rotation)) { rotationCount[rotation] += 1; } else { rotationCount[rotation] = 1; }
            });
        })
    } else {
        // if not count each rotation for the whole year
        _.map(activeResidentListWithData, (resident) => {
            _.map(resident.rotationSchedule[academicYear], (rotation) => {
                if (rotationCount.hasOwnProperty(rotation)) { rotationCount[rotation] += 1; } else { rotationCount[rotation] = 1; }
            });
        })
    }
    return rotationCount;
}