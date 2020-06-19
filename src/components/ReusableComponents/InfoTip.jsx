import React from 'react';

export default (props) => {
    const { isDark = false, info = '' } = props;
    return <span className={'icon icon-info-with-circle ' + (isDark ? 'dark' : '')}
        data-tip={info}> </span>
}


{/* <InfoTip info='asd'/> */}