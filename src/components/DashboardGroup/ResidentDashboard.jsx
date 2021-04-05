import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FilterPanel, GraphPanel, InfoPanel } from '../';


class ResidentDashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { residentList = [], residentData, residentFilter } = this.props;
        let residentInfo = false;

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let width = document.getElementById('visual-summary-content-mount').getBoundingClientRect().width - 125;
        let smallScreen = width < 600;

        if (residentFilter && residentFilter.username) {
            residentInfo = _.find(residentList, (resident) => resident.username == residentFilter.username);
        }


        return (
            <div className='dashboard-root-resident m-t' >
                <div className='m-t-md'>
                    {(residentList.length > 0) ?
                        <div>
                            <FilterPanel />
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



