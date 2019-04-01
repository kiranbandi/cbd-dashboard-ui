import React, { Component } from 'react';
import { getObserverList } from '../../utils/requestServer';
import Loading from 'react-loading';
import Select from 'react-select';

export default class ExportDataTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            isfilterLoaderLoaderVisible: false,
            observerList: [],
            observerData: null
        };
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });
        // get list of all residents
        getObserverList()
            .then((observerList) => { this._isMounted && this.setState({ observerList }); })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching observer list"); })
            .finally(() => {
                this._isMounted && this.setState({ isLoaderVisible: false });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {

        const { isLoaderVisible, observerList, isfilterLoaderLoaderVisible } = this.state;
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
                                            <label className='filter-label'>Faculty Name  </label>
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
                            </div> :
                            <h2 className='text-center text-danger'>No observer information is available currently</h2>}
                    </div>}
            </div>
        );
    }
}
