import React, { Component } from 'react';
import moment from 'moment';
import ReactSelect from 'react-select';

const defaultDateValue = moment().format('MM/DD/YYYY');

export default class StudentFilterPanel extends Component {

    render() {

        const { studentList, currentStudent, onStudentSelect,
            rotationList, currentRotation, onRotationSelect,
            showUncommencedEPA, showUncommencedEPAToggle, onSubmit,
            onCheckboxChange, dateFilterActive } = this.props;

        // Process student names so they match the react select format
        const studentOptions = _.map(studentList, (d) => ({ 'label': d.name, 'value': d.name, 'nsid': d.nsid }));
        const currentStudentValue = _.find(studentOptions, (d) => d.nsid == currentStudent) || null;

        // Process rotation names so they match the react select format
        let rotationOptions = _.map(rotationList, (d) => ({ 'label': d, 'value': d }));
        rotationOptions.unshift({ 'label': 'All', 'value': 'all' });
        const currenRotationValue = _.find(rotationOptions, (d) => d.label == currentRotation) || null;




        return (
            <div className='filter-panel faculty-filter'>
                <div className='text-xs-left advanced-filter-box normative-filter-box'>
                
                    <div style={{ width: 200, 'display': 'inline-block', 'marginRight': '10px' }}>
                        <ReactSelect
                            placeholder='Select Student...'
                            isSearchable={true}
                            value={currentStudentValue}
                            options={studentOptions}
                            styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left', 'textTransform': 'capitalize' }) }}
                            onChange={onStudentSelect} />
                    </div>

                    <div style={{ width: 200, 'display': 'inline-block', 'marginRight': '10px' }}>
                        <ReactSelect
                            placeholder='Select Rotation...'
                            isSearchable={true}
                            value={currenRotationValue}
                            options={rotationOptions}
                            styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left', 'textTransform': 'capitalize' }) }}
                            onChange={onRotationSelect} />
                    </div>

                    <div className="checkbox custom-control text-center custom-checkbox">
                        <label className='filter-label'>
                            {"Filter by Date"}
                            <input id='filter-FCdateFilterActive' type="checkbox" checked={dateFilterActive} onChange={onCheckboxChange} />
                            <span className="custom-control-indicator"></span>
                        </label>
                    </div>

                    {dateFilterActive && <span>
                        <div className='date-box'>
                            <label className='filter-label'> Start Date</label>
                            <div className="input-group col-sm-2">
                                <span className="input-group-addon">
                                    <span className="icon icon-calendar"></span>
                                </span>
                                <input type="text" id='student-filter-startDate' defaultValue={defaultDateValue} disabled={!dateFilterActive} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>
                        <div className='date-box'>
                            <label className='filter-label'> End Date</label>
                            <div className="input-group col-sm-2">
                                <span className="input-group-addon">
                                    <span className="icon icon-calendar"></span>
                                </span>
                                <input type="text" id='student-filter-endDate' defaultValue={defaultDateValue} disabled={!dateFilterActive} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>
                    </span>}
                    {dateFilterActive && <div className='text-xs-left button-box'>
                        <button type="submit" className="filter-button btn btn-primary-outline" onClick={onSubmit}>
                            FILTER DATES
                        </button>
                    </div>}

                    <p className='m-t m-b-0'> * When a rotation is selected, observations corresponding to that rotation turn into bigger points while the rest appear smaller.</p>
                    <p> * When a date period is set, observations that fall into the selected time period turn into diamond shaped points.</p>

                </div>

            </div>)
    }

}

