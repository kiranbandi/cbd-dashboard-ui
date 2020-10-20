import React from 'react';
import ReactTooltip from 'react-tooltip';
const shortid = require('shortid');

export default (props) => {

    const { info } = props, tooltipCustomID = 'tooltip-' + shortid.generate();

    return <span className='tooltip-wrapper'>
        <a className='tooltip-anchor' data-tip="React-tooltip" data-for={tooltipCustomID}>
            <img width="20" height="20" src="https://www.flaticon.com/svg/static/icons/svg/189/189664.svg"></img>
        </a>
        <ReactTooltip
            className='custom-tooltip'
            id={tooltipCustomID}
            place="bottom" border={true}
            type="dark" effect="float">
            <p>{info}</p>
        </ReactTooltip>
    </span>
}
