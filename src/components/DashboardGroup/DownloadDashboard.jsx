import React, { Component } from 'react';
import { getAllData } from '../../utils/requestServer';
import downloadCSV from '../../utils/downloadCSV';
import Loading from 'react-loading';
import ReactTable from 'react-table';
import moment from 'moment';
import { customFilter } from '../../utils/genericUtility';

const columns = [{
    Header: 'Resident Name',
    accessor: 'resident_name',
    className: 'text-left',
    filterMethod: customFilter
}, {
    Header: 'Observer Name',
    accessor: 'observer_name',
    className: 'text-left',
    filterMethod: customFilter
}, {
    Header: 'Observation Date',
    accessor: 'observation_date',
    filterMethod: customFilter,
    className: 'text-center'
}, {
    Header: 'EPA',
    accessor: 'epa',
    className: 'text-center',
    filterMethod: customFilter
}];


export default class ExportDataTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            data: null
        };
        this._isMounted = false;
        this.downloadFile = this.downloadFile.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.filterDates = this.filterDates.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    downloadFile(event) {
        event.preventDefault();

        var data = this._reactTable.getResolvedState().sortedData.map(d => d._original);

        window.emCBD = {
            'rcmData': _.map(data, (_r) => [_r.observation_date, _r.resident_name, _r.epa, _r.observer_name, _r.observer_type, _r.rating, _r.type, _r.situation_context, _r.feedback, _r.professionalism_safety, _r.isExpired || false])
        };
        downloadCSV(['Date', 'Resident Name', 'EPA', 'Observer Name', 'Observer Type', 'Rating', 'Type', 'Situation Context', 'Feedback', 'Professionalism Safety', 'EPA Expired']);
    }

    async fetchData(event) {
        event.preventDefault();
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });

        // get list of all residents
        try {
            let data = await getAllData();
            if (data) {
                this.setState({
                    data: _.map(data, (d) => {
                        // example convert 3.10 to 310 and 3.1 to 301
                        d.epa = d.epa.split(".")[0] + (+d.epa.split(".")[1] < 10 ? '0' : '') + (d.epa.split(".")[1]);
                        return d;
                    })
                });
            }
        } catch (e) {
            console.log("error in fetching all records");
        } finally {
            this._isMounted && this.setState({ isLoaderVisible: false });
        }
    }

    filterDates() {
        this.setState({
            data: this.state.data.filter(d =>
                moment(d.observation_date, 'YYYY-MM-DD').isBetween(
                    moment(this._filterStartDateInput.value, 'MM/DD/YYYY'),
                    moment(this._filterEndDateInput.value, 'MM/DD/YYYY')
                )
            )
        });
    }

    render() {

        var startDate = moment().format('MM/DD/YYYY');
        var endDate = moment().format('MM/DD/YYYY');


        return (
            <div className='m-a export-data-container'>
                <div className="row text-center m-b p-a">
                    <p className='info-text col-xs-12 col-sm-5 m-a-0'>This page is meant purely for research purposes and can let you download the entire record collection of all residents in the program in an easily accessible CSV file.</p>
                    <p className='text-warning info-text col-xs-12 col-sm-5 m-a-0'> <span className="icon icon-info-with-circle"></span> Because of the secure nature of data involved and the fact that this is a bulk export please make sure that this file is stored and handled responsibly.</p>
                    <button className="btn btn-primary-outline bulk-export col-xs-12 col-sm-2" onClick={this.fetchData}>
                        <span className='download-span'>{"Fetch Data"} </span>
                        {this.state.isLoaderVisible && <Loading type='spin' height='30px' width='30px' color='#d6e5ff' delay={-1} />}
                    </button>
                </div>
                {
                    this.state.data &&
                    <div>
                        <div>
                            <div className='date-box'>
                                <label className='filter-label'>Period</label>
                                <div className="input-group col-sm-2">
                                    <span className="input-group-addon">
                                        <span className="icon icon-calendar"></span>
                                    </span>
                                    <input type="text" id='filter-startDate' defaultValue={startDate} className="form-control" data-provide="datepicker" ref={r => this._filterStartDateInput = r} />
                                </div>
                            </div>
                            <span className='inner-splice'>-</span>
                            <div className='date-box trailing'>
                                <div className="input-group col-sm-2">
                                    <span className="input-group-addon">
                                        <span className="icon icon-calendar"></span>
                                    </span>
                                    <input type="text" id='filter-endDate' defaultValue={endDate} className="form-control" data-provide="datepicker" ref={r => this._filterEndDateInput = r} />
                                </div>
                            </div>
                            <button className="btn btn-primary-outline m-t-0 m-a" type="submit" onClick={this.filterDates}>
                                <span className='download-span'>{"Filter Dates"} </span>
                            </button>
                            <button className="btn btn-primary-outline m-t-0 m-a download-csv-button" type="submit" onClick={this.downloadFile}>
                                <span className='download-span'>
                                    <span className="icon icon-download"></span>
                                    {"Download CSV"}
                                </span>
                            </button>
                        </div>
                        <ReactTable
                            ref={r => this._reactTable = r}
                            data={this.state.data}
                            columns={columns}
                            defaultPageSize={10}
                            resizable={false}
                            filterable={true}
                            className='-highlight' />
                    </div>
                }
            </div >
        );
    }
}
