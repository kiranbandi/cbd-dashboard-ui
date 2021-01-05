import React from 'react';

export default (props) =>
    <div className='graph-tooltip' style={{ 'left': props.x, 'top': props.y }}>
        {props.date && <p><b>DATE: </b><span>{props.date}</span> </p>}
        {props.epa && <p><b>EPA: </b><span>{props.epa}</span> </p>}
        {props.rotation && <p><b>ROTATION: </b><span>{props.rotation}</span></p>}
        {props.context && <p><b>SITUATION CONTEXT: </b><span>{props.context}</span></p>}
        {props.name && <p><b>OBSERVER NAME: </b><span>{props.name}</span></p>}
        {props.feedback && <p><b>FEEDBACK: </b><span>{props.feedback}</span></p>}
        {props.concern && <p><b className='text-danger'>PROFESSIONALISM AND SAFETY CONCERN: </b><span >{props.concern}</span></p>}
    </div>;
