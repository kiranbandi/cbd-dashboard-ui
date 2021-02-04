import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import { FilterPanel, GraphPanel, InfoPanel } from '../';


class ResidentDashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { residentList = [], residentData } = this.props;

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let width = document.getElementById('visual-summary-content-mount').getBoundingClientRect().width - 125;
        let smallScreen = width < 600;

        return (
            <div className='dashboard-root-resident m-t' >
                <div className='m-t-md'>
                    {(residentList.length > 0) ?
                        <div>
                            <FilterPanel />
                            {!(_.isEmpty(residentData)) &&
                                <InfoPanel
                                    smallScreen={smallScreen}
                                    // add some empty space around the sides
                                    width={width - 35} />}
                            <GraphPanel
                                width={width}
                                smallScreen={smallScreen} />
                        </div> :
                        <h2 className='text-center text-danger'>No data is available currently.</h2>}
                </div>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        residentList: state.oracle.residentList,
        residentData: state.oracle.residentData
    };
}

export default connect(mapStateToProps, {})(ResidentDashboard);



