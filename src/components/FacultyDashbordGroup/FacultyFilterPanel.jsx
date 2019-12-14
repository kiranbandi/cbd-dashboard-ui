import React, { Component } from 'react';
import moment from 'moment';

const defaultDateValue = moment().format('MM/DD/YYYY');

export default class FacultyFilterPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateFilterActive: false
        };
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
    }

    onCheckboxChange() {
        this.setState({ dateFilterActive: !this.state.dateFilterActive });
    }


    render() {

        const { onSubmit, rotationList } = this.props,
            { dateFilterActive } = this.state;

        return (
            <div className='filter-panel'>
                <div className='text-xs-left advanced-filter-box normative-filter-box'>

                    <div className='phase-box'>
                        <label className='filter-label'>Resident Rotation </label>
                        <select id='filter-rotationList' className="custom-select">
                            {rotationList.map((val, index) => { return <option key={index} value={val.label}> {val.label + " (" + val.count + ")"}</option> })}
                        </select>
                    </div>

                    <div className="checkbox custom-control text-center custom-checkbox">
                        <label className='filter-label'>
                            {"Filter by Date"}
                            <input id='filter-FCdateFilterActive' type="checkbox" checked={dateFilterActive} onChange={this.onCheckboxChange} />
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
                                <input type="text" id='faculty-filter-startDate' defaultValue={defaultDateValue} disabled={!dateFilterActive} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>
                        <div className='date-box'>
                            <label className='filter-label'> End Date</label>
                            <div className="input-group col-sm-2">
                                <span className="input-group-addon">
                                    <span className="icon icon-calendar"></span>
                                </span>
                                <input type="text" id='faculty-filter-endDate' defaultValue={defaultDateValue} disabled={!dateFilterActive} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>
                    </span>}

                    <div className='text-xs-left button-box'>
                        <button type="submit" className="filter-button btn btn-primary-outline" onClick={onSubmit}>
                            GET RECORDS
                        </button>
                    </div>
                </div>
            </div>)
    }

}

