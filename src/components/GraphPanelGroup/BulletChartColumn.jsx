import React from 'react';

export default (props) => {

    const { epaSourceMap, residentData, epaSourcesThatExist, widthPartition } = props;
    //  margin of 20px on either side reduces the available width by 40 
    // 15px bullet chart padding on either sides
    const innerWidth = widthPartition - 70;

    return <div style={{ width: widthPartition }} className='p-a-0 observation-root panel-container'>
        {_.map(epaSourcesThatExist, (epaSources, innerKey) => {
            return <div className='observation-outer' key={'observation-outer-' + innerKey}>
                {_.map(epaSources, (epaSource, sourceKey) => {
                    // Get the maximum required observations for each EPA from source MAP
                    const maxObservation = +epaSourceMap[epaSource.split(".")[0]].maxObservation[epaSource];
                    const rectSize = Math.min((residentData[epaSource].length / maxObservation) * innerWidth, innerWidth);
                    return <svg height={200} width={widthPartition - 40} className='observation-svg' key={'observation-svg-' + sourceKey}>
                        <g>
                            <rect fill={'#eee'} className='bullet-range' width={widthPartition - 40} height="25" x="0" y="5"></rect>
                            <rect fill={'lightsteelblue'} className='bullet-measure' width={innerWidth} height="10" x="15" y="12.5"></rect>
                            <rect fill={'steelblue'} className='bullet-measure' width={rectSize} height="10" x="15" y="12.5"></rect>
                        </g>
                    </svg>
                })}
            </div>;
        })}</div>

}


