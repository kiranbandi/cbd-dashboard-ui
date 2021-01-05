import React from 'react';

export default (props) => {

    const { info } = props;

    return <span className='tooltip-wrapper'>
        <a className='tooltip-anchor'>
            <span className="icon icon-info-with-circle"></span>
            <s-tooltip
                follow-mouse
                border-width="1px"
                margin="30px"
                max-width="500px"
                show-delay="2000"
                style={{ fontFamily: 'inherit' }}
            >{info}</s-tooltip>
        </a>
    </span>
}
