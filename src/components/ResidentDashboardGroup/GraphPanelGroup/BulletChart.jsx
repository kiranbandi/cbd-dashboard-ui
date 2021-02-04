import React from 'react';

export default (props) => {

    // 40px padding on either side
    const width = props.widthPartition - 40;

    return (
        <svg height={40} width={width} className='observation-svg'>
            <g>
                <rect fill="#eee" width={width} height="40" x="0" y="0"></rect>
                <rect fill="lightsteelblue" width={props.bulletInnerWidth} height="10" x="15" y="10"></rect>
                <rect fill="steelblue" width={props.firstMeasure} height="10" x="15" y="10"></rect>
                <rect fill="#e4c3c3" width={props.bulletInnerWidth} height="10" x="15" y="20"></rect>
                <rect fill="#b44646" width={props.secondMeasure} height="10" x="15" y="20"></rect>
            </g>
        </svg>)

}


