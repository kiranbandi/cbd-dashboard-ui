import React, { Component } from 'react';
import LineChart from './LineChart';
import BulletChart from './BulletChart';
import { scaleLinear } from 'd3';
import SlideInTable from './SlideInTable';

export default class GraphRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let { epaSource, isTableVisible, innerKey, widthPartition, smallScreen, epaSourceMap, residentData, onMouseOut, onMouseOver, onTableExpandClick } = this.props;

        //  margin of 20px on either side reduces the available width by 40 
        // 15px bullet chart padding on either sides
        const bulletInnerWidth = widthPartition - 70;

        // margin of 10px on either side reduces the available width by 20
        var marginVertical = 20;
        var marginHorizontal = 20;
        var height = 200;
        var innerHeight = height - 20;
        var width = (smallScreen ? widthPartition : widthPartition * 2) - 20;

        // Get the maximum required observations for each EPA from source MAP *
        const maxObservation = +epaSourceMap[epaSource.split(".")[0]].maxObservation[epaSource];

        // Get recorded observation count
        const recordedCount = residentData[epaSource].length;
        // Get high performance observations count, 4 or 5 
        const achievedCount = residentData[epaSource].filter((record) => +record.Rating >= 4).length;
        // Get remaining count 
        const remainingCount = Math.max((maxObservation - recordedCount), 0)

        const firstMeasure = Math.min((recordedCount / maxObservation) * bulletInnerWidth, bulletInnerWidth);
        const secondMeasure = Math.min((achievedCount / maxObservation) * bulletInnerWidth, bulletInnerWidth);

        const xScale = scaleLinear().domain([0, residentData[epaSource].length - 1]).range([marginHorizontal, width - marginHorizontal])
        const yScale = scaleLinear().domain([5, 1]).range([marginVertical, innerHeight - marginVertical])

        const scoreData = residentData[epaSource].map((d, i) => { return { x: xScale(i), y: yScale(d.Rating) }; });

        const trackTrailPositions = _.map([...Array(5)], (d, i) => {
            return {
                x: marginHorizontal,
                dx: width - (2 * marginHorizontal),
                y: yScale(i + 1)
            }
        })

        const overShotLineX = recordedCount > maxObservation ? xScale(maxObservation - 0.5) : 0;

        return (
            <div className='text-xs-center'>
                {/* widthly reduced slightly by 10px to facilitate extra gap at the last */}
                <div style={{ width: widthPartition - 10 }} className='inner-cell epa-title-cell'>
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

                    <div className='card-container'>
                        <div className='graph-card first-card'>
                            <span className='card-text'>{remainingCount}</span>
                            <span className='card-title remaining-title'>TO GO</span>
                        </div>
                        <div className='graph-card'>
                            <span className='card-text'>{recordedCount}</span>
                            <span className='card-title recorded-title'>OBSERVED</span>
                        </div>
                        <div className='graph-card achieved-title'>
                            <span className='card-text'>{maxObservation}</span>
                            <span className='card-title required-title'>REQUIRED</span>
                        </div>
                        <div className='graph-card '>
                            <span className='card-text'>{achievedCount}</span>
                            <span className='card-title achieved-title'>ACHIEVED</span>
                        </div>
                    </div>

                </div>
                <div style={{ width: smallScreen ? widthPartition : widthPartition * 2 }} className='inner-cell score-cell'>
                    <LineChart
                        trackTrailPositions={trackTrailPositions}
                        overShotLineX={overShotLineX}
                        width={width}
                        data={scoreData}
                        epaSource={epaSource}
                        smallScreen={smallScreen}
                        innerHeight={innerHeight}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut} />
                    {!smallScreen && <span className={"icon icon-open-book " + epaSource + (isTableVisible ? ' open-table' : ' ')} onClick={onTableExpandClick}></span>}
                </div>
                {!smallScreen && isTableVisible && <SlideInTable data={residentData[epaSource]} width={widthPartition} />}
            </div>
        );
    }
}

