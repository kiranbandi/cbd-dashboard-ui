import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FilterPanel, GraphPanel, InfoPanel } from '../';

class ResidentDashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { residentList = [], residentData, dashboard_mode, residentFilter } = this.props,
            width = window.dynamicDashboard.mountWidth,
            smallScreen = width < 600;

        let residentInfo = false;

        if (residentFilter && residentFilter.username) {
            residentInfo = _.find(residentList, (resident) => resident.username == residentFilter.username);
        }

        return (
            <div className='dashboard-root-resident m-t' >
                <div className='m-t-md'>
                    {(residentList.length > 0) ?
                        <div>
                            <FilterPanel dashboard_mode={dashboard_mode} />
                            {/* if the resident has no data hide everything */}
                            {+residentInfo.totalAssessments > 0 ?
                                <div>
                                    {!(_.isEmpty(residentData)) && <InfoPanel
                                        residentFilter={residentFilter}
                                        residentInfo={residentInfo}
                                        smallScreen={smallScreen}
                                        // add some empty space around the sides
                                        width={width - 35} />}
                                    <GraphPanel
                                        residentFilter={residentFilter}
                                        width={width}
                                        smallScreen={smallScreen} />
                                </div> :
                                <h3 className='text-primary text-center m-t-lg'>
                                    Sorry the selected resident has no observed EPAs.
                                </h3>}
                        </div> :
                        <h3 className='text-center text-primary'>Sorry resident data is not available currently.</h3>}
                </div>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        residentList: state.oracle.residentList,
        residentData: state.oracle.residentData,
        residentFilter: state.oracle.residentFilter
    };
}

export default connect(mapStateToProps, {})(ResidentDashboard);



