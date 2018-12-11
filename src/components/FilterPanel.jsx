/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getResidentData } from '../utils/requestServer';
import { toggleFilterLoader, setResidentFilter, setResidentData } from '../redux/actions/actions';

class FilterPanel extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        let { residentFilter = {}, actions } = this.props;
        residentFilter.isAllData = event.target.checked;
        actions.setResidentFilter({ ...residentFilter });
    }

    onSubmit(event) {
        let { residentFilter = {}, actions } = this.props;
        residentFilter.startDate = document.getElementById('filter-startDate').value;
        residentFilter.endDate = document.getElementById('filter-endDate').value;
        residentFilter.residentName = document.getElementById('filter-residentName').value;
        // set all the parameters in the resident filter
        actions.setResidentFilter({ ...residentFilter });
        // toggle loader
        actions.toggleFilterLoader();
        // fetch data from server based on the filter params

        // Dirty solution but eventually all filtering will happen on the server so no point 
        //  in repeating this again.
        getResidentData(residentFilter.residentName)
            .then((residentData) => {
                // group data on the basis of EPA
                var groupedResidentData = _.groupBy(residentData, (d) => d.EPA);
                // Filter grouped data 
                if (residentFilter.isAllData === false) {
                    _.each(groupedResidentData, (epaSourceData, key) => {
                        //  filter out records not in the date range
                        var remainingRecords = _.filter(epaSourceData, (record) => {
                            return record.Date >= residentFilter.startDate && record.Date <= residentFilter.endDate;
                        })
                        if (remainingRecords.length == 0) {
                            delete groupedResidentData[key];
                        }
                        else {
                            groupedResidentData[key] = remainingRecords;
                        }
                    })
                }

                debugger;


                actions.setResidentData(groupedResidentData);
            })
            .finally(() => { actions.toggleFilterLoader(); });
    }

    render() {

        const { filterLoaderState, residentList = [], residentFilter = {} } = this.props;

        const { isAllData = false,
            residentName = '',
            startDate = (new Date()).toLocaleDateString(),
            endDate = (new Date()).toLocaleDateString() } = residentFilter;

        return (
            <div className='filter-panel m-t center-align container'>
                <h2 className="text-primary text-center m-b col-sm-12">Filter Panel</h2>
                <div className='col-sm-3 col-xs-12'>
                    <label className='filter-label'>Resident Name  </label>
                    <select id='filter-residentName' defaultValue={residentName} className="custom-select">
                        {residentList.map((val, index) => { return <option key={index} > {val}</option> })}
                    </select>
                </div>
                <div className="checkbox custom-control text-center custom-checkbox col-sm-2 col-xs-12">
                    <label className='filter-label'>
                        {"View All Records"}
                        <input id='filter-isAllData' type="checkbox" checked={isAllData} onChange={this.onChange} />
                        <span className="custom-control-indicator"></span>
                    </label>
                </div>
                <div className='col-sm-3 col-xs-12 text-center'>
                    <label className='filter-label'> Start Date</label>
                    <div className="input-group col-sm-2">
                        <span className="input-group-addon">
                            <span className="icon icon-calendar"></span>
                        </span>
                        <input type="text" id='filter-startDate' defaultValue={startDate} disabled={isAllData} className="form-control" data-provide="datepicker" />
                    </div>
                </div>

                <div className='col-sm-3 col-xs-12 text-xs-center'>
                    <label className='filter-label'> End Date</label>
                    <div className="input-group col-sm-2">
                        <span className="input-group-addon">
                            <span className="icon icon-calendar"></span>
                        </span>
                        <input type="text" id='filter-endDate' disabled={isAllData} defaultValue={endDate} className="form-control" data-provide="datepicker" />
                    </div>
                </div>

                <button type="submit" className="filter-button btn btn-primary-outline" onClick={this.onSubmit}>
                    GO
                    {filterLoaderState && <Loading className='filter-loader' type='spin' height='25px' width='25px' color='#1997c6' delay={-1} />}
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        residentFilter: state.oracle.residentFilter,
        residentList: state.oracle.residentList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ toggleFilterLoader, setResidentFilter, setResidentData }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
