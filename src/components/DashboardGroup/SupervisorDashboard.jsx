import React, { Component } from 'react';
import { getObserverList, getObserverData } from '../../utils/requestServer';
import Loading from 'react-loading';
import StatCard from '../InfoPanelGroup/StatCard';
import moment from 'moment';
import _ from 'lodash';

export default class ExportDataTab extends Component {

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
            .then((observerList) => { this._isMounted && this.setState({ observerList: _.sortBy(observerList) }); })
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
                this._isMounted && this.setState({ observerDataList });
            })
            .catch(() => { console.log("error in fetching record list for observers"); })
            .finally(() => {
                this._isMounted && this.setState({ isfilterLoaderLoaderVisible: false });
            });
    }


    render() {

        const { isLoaderVisible, observerList, isfilterLoaderLoaderVisible, observerDataList = [] } = this.state;


        let doveScale = 0, last3MonthRecords = 0, expiredRecords = 0, averageEPAScore = 0;

        if (observerDataList.length > 0) {
            //  Get the records that fall in that 3 month period
            last3MonthRecords = observerDataList.filter((record) => {
                return moment(record.Date, 'YYYY-MM-DD').isAfter(moment().subtract(3, 'month'));
            });

            //  Get the records that fall in that 3 month period
            expiredRecords = observerDataList.filter((d) => d.isExpired || false).length;
            averageEPAScore = Math.round(_.meanBy(observerDataList, (d) => (+d.EPA || 0))*100)/100;
            doveScale = Math.round(observerDataList.filter((d) => (+d.Rating) >= 4).length * 100 / observerDataList.length);
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
                                                {observerList.map((val, index) => { return <option key={index} value={val}> {val}</option> })}
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
                                        <StatCard title='EPAs observed' type='info' metric={observerDataList.length} />
                                        <StatCard title='EPAs Expired' type='success' metric={expiredRecords} />
                                        {/* <StatCard title='EPAs observed in the last 3 Months' type='success' metric={last3MonthRecords.length} /> */}
                                        <StatCard title='Average EPA Score' type='primary' metric={averageEPAScore} />
                                        <StatCard title='DOVE Factor' type='danger' metric={doveScale + "%"} />
                                     
                                    </div>}
                            </div> :
                            <h2 className='text-center text-danger'>No observer information is available currently</h2>}
                    </div>}
            </div>
        );
    }
}

