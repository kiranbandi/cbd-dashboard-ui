import React from 'react';

export default (props) =>
    <div className='rotation-tooltip' style={{ 'left': props.x, 'top': props.y }}>
        {props.name && <p><b>ROTATION: </b><span>{props.name}</span></p>}
        <p><b>PERIOD: </b><span>{props.start_date} - {props.end_date}</span> </p>
        {props.context && <p><b>SITUATION CONTEXT: </b><span>{props.context}</span></p>}
        {props.site && <p><b>SITE: </b><span>{props.site}</span></p>}
        {props.service && <p><b>SERVICE: </b><span>{props.service}</span></p>}
        {props.group && <p><b>GROUP: </b><span>{props.group}</span></p>}
    </div>;
