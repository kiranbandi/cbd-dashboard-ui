import React from 'react';

export default (props) => {

    return (
        <svg height={200} width={props.widthPartition - 40} className='observation-svg'>
            <g>
                <rect fill={'#eee'} className='bullet-range' width={props.widthPartition - 40} height="25" x="0" y="5"></rect>
                <rect fill={'lightsteelblue'} className='bullet-measure' width={props.innerWidth} height="10" x="15" y="12.5"></rect>
                <rect fill={'steelblue'} className='bullet-measure' width={props.rectSize} height="10" x="15" y="12.5"></rect>
            </g>
        </svg>)

}


