import React, { Component } from 'react';
import moment from 'moment';
import { scaleLinear } from 'd3';
import _ from 'lodash';


export default class ScheduleBlock extends Component {

    constructor(props) {
        super(props);
        this.state = { showID: -1 };
    }

    onMouseOver = (event) => {
        const { scheduleList, showRotationTooltip } = this.props,
            blockID = event.currentTarget.id.slice(9),
            data = _.find(scheduleList, (d) => d.unique_id == blockID) || false;

        if (data) {
            var pageWidth = document.body.getBoundingClientRect().width;
            showRotationTooltip(true, {
                'x': event.pageX + 400 > pageWidth ? event.pageX - 400 : event.pageX,
                'y': event.pageY - 25,
                'start_date': data['start_date'].format('DD/MM/YYYY'),
                'end_date': data['end_date'].format('DD/MM/YYYY'),
                'name': data['rotation_name'],
                'group': data['schedule_group'],
                'site': data['site'],
                'service': data['service']
            });
        }
    }

    onMouseOut = () => { this.props.showRotationTooltip(false) }

    render() {

        const { scheduleList = [], isHistorical = false,
            widthAvailable, isEPAperBlockVisible = false,
            residentData, academicYear } = this.props,
            { showID } = this.state;

        // create a pixel to day scale
        const scaleX = scaleLinear()
            .range([0, widthAvailable])
            .domain([0, 365]);

        // Lets assume residents need atleast 2 EPAs per week as a target 
        const rotationRequiredPerWeek = 2;

        // First sort the schedule blocks by start date
        //When you use "-" on a operands that are Moment instance, 
        // they're coerced to numbers, which are their milliseconds-since-the-Epoch
        const sortedBlocks = scheduleList.sort((a, b) => b - a);

        // create an empty count map
        let epaPerBlockList = _.times(sortedBlocks.length, () => 0);
        // if EPAs per block are needed , slot records into block
        if (isEPAperBlockVisible) {
            // slot the records so they fall into respective periods
            _.map(residentData, (record) => {
                let iterator = 0, slotted = false, recordStamp = moment(record.Date, 'YYYY-MM-DD');
                while (!slotted && (iterator < scheduleDateList.length - 1)) {
                    if (recordStamp.isBetween(sortedBlocks[iterator].start_date, sortedBlocks.end_date, 'days', '[]')) {
                        epaPerBlockList[iterator] += 1;
                        slotted = true;
                    }
                    iterator += 1;
                }
            })
        }


        let scheduleChart = [], perBlockCountChart = [];

        _.map(sortedBlocks, (rotationBlock, blockIndex) => {

            const { start_date, end_date, rotation_abbrev, unique_id } = rotationBlock;

            const startDateOfAcademicYear = moment('07/01/' + (+academicYear), 'MM/DD/YYYY');
            // For each block we need distance from start 
            // then we need the width of the block
            // if the block goes beyond the available width we then clip it 

            const daysFromStart = start_date.diff(startDateOfAcademicYear, "days"),
                // increment by 1 as diff doesnt count the start
                daysInBlock = end_date.diff(start_date, "days") + 1,
                weeksInBlock = daysInBlock / 7,
                rotationRequired = weeksInBlock * rotationRequiredPerWeek,
                isTodayInPeriod = moment().isBetween(start_date, end_date, 'days', '[]') ? 'between-lot' : '';

            const distanceFromLeft = scaleX(daysFromStart),
                // Blocks should be atleast 5 pixels wide
                blockWidth = Math.max(5, scaleX(daysInBlock));


            scheduleChart.push(<span
                className={'text-truncate rotation-block-anchor chart-line are-clickable ' + isTodayInPeriod}
                key={"index-" + blockIndex}
                id={'rotation-' + unique_id}
                style={{ left: distanceFromLeft, width: blockWidth }}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}>
                {rotation_abbrev}
            </span>);


            if (unique_id == showID) {
                console.log(rotationBlock);
            }

            // Deal with EPA Count and colors 
            let averageColorLabel = 'dark-green';

            let averageRotationPercentage = 0.35;
            if (epaPerBlockList[blockIndex] && rotationRequired != 0) {
                averageRotationPercentage = (Number(epaPerBlockList[blockIndex]) || 0) / rotationRequired;
            }

            if (averageRotationPercentage > 0 && averageRotationPercentage <= 0.25) {
                averageColorLabel = 'dark-red';
            }
            else if (averageRotationPercentage > 0 && averageRotationPercentage <= 0.50) {
                averageColorLabel = 'red';
            }
            else if (averageRotationPercentage > 0 && averageRotationPercentage <= 0.75) {
                averageColorLabel = 'green';
            }

            // if we also need to show the corresponding count per block
            if (isEPAperBlockVisible) {
                perBlockCountChart.push(<span
                    className={'chart-count '}
                    key={"count-" + blockIndex}
                    style={{ left: distanceFromLeft, width: blockWidth }}>
                    <span className={'count-text use-entire-width'}>
                        {epaPerBlockList[blockIndex] || '5'}
                    </span>
                    {/* {(averageRotationPercentage != 0) &&
                        <span className={'count-chart ' + averageColorLabel}>
                            {Math.round(averageRotationPercentage * 100) + "%"}
                        </span>} */}
                </span>)
            }

        })


        return (<div style={{ width: widthAvailable, margin: '5px auto' }} key={academicYear} >
            <span className='yearname-label'>{academicYear}</span>
            <div className={'schedule-box-rotation ' + (isEPAperBlockVisible ? 'dual-block' : '')}>
                {perBlockCountChart}
                {scheduleChart}
            </div>
        </div >)

    }
}

