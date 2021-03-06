import React, { Component } from 'react';
import Loading from 'react-loading';
import { STAGES_LIST } from '../../utils/programInfo';
import moment from 'moment';
import infoTooltipReference from '../../utils/infoTooltipReference';

const defaultDateValue = moment().format('MM/DD/YYYY');
// create a clone and then Add extra option all to the list
let STAGES_LIST_COPY = _.clone(STAGES_LIST);
STAGES_LIST_COPY.unshift('all-stages');

export default class NormativeFilterPanel extends Component {
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

        const { filterLoaderState, onSubmit } = this.props,
            { dateFilterActive } = this.state;

        return (
            <div className='filter-panel'>
                <div className='text-xs-left advanced-filter-box normative-filter-box'>

                    <div className='phase-box'>
                        <label className='filter-label'>Resident Stage  </label>
                        <select id='filter-phaselist' className="custom-select">
                            {STAGES_LIST_COPY.map((val, index) => { return <option key={index} value={val}> {val.split('-').join(' ')}</option> })}
                        </select>
                    </div>

                    <div className="checkbox custom-control text-center custom-checkbox">
                        <label className='filter-label'>
                            {"Filter by Date"}
                            <input id='filter-dateFilterActive' type="checkbox" checked={dateFilterActive} onChange={this.onCheckboxChange} />
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
                                <input type="text" id='normative-filter-startDate' defaultValue={defaultDateValue} disabled={!dateFilterActive} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>
                        <div className='date-box'>
                            <label className='filter-label'> End Date</label>
                            <div className="input-group col-sm-2">
                                <span className="input-group-addon">
                                    <span className="icon icon-calendar"></span>
                                </span>
                                <input type="text" id='normative-filter-endDate' defaultValue={defaultDateValue} disabled={!dateFilterActive} className="form-control" data-provide="datepicker" />
                            </div>
                        </div>
                    </span>}

                    <div className='text-xs-left button-box'>
                        <button type="submit" className="filter-button btn btn-primary-outline" onClick={onSubmit}>
                            GET RECORDS
                            {filterLoaderState && <Loading className='filter-loader' type='spin' height='25px' width='25px' color='white' delay={-1} />}
                            <s-tooltip border-width="1px" show-delay="1000" style={{ fontFamily: 'inherit' }}>{infoTooltipReference.normativeAssessment.getRecords}</s-tooltip>
                        </button>
                    </div>
                </div>
            </div>)
    }

}

