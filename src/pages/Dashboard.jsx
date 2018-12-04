import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getResidentList, getResidentData } from '../utils/requestServer';
import { setResidentList, toggleLoader, toggleFilterLoader, setResidentFilter } from '../redux/actions/actions';
import Loading from 'react-loading';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { residentList } = this.props;
        if (residentList == null) {
            // toggle loader before fetching data
            this.props.actions.toggleLoader();
            // get list of all residents
            getResidentList()
                .then((residentList) => {
                    this.props.actions.setResidentList(residentList);
                })
                // toggle loader again once the request completes
                .catch(() => { console.log("error in fetching resident list"); })
                .finally(() => {
                    this.props.actions.toggleLoader();
                });
        }
    }

    onChange(event) {
        let { residentFilter = {}, actions } = this.props;
        residentFilter.isAllData = event.target.checked;
        actions.setResidentFilter({ ...residentFilter });
    }

    onSubmit(event) {
        let { residentFilter = {}, actions } = this.props;
        residentFilter.startDate = document.getElementById('filter-startDate').value;
        residentFilter.endDate = document.getElementById('filter-startDate').value;
        residentFilter.residentName = document.getElementById('filter-residentName').value;
        // set all the parameters in the resident filter
        actions.setResidentFilter({ ...residentFilter });
        // toggle loader
        actions.toggleFilterLoader();
        // fetch data from server based on the filter params
        getResidentData(residentFilter.residentName)
            .then()
            .finally(() => { actions.toggleFilterLoader(); });

    }

    render() {
        let { loaderState, filterLoaderState, residentList = [], residentFilter = {} } = this.props;

        const { isAllData = false,
            residentName = '',
            startDate = (new Date()).toLocaleDateString(),
            endDate = (new Date()).toLocaleDateString() } = residentFilter;

        return (
            <div className='dashboard-root m-t container'>
                {loaderState ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={-1} /> :
                    <div className='m-t-md'>
                        {(residentList != null && residentList.length > 0) ?
                            <div className='filter-panel m-t center-align'>
                                <h2 className="text-primary text-xs-center m-b">Filter Panel</h2>
                                <label className='filter-label'> Select Resident Name  </label>
                                <select id='filter-residentName' defaultValue={residentName} className="custom-select">
                                    {residentList.map((val, index) => { return <option key={index} > {val}</option> })}
                                </select>
                                <div className="checkbox custom-control custom-checkbox m-l-md">
                                    <label className='filter-label'>
                                        {"View All Data"}
                                        <input id='filter-isAllData' type="checkbox" checked={isAllData} onChange={this.onChange} />
                                        <span className="custom-control-indicator"></span>
                                    </label>
                                </div>
                                <label className='filter-label'> Start Date</label>
                                <div className="input-group col-sm-2">
                                    <span className="input-group-addon">
                                        <span className="icon icon-calendar"></span>
                                    </span>
                                    <input type="text" id='filter-startDate' defaultValue={startDate} disabled={isAllData} className="form-control" data-provide="datepicker" />
                                </div>
                                <label className='filter-label'> End Date</label>
                                <div className="input-group col-sm-2">
                                    <span className="input-group-addon">
                                        <span className="icon icon-calendar"></span>
                                    </span>
                                    <input type="text" id='filter-endDate' disabled={isAllData} defaultValue={endDate} className="form-control" data-provide="datepicker" />
                                </div>
                                <button type="submit" className="filter-button btn btn-primary-outline" onClick={this.onSubmit}>GO
                                    {filterLoaderState && <Loading className='filter-loader' type='spin' height='25px' width='25px' color='#1997c6' delay={-1} />}
                                </button>
                            </div> :
                            <h2 className='text-center text-danger'>No resident information is available currently</h2>
                        }
                    </div>
                }
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ toggleLoader, setResidentList, setResidentFilter, toggleFilterLoader }, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        residentList: state.oracle.residentList,
        residentData: state.oracle.residentData,
        loaderState: state.oracle.loaderState,
        filterLoaderState: state.oracle.filterLoaderState,
        residentFilter: state.oracle.residentFilter
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



