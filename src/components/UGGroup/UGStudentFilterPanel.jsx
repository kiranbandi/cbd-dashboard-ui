import React, { Component } from 'react';
import moment from 'moment';
import ReactSelect from 'react-select';

const defaultDateValue = moment().format('MM/DD/YYYY');

export default class StudentFilterPanel extends Component {

    render() {

        const { studentList, currentStudent, onStudentSelect,
            onSubmit, onCheckboxChange, dateFilterActive } = this.props;

        // Process student names so they match the react select format
        const studentOptions = _.map(studentList, (d) => ({ 'label': d.name, 'value': d.name }));
        const currentStudentValue = _.find(studentOptions, (d) => d.label == currentStudent) || null;

        return (
            <div className='filter-panel faculty-filter'>
                <div className='text-xs-left advanced-filter-box normative-filter-box'>

                    <div className='react-select-root'>
                        <label className='filter-label'>Student Name</label>
                        <ReactSelect
                            placeholder='Select Student...'
                            isSearchable={true}
                            value={currentStudentValue}
                            options={studentOptions}
                            styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left', 'textTransform': 'capitalize' }) }}
                            onChange={onStudentSelect} />
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

                </div>
            </div>)
    }

}

