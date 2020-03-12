import React, { Component } from 'react';
import _ from 'lodash';
import RotationSchedule from './UGRotationSchedule';

export default class InfoPanel extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let { width, studentRecords, studentInfo = {}, programInfo } = this.props;

        return (
            <div className='info-panel'>
                <div className='info-panel-inner'>
                    {!!studentRecords &&
                        <RotationSchedule
                            width={width}
                            studentRecords={studentRecords}
                            residentInfo={studentInfo}
                            rotationRequired={programInfo.rotationRequired} />}
                </div>
            </div>
        );
    }
}
