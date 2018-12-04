import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getResidentList } from '../utils/requestServer';
import { setResidentList, getResidentData, toggleLoader } from '../redux/actions/actions';
import Loading from 'react-loading';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
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

    onChange() {

    }



    render() {
        let { loaderState, residentList = [], residentFilter = {} } = this.props;

        const { isAllData = false, residentName = '', startDate = new Date(), endDate = new Date() } = residentFilter;

        return (
            <div className='dashboard-root m-t container'>
                {loaderState ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={-1} /> :
                    <div className='m-t-md'>
                        {(residentList != null && residentList.length > 0) ?
                            <div className='filter-panel m-t center-align'>
                                <h2 className="text-primary text-xs-center m-b">Filter Panel</h2>
                                <label className='filter-label'> Select Resident Name  </label>
                                <select className="custom-select" onChange={this.onChange}>
                                    {residentList.map((val, index) => <option key={index}>{val}</option>)}
                                </select>
                                <div className="checkbox custom-control custom-checkbox m-l-md">
                                    <label className='filter-label'>
                                        {"View All Data"}
                                        <input type="checkbox" checked={isAllData} onChange={this.onChange} />
                                        <span className="custom-control-indicator"></span>
                                    </label>
                                </div>
                                <label className='filter-label'> Start Date</label>
                                <div className="input-group col-sm-2">
                                    <span className="input-group-addon">
                                        <span className="icon icon-calendar"></span>
                                    </span>
                                    <input type="text" disabled={true} defaultValue="01/01/2015" className="form-control" data-provide="datepicker" onChange={this.onChange} />
                                </div>
                                <label className='filter-label'> End Date</label>
                                <div className="input-group col-sm-2">
                                    <span className="input-group-addon">
                                        <span className="icon icon-calendar"></span>
                                    </span>
                                    <input type="text" disabled={true} defaultValue="01/01/2016" className="form-control" data-provide="datepicker" onChange={this.onChange} />
                                </div>
                                <button type="submit" class="btn btn-primary-outline">GO <span class="icon icon-cw"></span></button>
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
        actions: bindActionCreators({ toggleLoader, setResidentList }, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        residentList: state.oracle.residentList,
        residentData: state.oracle.residentData,
        loaderState: state.oracle.loaderState,
        residentFilter: state.oracle.residentFilter
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



