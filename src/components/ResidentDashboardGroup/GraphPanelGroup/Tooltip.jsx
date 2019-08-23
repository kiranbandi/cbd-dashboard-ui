import React from 'react';

export default (props) =>
    <div className='graph-tooltip' style={{ 'left': props.x, 'top': props.y }}>
        <p><b>DATE: </b><span>{props.date}</span> </p>
        {props.epa && <p><b>EPA: </b><span>{props.epa}</span> </p>}
        <p><b>SITUATION CONTEXT: </b><span>{props.context}</span></p>
        <p><b>OBSERVER NAME: </b><span>{props.name}</span></p>
        <p><b>FEEDBACK: </b><span>{props.feedback}</span></p>
    </div>;
