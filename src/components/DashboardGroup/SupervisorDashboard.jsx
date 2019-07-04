import React, { Component } from 'react';
import { getObserverList, getObserverData } from '../../utils/requestServer';
import templateEpaSourceMap from '../../utils/epaSourceMap';
import Loading from 'react-loading';
import StatCard from '../InfoPanelGroup/StatCard';
import { customFilter } from '../../utils/genericUtility';
import _ from 'lodash';
import ReactTable from 'react-table';

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
            observerDataList: []
        };
        this._isMounted = false;
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });
        // get list of all residents
        getObserverList()
            .then((observerList) => {
                this._isMounted && this.setState({ observerList: _.sortBy(observerList, (d) => d.name) });
            })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching observer list"); })
            .finally(() => {
                this._isMounted && this.setState({ isLoaderVisible: false });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSubmit(event) {
        event.preventDefault();
        // toggle loader before fetching data
        this.setState({ isfilterLoaderLoaderVisible: true });

        const observerName = document.getElementById('filter-observername').value;
        getObserverData(observerName)
            .then((observerDataList) => {

                try {
                    // modify EPA labels
                    observerDataList.map((d) => {
                        let tempEPA = d['EPA'].split(".");
                        d['EPA'] += " - " + templateEpaSourceMap[tempEPA[0]].subRoot[d['EPA']];
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


    render() {

        const { isLoaderVisible, observerList, isfilterLoaderLoaderVisible, observerDataList = [] } = this.state;

        let wordsPerComment = 0, expiredRecords = 0, averageEPAScore = 0, properObserverDataList = [];


        if (observerDataList.length > 0) {
            // Get the non expired records 
            properObserverDataList = observerDataList.filter((d) => !d.isExpired);
            expiredRecords = observerDataList.length - properObserverDataList.length;
            averageEPAScore = Math.round((_.meanBy(properObserverDataList, (d) => (+d.Rating || 0)) || 0) * 100) / 100;
            wordsPerComment = Math.round((_.meanBy(properObserverDataList, (d) => (d.Feedback.split(" ").length)) || 0));
        }

        return (
            <div className='supervisor-dashboard-container center-align'>
                {isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div className='m-t-md'>
                        {observerList.length > 0 ?
                            <div>
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
                                        <StatCard title='EPAs observed' type='info' metric={properObserverDataList.length} />
                                        <StatCard title='EPAs Expired' type='success' metric={expiredRecords} />
                                        <StatCard title='Average EPA Score' type='primary' metric={averageEPAScore} />
                                        <StatCard title='Average words per comment' type='danger' metric={wordsPerComment} />

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
