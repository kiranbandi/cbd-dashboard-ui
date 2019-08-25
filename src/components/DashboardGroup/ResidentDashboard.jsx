import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getResidentList } from '../../utils/requestServer';
import { setResidentList } from '../../redux/actions/actions';
import Loading from 'react-loading';
import {
    FilterPanel, GraphPanel, InfoPanel,
    InfoCardsPanel, ExpiredRecordTable,
    NarrativeTable
} from '../';


class ResidentDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false
        }
        this._isMounted = false;
    }

    componentDidMount() {

        this._isMounted = true;
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });
        // get list of all residents who have not graduated
        getResidentList(true)
            .then((residentList) => { this.props.actions.setResidentList(residentList) })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching resident list"); })
            .finally(() => {
                this._isMounted && this.setState({ isLoaderVisible: false });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        const { residentList = [], programInfo } = this.props,
            { infoCardsVisible = false, narrativesVisible = false } = programInfo;

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let width = document.body.getBoundingClientRect().width - 125;
        let smallScreen = width < 800;

        return (
            <div className='dashboard-root-resident m-t' >
                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div className='m-t-md'>
                        {(residentList.length > 0) ?
                            <div>
                                <FilterPanel
                                    programInfo={programInfo} />
                                <InfoPanel
                                    smallScreen={smallScreen}
                                    // add some empty space around the sides
                                    width={width - 35} />
                                <GraphPanel
                                    isEMDepartment={true}
                                    width={width}
                                    smallScreen={smallScreen} />
                                {narrativesVisible && <NarrativeTable />}
                                <ExpiredRecordTable
                                    smallScreen={smallScreen} />
                                {infoCardsVisible && <InfoCardsPanel width={width} />}
                            </div> :
                            <h2 className='text-center text-danger'>No resident information is available currently</h2>}
                    </div>}
            </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ setResidentList }, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        residentList: state.oracle.residentList,
        //  can be null occasionally so better to check and set it
        programInfo: state.oracle.programInfo ? state.oracle.programInfo : {}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResidentDashboard);



