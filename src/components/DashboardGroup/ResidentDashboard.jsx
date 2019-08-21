import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getResidentList } from '../../utils/requestServer';
import { setResidentList } from '../../redux/actions/actions';
import Loading from 'react-loading';
import { FilterPanel, GraphPanel, InfoPanel, InfoCardsPanel } from '../';

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
            { infoCardsVisible = false } = programInfo;

        return (
            <div className='dashboard-root-resident m-t' >
                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div className='m-t-md'>
                        {residentList.length > 0 ?
                            <div>
                                <FilterPanel />
                                <InfoPanel />
                                <GraphPanel isEMDepartment={true} />
                                {infoCardsVisible && <InfoCardsPanel />}
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
        programInfo: state.oracle.programInfo
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResidentDashboard);



