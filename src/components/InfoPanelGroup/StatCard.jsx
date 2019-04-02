import React from 'react';

export default (props) => {

    const { title = '', type = 'primary', metric = '', delta = '', dual = false, secondMetric = '' } = props;

    return <div className="col-sm-6 col-lg-3 m-b text-xs-center">
        <div className={"statcard statcard-" + type}>
            <div className="p-a">
                <span className="statcard-desc">{title}</span>
                {dual ?
                    <div>
                        <h2 className="statcard-number text-left"> {metric}
                            <span className='statcard-inner'>overall</span>
                        </h2>
                        <h2 className="statcard-number text-right"> {secondMetric}
                            <span className='statcard-inner'>period</span>
                        </h2>
                    </div> :
                    <h2 className="statcard-number "> {metric}</h2>}
            </div>
        </div>
    </div>

}
