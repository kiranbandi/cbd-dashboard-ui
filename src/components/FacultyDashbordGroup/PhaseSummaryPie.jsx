import React from "react";
import { pie, arc } from "d3-shape";
import { scaleOrdinal } from 'd3-scale';
import { format } from "d3-format";

const fourPointColorScale = ["#f28e2c", "#76b7b2", "#4e79a7", "#59a14f"];
const phaseMiniLabelList = ['D', 'F', 'C', 'P'];

const innerRadius = 25, outerRadius = 50;

const Arc = ({ data, index, createArc, colors }) => (
    <g key={index} className="arc">
        <path style={{ 'cursor': 'pointer' }} className="arc" d={createArc(data)} fill={colors(index)}>
            <title>{data.value + "%"}</title>
        </path>
    </g>);


const Pie = props => {
    const pieDataSum = _.sum(props.data);
    const pieData = _.map(props.data, (d) => {
        return pieDataSum ? Math.round((d / pieDataSum) * 10000) / 100 : 0;
    });

    const createPie = pie()
        .value(d => d)
        .sort(null);

    const createArc = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    const formatter = format(".2f");
    const data = createPie(pieData);
    const colors = scaleOrdinal(fourPointColorScale);
    const showNA = pieData.length == 0 || _.sum(pieData) == 0;

    return (
        <div className={'faculty-pie-wrapper ' + (showNA ? 'p-a' : '')}>
            <span className="pie-title">TRAINING STAGE</span>
            {showNA ?
                <h2 className="statcard-number m-a"> N/A</h2> :
                <svg width={150} height={100}>
                    <g transform={`translate(${outerRadius + 10} ${outerRadius})`}>
                        {data.map((d, i) => (
                            <Arc
                                key={i}
                                data={d}
                                index={i}
                                createArc={createArc}
                                colors={colors}
                                format={formatter}
                            />
                        ))}
                    </g>
                    <g transform='translate(28 -1)'>
                        {_.map(fourPointColorScale, (c, i) => {
                            return <g key={'epa-pie-label-' + i}>
                                <circle style={{ 'cursor': 'pointer' }} fill={c} r={12} cx={100} cy={23 * i + 15}>
                                    <title>{pieData[i] + "%"}</title>
                                </circle>
                                <text style={{ 'fontWeight': 'bold', 'fill': 'white', 'cursor': 'pointer' }}
                                    x={96} y={23 * i + 20}>{phaseMiniLabelList[i]}
                                    <title>{pieData[i] + "%"}</title>
                                </text>
                            </g>
                        })}
                    </g>
                </svg>}
        </div >

    );
};

export default Pie;
