import React from 'react';

export default (props) => {

    const { info, small = false } = props;

    return <span className='tooltip-wrapper'>
        <a className={`tooltip-anchor ${small ? 'small' : ''}`}>
            <span className="icon icon-info-with-circle"></span>
            <s-tooltip
                follow-mouse
                border-width="1px"
                margin="30px"
                max-width="500px"
                show-delay="50"
                style={{ fontFamily: 'inherit' }}
            >{info}</s-tooltip>
        </a>
    </span>
}
