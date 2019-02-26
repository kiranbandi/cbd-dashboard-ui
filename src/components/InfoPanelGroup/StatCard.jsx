import React from 'react';

export default (props) => {

    const { title = '', type = 'primary', metric = '', delta = '' } = props;

    return <div className="col-sm-6 col-lg-3 m-b">
        <div className={"statcard statcard-" + type}>
            <div className="p-a">
                <span className="statcard-desc">{title}</span>
                <h2 className="statcard-number">
                    {metric}
                </h2>
            </div>
        </div>
    </div>

}
