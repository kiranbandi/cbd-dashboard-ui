import React from 'react';

export default (props) => {

    const { scoreData = [], onHighlightChange, patient_type, admission_type } = props,
        patient_type_group = _.groupBy(scoreData, (d) => d.patient_type),
        admission_type_group = _.groupBy(scoreData, (d) => d.admission_type);

    return <div className="filter-box-sub">
        <div className='filter-patient-type filter-box-sub-inner'>
            <h4 className='text-center'>Patient Type</h4>
            <div>
                <div onClick={onHighlightChange}
                    id={'patient-type-adult'}
                    className={'sub-group-filter ' + ((patient_type == 'adult') ? 'active' : '')} >
                    ADULT <b>{patient_type_group['adult'] ? patient_type_group['adult'].length : 0}</b>
                </div>
                <div onClick={onHighlightChange}
                    id={'patient-type-child'}
                    className={'sub-group-filter ' + ((patient_type == 'child') ? 'active' : '')}>
                    CHILD <b>{patient_type_group['child'] ? patient_type_group['child'].length : 0}</b>
                </div>
                <div onClick={onHighlightChange}
                    id={'patient-type-na'}
                    className={'sub-group-filter ' + ((patient_type == 'na') ? 'active' : '')}>
                    N/A <b>{patient_type_group['na'] ? patient_type_group['na'].length : 0}</b>
                </div>
            </div>
        </div>
        <div className='filter-admission-type filter-box-sub-inner'>
            <h4 className='text-center'>Admission Type</h4>
            <div>
                <div onClick={onHighlightChange}
                    id={'admission-type-in'}
                    className={'sub-group-filter ' + ((admission_type == 'in') ? 'active' : '')}>
                    IN <b>{admission_type_group['in'] ? admission_type_group['in'].length : 0}</b>
                </div>
                <div onClick={onHighlightChange}
                    id={'admission-type-out'}
                    className={'sub-group-filter ' + ((admission_type == 'out') ? 'active' : '')}>
                    OUT <b>{admission_type_group['out'] ? admission_type_group['out'].length : 0}</b>
                </div>
                <div onClick={onHighlightChange}
                    id={'admission-type-na'}
                    className={'sub-group-filter ' + ((admission_type == 'na') ? 'active' : '')}>
                    N/A <b>{admission_type_group['na'] ? admission_type_group['na'].length : 0}</b>
                </div>
            </div>
        </div>
    </div >

}
