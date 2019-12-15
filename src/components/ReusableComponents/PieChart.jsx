import React from "react";
import * as d3 from "d3";

const fourpointColorScale = ["#2ca02c", "#1f77b4", "#d62728", "#ffffff"];

const Arc = ({ data, index, createArc, colors, format }) => (
    <g key={index} className="arc">
        <path className="arc" d={createArc(data)} fill={colors(index)} />
    </g>
);

const Pie = props => {
    const createPie = d3
        .pie()
        .value(d => d.value)
        .sort(null);
    const createArc = d3
        .arc()
        .innerRadius(props.innerRadius)
        .outerRadius(props.outerRadius);
    const colors = d3.scaleOrdinal(fourpointColorScale);
    const format = d3.format(".2f");
    const data = createPie(props.data);

    return (
        <svg width={props.width} height={props.height}>
            <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
                {data.map((d, i) => (
                    <Arc
                        key={i}
                        data={d}
                        index={i}
                        createArc={createArc}
                        colors={colors}
                        format={format}
                    />
                ))}
            </g>
        </svg>
    );
};

export default Pie;


// Usage Example

//  <PieSVG 
// data={data}
// width={200}
// height={200}
// innerRadius={60}
// outerRadius={100}
// />