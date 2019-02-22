import React, { Component } from 'react';
import LineChart from './LineChart';
import BulletChart from './BulletChart';
import { scaleLinear } from 'd3';

export default class GraphRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let { epaSource, innerKey, widthPartition, epaSourceMap, residentData, onMouseOut, onMouseOver } = this.props;

        //  margin of 20px on either side reduces the available width by 40 
        // 15px bullet chart padding on either sides
        const bulletInnerWidth = widthPartition - 70;

        // margin of 10px on either side reduces the available width by 20
        var marginVertical = 20;
        var marginHorizontal = 20;
        var height = 200;
        var innerHeight = height - 20;
        var width = (widthPartition * 2) - 20;

        // Get the maximum required observations for each EPA from source MAP *
        const maxObservation = +epaSourceMap[epaSource.split(".")[0]].maxObservation[epaSource];
           
        const firstMeasure = Math.min((residentData[epaSource].length / maxObservation) * bulletInnerWidth, bulletInnerWidth);
        // Get high performance observations , 4 or 5 
        const secondMeasure = Math.min((residentData[epaSource].filter((record)=> +record.Rating>=4).length / maxObservation) * bulletInnerWidth, bulletInnerWidth);
        
        var xScale = scaleLinear().domain([0, residentData[epaSource].length - 1]).range([marginHorizontal, width - marginHorizontal])
        var yScale = scaleLinear().domain([5, 1]).range([marginVertical, innerHeight - marginVertical])

        var scoreData = residentData[epaSource].map((d, i) => { return { x: xScale(i), y: yScale(d.Rating) }; });

        var trackTrailPositions = _.map([...Array(5)], (d, i) => {
            return {
                x: marginHorizontal,
                dx: width - (2 * marginHorizontal),
                y: yScale(i + 1)
            }
        })

        return (
            <div>
                <div style={{ width: widthPartition }} className='inner-cell epa-title-cell'>
                    <span className='inner-offset-label'>
                        {epaSource + " - " + epaSourceMap[innerKey].subRoot[epaSource]}
                    </span>
                </div>
                <div style={{ width: widthPartition }} className='inner-cell observation-cell'>
                    <BulletChart
                        widthPartition={widthPartition}
                        bulletInnerWidth={bulletInnerWidth}
                        firstMeasure={firstMeasure}
                        secondMeasure={secondMeasure} />
                </div>
                <div style={{ width: widthPartition * 2 }} className='inner-cell score-cell'>
                    <LineChart
                        trackTrailPositions={trackTrailPositions}
                        width={width}
                        data={scoreData}
                        epaSource={epaSource}
                        innerHeight={innerHeight}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut} />
                </div>
            </div>
        );
    }
}

