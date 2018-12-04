import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getResidentList, getResidentData } from '../utils/requestServer';
import { setResidentList, toggleLoader, toggleFilterLoader, setResidentFilter, setResidentData } from '../redux/actions/actions';
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
            .then((residentData) => {
                // group data on the basis of EPA
                var groupedResidentData = _.groupBy(residentData, (d) => d.EPA);
                actions.setResidentData(groupedResidentData);
            })
            .finally(() => { actions.toggleFilterLoader(); });

    }

    render() {
        let { loaderState, residentData, filterLoaderState, residentList = [], residentFilter = {} } = this.props;

        const { isAllData = false,
            residentName = '',
            startDate = (new Date()).toLocaleDateString(),
            endDate = (new Date()).toLocaleDateString() } = residentFilter;


        var epaSourceMap = {
            1: {
                'topic': 'Vitae, ratione minus', subRoot: {
                    '1.1': 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
                    '1.2': 'Voluptatibus eius accusamus fugit voluptatem',
                    '1.3': 'id consequatur pariatur, quasi doloremque tempore corrupti deserunt'
                }
            },
            2: {
                'topic': 'Dolorem minima nihil', subRoot: {
                    '2.1': 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
                    '2.2': 'Voluptatibus eius accusamus fugit voluptatem',
                    '2.2': 'Voluptatibus eius accusamus fugit voluptatem',
                    '2.4': 'id consequatur pariatur, quasi doloremque tempore corrupti deserunt'
                }
            },
            3: {
                'topic': 'Nesciunt odit ratione', subRoot: {
                    '3.13': 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
                    '3.14': 'Voluptatibus eius accusamus fugit voluptatem',
                    '3.4': 'id consequatur pariatur, quasi doloremque tempore corrupti deserunt'
                }
            }
        }

        let epaSourcesThatExist = {};


        if (residentData != null && Object.keys(residentData).length > 0) {
            epaSourcesThatExist = _.groupBy(Object.keys(residentData), (key) => { return key.split('.')[0] });
        }

        return (
            <div className='dashboard-root m-t' >
                {
                    loaderState ?
                        <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                        < div className='m-t-md' >
                            {(residentList != null && residentList.length > 0) ?
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

                                    <button type="submit" className="filter-button btn btn-primary-outline" onClick={this.onSubmit}>GO
                                    {filterLoaderState && <Loading className='filter-loader' type='spin' height='25px' width='25px' color='#1997c6' delay={-1} />}
                                    </button>
                                </div> :
                                <h2 className='text-center text-danger'>No resident information is available currently</h2>
                            }

                            {
                                (residentData != null && Object.keys(residentData).length > 0) &&

                                <div className='m-a-md graph-panel-root'>
                                    <div className='title-root'>
                                        <h4 className='title-bar small-container'>EPA(Entrustable Professional Activity)</h4>
                                        <h4 className='title-bar small-container'>Observation Count</h4>
                                        <h4 className='title-bar big-container'>Score History</h4>
                                    </div>

                                    <div className='p-l-md epa-root small-container'>
                                        {_.map(epaSourcesThatExist, (epaSources, innerKey) => {
                                            return <div key={'inner-epa-' + innerKey}>
                                                <div className='inner-epa-head'>
                                                    <span className="icon icon-chevron-right"></span>
                                                    <span className='epa-label' >{innerKey + " - " + epaSourceMap[innerKey].topic}</span>
                                                </div>
                                                <div className='inner-epa-body'>
                                                    {_.map(epaSources, (epaSource, sourceKey) => {
                                                        return <span className='epa-label inner-offset-label' key={'epa-cell-' + sourceKey} > {epaSource + " - " + epaSourceMap[innerKey].subRoot[epaSource]}</span>
                                                    })}
                                                </div>
                                            </div>;
                                        })}
                                    </div>

                                    <div className='p-a-0 observation-root small-container'>
                                        {_.map(epaSourcesThatExist, (epaSources, innerKey) => {
                                            return <div className='observation-outer' key={'observation-outer-' + innerKey}>
                                                {_.map(epaSources, (epaSource, sourceKey) => {
                                                    const data = residentData[epaSource];
                                                    return <svg height={200} width={300} className='observation-svg' key={'observation-svg-' + sourceKey}>
                                                        <g>
                                                            <rect className='bullet-range' width="250" height="25" x="25" y="10"></rect>
                                                        </g>
                                                    </svg>
                                                })}
                                            </div>;
                                        })}
                                    </div>

                                    <div className='p-r-md score-root big-container'>

                                    </div>

                                </div>
                            }

                        </div >
                }
            </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ toggleLoader, setResidentList, setResidentFilter, toggleFilterLoader, setResidentData }, dispatch)
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



