import React from 'react';

export default (props) => {

    const { printModeON, title = '', type = 'primary', metric = '', dual = false, secondMetric = '' } = props;

    return <div className="statcard-root micro-stat text-xs-center">
        <div className={"statcard statcard-" + type}>
            <div className="p-a">
                <span style={{ color: printModeON ? 'black' : '' }} className="statcard-desc">{title}</span>
                {dual ?
                    <div>
                        <h2 style={{ color: printModeON ? 'black' : '' }} className="statcard-number text-center"> {metric}
                            <span className='statcard-inner'>overall</span>
                        </h2>
                        <h2 style={{ color: printModeON ? 'black' : '' }} className="statcard-number text-center"> {secondMetric}
                            <span className='statcard-inner'>period</span>
                        </h2>
                    </div> :
                    <h2 style={{ color: printModeON ? 'black' : '' }} className="statcard-number "> {metric}</h2>}
            </div>
        </div>
    </div>

}
