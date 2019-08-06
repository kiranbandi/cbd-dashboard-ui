import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { getAllData, getResidentList } from '../../utils/requestServer';
import moment from 'moment';
import { setResidentList } from '../../redux/actions/actions';
import Loading from 'react-loading';
import ReactTable from 'react-table';
import { customFilter } from '../../utils/genericUtility';

const columns = [{
    Header: 'Resident Name',
    accessor: 'resident_name',
    className: 'text-left',
    filterMethod: customFilter
}, {
    Header: 'Phase',
    accessor: 'phase',
    className: 'text-left uppercase-push',
    filterMethod: customFilter
},
{
    Header: 'No of Records',
    accessor: 'record_count',
    className: 'text-center',
    filterMethod: customFilter
},
{
    Header: 'EPAs per week',
    accessor: 'epa_per_week',
    className: 'text-center',
    filterMethod: customFilter
},
{
    Header: 'Expired EPAs',
    accessor: 'expired',
    className: 'text-center',
    filterMethod: customFilter
}];

class NormativeDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            filterLoaderState: false,
            residentRecords: [],
            isAllData: true,
            startDate: moment().format('MM/DD/YYYY'),
            endDate: moment().format('MM/DD/YYYY')
        };
        this._isMounted = false;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        const { residentList = [] } = this.props;

        if (residentList.length == 0) {
            // turn loader on
            this.setState({ isLoaderVisible: true });
            // get list of all residents
            getResidentList()
                .then((residentList) => { this.props.actions.setResidentList(residentList) })
                // toggle loader again once the request completes
                .catch(() => { console.log("error in fetching resident list"); })
                .finally(() => {
                    this._isMounted && this.setState({ isLoaderVisible: false });
                });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    onSubmit() {

        const { isAllData } = this.state;

        const startDate = document.getElementById('normative-filter-startDate').value;
        const endDate = document.getElementById('normative-filter-endDate').value;

        event.preventDefault();
        // toggle loader before fetching data
        this.setState({ filterLoaderState: true, startDate, endDate });
        // get data of all residents
        getAllData()
            .then((data) => {
                const residentRecords = isAllData ? data : _.filter(data, (d) => {
                    return moment(d.observation_date, 'YYYY-MM-DD').isAfter(moment(startDate, 'MM/DD/YYYY')) && moment(d.observation_date, 'YYYY-MM-DD').isBefore(moment(endDate, 'MM/DD/YYYY'));
                })
                this.setState({ residentRecords });
            })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching all records"); })
            .finally(() => {
                this._isMounted && this.setState({ filterLoaderState: false });
            });
    }

    onChange() {
        this.setState({ isAllData: !this.state.isAllData });
    }

    processRecordsToTabularFormat(residentRecords, residentList, startDate, endDate, isAllData) {
        // // split expired and non expired epas
        // let splitRecords = _.partition(recordsInPeriod, (d) => !d.isExpired);

        if (residentRecords.length > 0) {

            const recordsGroupedByResident = _.groupBy(residentRecords, (d) => d.username);

            return _.map(residentList, (resident) => {

                const recordsForSpecificResident = recordsGroupedByResident[resident.username] || [];


                let startDate = moment("01-07-2018", "DD-MM-YYYY");

                // All records we have are from 1st July 2018 , so if someone has 
                //  a valid program start date and this date is after the July 2018 then we use it
                // if not we assume he was from a batch earlier.
                if (resident.programStartDate && moment(resident.programStartDate).isAfter(startDate)) {
                    startDate = moment(resident.programStartDate);
                }

                // Get the number of weeks that have passed since the start of the program
                const weeksPassed = (moment().diff(startDate, "weeks"));

                let averageEPAScoreWeek;

                const weeksInPeriod = (moment(endDate, 'MM/DD/YYYY').diff(moment(startDate, 'MM/DD/YYYY'), "weeks"));

                if (isAllData) {
                    averageEPAScoreWeek = Math.round((recordsForSpecificResident.length / weeksPassed) * 100) / 100;
                }
                else {
                    averageEPAScoreWeek = weeksInPeriod != 0 ? Math.round((recordsForSpecificResident.length / weeksInPeriod) * 100) / 100 : 0
                }

                return {
                    'resident_name': resident.fullname,
                    'phase': resident.currentPhase.split("-").join(" "),
                    'record_count': recordsForSpecificResident.length,
                    'epa_per_week': averageEPAScoreWeek,
                    'expired': _.filter(recordsForSpecificResident, (d) => d.isExpired).length
                };

            });


        }

        return [];
    }


    render() {

        const { isAllData, startDate, endDate, filterLoaderState, residentRecords = [] } = this.state,
            { residentList = [] } = this.props;

        const processedRecords = this.processRecordsToTabularFormat(residentRecords, residentList, startDate, endDate, isAllData);

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let tableWidth = document.body.getBoundingClientRect().width - 125;

        return (
            <div className='m-a normative-data-container'>

                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div>

                        <div className='filter-panel'>
                            <div className='text-xs-left advanced-filter-box normative-filter-box'>
                                <div className="checkbox custom-control text-center custom-checkbox">
                                    <label className='filter-label'>
                                        {"All Records"}
                                        <input id='filter-isAllData' type="checkbox" checked={isAllData} onChange={this.onChange} />
                                        <span className="custom-control-indicator"></span>
                                    </label>
                                </div>
                                <div className='date-box'>
                                    <label className='filter-label'> Start Date</label>
                                    <div className="input-group col-sm-2">
                                        <span className="input-group-addon">
                                            <span className="icon icon-calendar"></span>
                                        </span>
                                        <input type="text" id='normative-filter-startDate' defaultValue={startDate} disabled={isAllData} className="form-control" data-provide="datepicker" />
                                    </div>
                                </div>
                                <div className='date-box'>
                                    <label className='filter-label'> End Date</label>
                                    <div className="input-group col-sm-2">
                                        <span className="input-group-addon">
                                            <span className="icon icon-calendar"></span>
                                        </span>
                                        <input type="text" id='normative-filter-endDate' disabled={isAllData} defaultValue={endDate} className="form-control" data-provide="datepicker" />
                                    </div>
                                </div>
                                <div className='text-xs-left button-box'>
                                    <button type="submit" className="filter-button btn btn-primary-outline" onClick={this.onSubmit}>
                                        GET RECORDS
                                        {filterLoaderState && <Loading className='filter-loader' type='spin' height='25px' width='25px' color='white' delay={-1} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {processedRecords.length > 0 &&
                            <div className='table-box' style={{ width: tableWidth - 25 }}>
                                <ReactTable
                                    data={processedRecords}
                                    columns={columns}
                                    defaultPageSize={10}
                                    resizable={false}
                                    filterable={true}
                                    className='-highlight'
                                    defaultSorted={[{ id: "resident_name", desc: true }]} />
                            </div>}
                    </div>
                }
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ setResidentList }, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        residentList: state.oracle.residentList
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NormativeDashboard);
