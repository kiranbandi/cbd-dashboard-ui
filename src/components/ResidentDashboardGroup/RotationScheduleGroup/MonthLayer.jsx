import React from 'react';
import moment from 'moment';
import { scaleLinear } from 'd3';

export default (props) => {

    const { width } = props,
        // create a pixel to day scale
        scaleX = scaleLinear()
            .range([0, width])
            .domain([0, 365]),
        months = ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN"];


    return <div style={{ width }} className='custom-gannt-style-chart'>
        {months.map((month, monthID) => {
            return <span
                style={{ 'width': scaleX(moment(month, 'MMM').daysInMonth()) }}
                key={'month-' + monthID} className='yearBox'>
                {month}
            </span>
        })}
    </div>
}
