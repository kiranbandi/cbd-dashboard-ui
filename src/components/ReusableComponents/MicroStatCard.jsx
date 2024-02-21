import React from 'react';
import { InfoTip } from '../';

export default (props) => {

    const { title = '', type = 'primary', metric = '', dual = false, secondMetric = '', tooltip = false, tooltipText = '' } = props;

    return <div className="statcard-root micro-stat text-xs-center">
        <div className={"statcard statcard-" + type}>
            <div className="p-a">
                <span className="statcard-desc">{title} {tooltip && < InfoTip small={true} info={tooltipText} />} </span>
                {dual ?
                    <div>
                        <h2 className="statcard-number text-center"> {metric}
                            <span className='statcard-inner'>overall</span>

                        </h2>
                        <h2 className="statcard-number text-center"> {secondMetric}
                            <span className='statcard-inner'>period</span>
                        </h2>
                    </div> :
                    <h2 className="statcard-number "> {metric}</h2>}
            </div>
        </div>
    </div>

}
