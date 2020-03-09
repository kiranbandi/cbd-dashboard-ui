import React from "react";
import * as d3 from "d3";

const fivePointColorScale = ["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f"];

const innerRadius = 28, outerRadius = 48;

const Arc = ({ data, index, createArc, colors, format }) => (
    <g key={index} className="arc">
        <path className="arc" d={createArc(data)} fill={colors(index)} />
    </g>
);

const Pie = props => {
    const createPie = d3
        .pie()
        .value(d => d)
        .sort(null);
    const createArc = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    const colors = d3.scaleOrdinal(fivePointColorScale);
    const format = d3.format(".2f");
    const data = createPie(props.data);

    return (
        <div className={'faculty-pie-wrapper ' + (data.length > 0 ? '' : 'p-a')}>
            <span className="pie-title">EPA RATING</span>
            {data.length > 0 ?
                <svg width={150} height={100}>
                    <g transform={`translate(${outerRadius + 8} ${outerRadius + 2})`}>
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
                    <g transform={'translate(28 -1)'}>
                        {_.map(fivePointColorScale, (c, i) => {
                            return [<circle fill={c} r={10} cx={100} cy={20 * i + 11}></circle>,
                            <text style={{ 'fontWeight': 'bold' }} x={96} y={20 * i + 15}>{i + 1}</text>];
                        })}
                    </g>
                </svg> :
                <h2 className="statcard-number m-a"> N/A</h2>
            }

        </div>

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