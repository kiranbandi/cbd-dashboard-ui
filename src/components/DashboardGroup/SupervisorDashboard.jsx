import React, { Component } from 'react';
import { getObserverList, getObserverData, getAllData } from '../../utils/requestServer';
import Loading from 'react-loading';
import { StatCard } from '../';
import { customFilter } from '../../utils/genericUtility';
import _ from 'lodash';
import ReactTable from 'react-table';
import SupervisorGraph from '../SupervisorDashbordGroup/SupervisorGraph';
import { RadioButton } from '../';
import moment from 'moment';
import SupervisorTable from '../SupervisorDashbordGroup/SupervisorTable';


const columns = [{
    Header: 'Date',
    accessor: 'Date',
    maxWidth: 150,
    className: 'text-center',
    filterMethod: customFilter
}, {
    Header: 'Resident Name',
    accessor: 'Resident_Name',
    maxWidth: 150,
    filterMethod: customFilter
},
{
    Header: 'EPA',
    accessor: 'EPA',
    maxWidth: 300,
    className: 'epa-cell',
    filterMethod: customFilter
},
{
    Header: 'Rating',
    accessor: 'Rating',
    maxWidth: 60,
    className: 'text-center',
    filterMethod: customFilter
},
{
    Header: 'Feedback',
    accessor: 'Feedback',
    className: 'feedback-cell',
    filterMethod: customFilter
}]

export default class SupervisorDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            isfilterLoaderLoaderVisible: false,
            observerList: [],
            observerDataList: [],
            trackType: 'expired_epa_percentage',
            startDate: null,
            endDate: null,
            dateFilterActive: false
        };
        this._isMounted = false;
        this.onSelectObserver = this.onSelectObserver.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.radioChange = this.radioChange.bind(this);
        this.onFilterDatesCheckboxChange = this.onFilterDatesCheckboxChange.bind(this);
        this.filterDate = this.filterDate.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });
        // get list of all residents
        try {
            let observerList = await getObserverList();
            this._isMounted && this.setState({ observerList: _.sortBy(observerList, (d) => d.name) });

            try {
                let allObserverDataList = Object.entries(_.groupBy(await getAllData(), d => d.observer_name)).map(entry => ({
                    name: entry[0],
                    data: entry[1]
                }));
                this._isMounted && this.setState({ allObserverDataList });

                console.log(this.props.programInfo);
                console.log(allObserverDataList);
            } catch (e) {
                console.log(e);
            }
        } catch (e) {
            console.log("error in fetching observer list");
        } finally {
            this._isMounted && this.setState({ isLoaderVisible: false });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSelectObserver(observerName) {
        // toggle loader before fetching data
        this.setState({ isfilterLoaderLoaderVisible: true });

        if (document.getElementById('filter-observername').value != observerName) {
            document.getElementById('filter-observername').value = observerName;
        }

        this.setState({ currentObserverName: observerName });
        getObserverData(observerName)
            .then((observerDataList) => {

                try {
                    // modify EPA labels
                    observerDataList.map((d) => {
                        let tempEPA = d['EPA'].split(".");
                        d['EPA'] += " - " + this.props.programInfo.epaSourceMap[tempEPA[0]].subRoot[d['EPA']];
                    });
                }
                catch (error) { console.log(error); }
                this._isMounted && this.setState({ observerDataList });
            })
            .catch(() => { console.log("error in fetching record list for observers"); })
            .finally(() => {
                this._isMounted && this.setState({ isfilterLoaderLoaderVisible: false });
            });
    }

    onSubmit(event) {
        event.preventDefault();

        const observerName = document.getElementById('filter-observername').value;
        this.onSelectObserver(observerName);
    }


    radioChange(event) {
        this.setState({ trackType: event.target.value });
    }

    onFilterDatesCheckboxChange() {
        this.setState({ dateFilterActive: !this.state.dateFilterActive });
    }

    filterDate() {
        const startDate = this._filterStartDateInput ? this._filterStartDateInput.value : null;
        const endDate = this._filterEndDateInput ? this._filterEndDateInput.value : null;
        this.setState({
            startDate,
            endDate
        });
    }

    render() {

        const { isLoaderVisible, observerList, isfilterLoaderLoaderVisible, observerDataList = [] } = this.state;

        let wordsPerComment = 0, expiredRecords = 0, expiredRecordPrecentage = 0, averageEPAScore = 0, properObserverDataList = [];
        let wordsPerCommentInDateRange = 0, expiredRecordsInDateRange = 0, expiredRecordPrecentageInDateRange = 0, averageEPAScoreInDateRange = 0, properObserverDataListInDateRange = [];


        if (observerDataList.length > 0) {
            // Get the non expired records 
            properObserverDataList = observerDataList.filter((d) => !d.isExpired);
            expiredRecords = observerDataList.length - properObserverDataList.length;
            expiredRecordPrecentage = Math.round(expiredRecords / observerDataList.length * 100);
            averageEPAScore = Math.round((_.meanBy(properObserverDataList, (d) => (+d.Rating || 0)) || 0) * 100) / 100;
            wordsPerComment = Math.round((_.meanBy(properObserverDataList, (d) => (d.Feedback.split(" ").length)) || 0));

            if (this.state.dateFilterActive && this.state.startDate && this.state.endDate) {
                const observerDataListInDateRange = observerDataList.filter(d =>
                    moment(d.Date, 'YYYY-MM-DD').isBetween(
                        moment(this.state.startDate, 'MM/DD/YYYY'),
                        moment(this.state.endDate, 'MM/DD/YYYY')
                    )
                );
                properObserverDataListInDateRange = observerDataListInDateRange.filter((d) => !d.isExpired);
                expiredRecordsInDateRange = observerDataListInDateRange.length - properObserverDataListInDateRange.length;
                expiredRecordPrecentageInDateRange = Math.round(expiredRecordsInDateRange / observerDataListInDateRange.length * 100);
                averageEPAScoreInDateRange = Math.round((_.meanBy(properObserverDataListInDateRange, (d) => (+d.Rating || 0)) || 0) * 100) / 100;
                wordsPerCommentInDateRange = Math.round((_.meanBy(properObserverDataListInDateRange, (d) => (d.Feedback.split(" ").length)) || 0));
            }
        }

        const dateFilterDefaultValue = moment().format('MM/DD/YYYY');

        const overallWidth = document.body.getBoundingClientRect().width - 125;

        return (
            <div className='supervisor-dashboard-container center-align'>
                {isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div className='m-t-md'>
                        {observerList.length > 0 ?
                            <div>
                                <div className='supervisor-graph'>
                                    <div className="checkbox custom-control text-center custom-checkbox">
                                        <label className='filter-label'>
                                            {"Filter by Date"}
                                            <input id='filter-dateFilterActive' type="checkbox" checked={this.state.dateFilterActive} onChange={this.onFilterDatesCheckboxChange} />
                                            <span className="custom-control-indicator"></span>
                                        </label>
                                    </div>
                                    {
                                        this.state.dateFilterActive &&
                                        <div className="date-box-container">
                                            <div className='date-box'>
                                                <label className='filter-label'>Period</label>
                                                <div className="input-group col-sm-2">
                                                    <span className="input-group-addon">
                                                        <span className="icon icon-calendar"></span>
                                                    </span>
                                                    <input type="text" id='filter-startDate' className="form-control" defaultValue={dateFilterDefaultValue} data-provide="datepicker" ref={r => this._filterStartDateInput = r} />
                                                </div>
                                            </div>
                                            <span className='inner-splice'>-</span>
                                            <div className='date-box trailing'>
                                                <div className="input-group col-sm-2">
                                                    <span className="input-group-addon">
                                                        <span className="icon icon-calendar"></span>
                                                    </span>
                                                    <input type="text" id='filter-endDate' className="form-control" defaultValue={dateFilterDefaultValue} data-provide="datepicker" ref={r => this._filterEndDateInput = r} />
                                                </div>
                                            </div>
                                            <button className="btn btn-primary-outline m-t-0 m-a" type="submit" onClick={this.filterDate}>
                                                <span className='download-span'>{"Filter Dates"} </span>
                                            </button>
                                        </div>
                                    }
                                    <div className='sub-filter'>
                                        <div className='radio-button-container'>
                                            <RadioButton value={'expired_epa_percentage'} id={'track_expired_epa_ratio'} className='track-radio' name='track-select'
                                                label={"Expired EPA Percentage"}
                                                onChange={this.radioChange}
                                                checked={this.state.trackType == 'expired_epa_percentage'} />
                                            <RadioButton value={'entrustment_score'} id={'track_entrustment_score'} className='track-radio' name='track-select'
                                                label={"Entrustment Score"}
                                                onChange={this.radioChange}
                                                checked={this.state.trackType == 'entrustment_score'} />
                                            <RadioButton value={'words_per_comment'} id={'track_words_per_comment'} className='track-radio' name='track-select'
                                                label={"Words Per Comment"}
                                                onChange={this.radioChange}
                                                checked={this.state.trackType == 'words_per_comment'} />
                                        </div>
                                    </div>
                                    <SupervisorGraph
                                        trackType={this.state.trackType}
                                        observerDataList={this.state.allObserverDataList}
                                        currentObserverName={this.state.currentObserverName}
                                        onSelectObserver={this.onSelectObserver}
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        dateFilterActive={this.state.dateFilterActive}
                                        width={overallWidth}
                                    />
                                    <SupervisorTable
                                        records={this.state.allObserverDataList}
                                        dateFilterActive={this.state.dateFilterActive}
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        width={overallWidth}
                                    />
                                </div>
                                <div className='filter-panel m-t center-align'>
                                    <div className='text-xs-center text-sm-left root-box'>
                                        <div className='name-box'>
                                            <label className='filter-label'>Faculty Name</label>
                                            <select id='filter-observername' defaultValue={''} className="custom-select">
                                                {observerList.map((val, index) => { return <option key={index} value={val.name}> {val.name}</option> })}
                                            </select>
                                        </div>
                                        <div className='text-xs-left button-box'>
                                            <button type="submit" className="filter-button btn btn-primary-outline" onClick={this.onSubmit}>
                                                GET RECORDS
                                                {isfilterLoaderLoaderVisible && <Loading className='filter-loader' type='spin' height='25px' width='25px' color='white' delay={-1} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {observerDataList.length > 0 &&
                                    <div>
                                        {
                                            (this.state.dateFilterActive && this.state.startDate && this.state.endDate) ?
                                                <div>
                                                    <StatCard dual={true} title='EPAs observed' type='info' metric={properObserverDataList.length} secondMetric={properObserverDataListInDateRange.length} />
                                                    <StatCard dual={true} title='Percentage of EPAs Expired' type='success' metric={expiredRecordPrecentage + '%'} secondMetric={expiredRecordPrecentageInDateRange + '%'} />
                                                    <StatCard dual={true} title='Average EPA Score' type='primary' metric={averageEPAScore} secondMetric={averageEPAScoreInDateRange} />
                                                    <StatCard dual={true} title='Average words per comment' type='danger' metric={wordsPerComment} secondMetric={averageEPAScoreInDateRange} />
                                                </div> :
                                                <div>
                                                    <StatCard title='EPAs observed' type='info' metric={properObserverDataList.length} />
                                                    <StatCard title='Percentage of EPAs Expired' type='success' metric={expiredRecordPrecentage + '%'} />
                                                    <StatCard title='Average EPA Score' type='primary' metric={averageEPAScore} />
                                                    <StatCard title='Average words per comment' type='danger' metric={wordsPerComment} />
                                                </div>
                                        }

                                        <div className='table-box'>
                                            <ReactTable
                                                data={properObserverDataList}
                                                columns={columns}
                                                defaultPageSize={5}
                                                resizable={false}
                                                filterable={true}
                                                className='-highlight'
                                                defaultSorted={[{ id: "Date", desc: true }]} />
                                        </div>
                                    </div>}
                            </div> :
                            <h2 className='text-center text-danger'>No observer information is available currently</h2>}
                    </div>}
            </div>
        );
    }
}
