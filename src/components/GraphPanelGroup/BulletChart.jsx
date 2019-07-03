import React from 'react';

export default (props) => {

    // 40px padding on either side
    const width = props.widthPartition - 40;

    return (
        <svg height={25} width={width} className='observation-svg'>
            <g>
                <rect fill="#eee" width={width} height="25" x="0" y="0"></rect>
                <rect fill="lightsteelblue" width={props.bulletInnerWidth} height="10" x="15" y="7.5"></rect>
                <rect fill="steelblue" width={props.firstMeasure} height="10" x="15" y="7.5"></rect>
            </g>
        </svg>)

}


