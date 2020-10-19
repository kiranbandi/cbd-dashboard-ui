import React, { Component } from 'react';
import _ from 'lodash';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import ReactTooltip from 'react-tooltip';
import infoTooltipReference from '../../utils/infoTooltipReference';

const fivePointColorScale = ["#e15759", "#f28e2c", "#76b7b2", "#4e79a7", "#59a14f"];
const moddedRatingList = _.map(fivePointColorScale, (d, i) => ('Rating-' + (i + 1)));

export default class ProgramScoreDist extends Component {

    render() {
        const { programData, width, printModeON } = this.props;

        const processedDataList = _.map(programData, (d) => {
            const total = _.sum(d.rating_group);
            let dataPoint = { 'name': d.programName };
            _.map(moddedRatingList, (rating, index) => {
                dataPoint[rating] = total == 0 ? 0 : (d.rating_group[index] / total) * 100;
            });
            return dataPoint;
        });

        const randomTooltipId = `info-tooltip-${(Math.random() * 10000).toFixed(0)}`;

        return (
            <div className='program-part-container'>
                <div className="hr-divider">
                    <h4
                        className="hr-divider-content"
                        style={printModeON ? { background: 'white', color: 'black' } : undefined}>
                        EPA Rating Distribution
                        <a
                            data-tip="React-tooltip"
                            data-for={randomTooltipId}
                        >
                            <img width="20" height="20" src="https://www.flaticon.com/svg/static/icons/svg/189/189664.svg"></img>
                        </a>
                        <ReactTooltip id={randomTooltipId} place="left" type="dark" effect="float">
                            <p>{infoTooltipReference.comparePrograms.EPARatingDistribution}</p>
                        </ReactTooltip>
                    </h4>
                </div>
                <div className='chart-container'>
                    <BarChart width={width} height={600}
                        data={_.reverse(processedDataList)}
                        layout="vertical"
                        barGap={0}
                        barCategoryGap={'20%'}
                        margin={{ left: 25, right: 30, top: 10, bottom: 10 }}>
                        <XAxis tickFormatter={(value) => Math.round(value)} style={{ fill: 'black', 'fontWeight': 'bolder' }} type="number" domain={[0, 100]} />
                        <YAxis style={{ 'fontWeight': 'bold' }} width={105} tickSize={0} tickMargin={5} type="category" axisLine={false} dataKey="name" />
                        <Tooltip labelStyle={{ 'color': 'black' }} wrapperStyle={{ 'fontWeight': 'bold' }}
                            formatter={(value, name) => ([(Math.round(value * 10) / 10) + '%', name])} />
                        <Legend wrapperStyle={{ 'color': 'black' }} />
                        {_.map(moddedRatingList, (rating, index) => {
                            return <Bar key={'stacked-rating-' + index} stackId='a' dataKey={rating} fill={fivePointColorScale[index]} />
                        })}
                    </BarChart>
                </div>
            </div >
        );
    }
}


