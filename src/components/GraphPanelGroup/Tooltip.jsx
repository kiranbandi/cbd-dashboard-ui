import React from 'react';

export default (props) =>
    <div className='graph-tooltip' style={{ 'left': props.x, 'top': props.y }}>
        <p><b>DATE: </b><span>{props.date}</span> </p>
        <p><b>SITUATION CONTEXT: </b><span>{props.context}</span></p>
        <p><b>OBSERVER NAME: </b><span>{props.name}</span></p>
        <p><b>OBSERVER TYPE: </b><span>{props.type}</span></p>
        <p><b>FEEDBACK: </b><span>{props.feedback}</span></p>
    </div>;
