import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getResidentList } from '../utils/requestServer';
import { setResidentList, toggleLoader } from '../redux/actions/actions';
import Loading from 'react-loading';
import { FilterPanel,GraphPanel } from '../components';

class Dashboard extends Component {

    constructor(props) {
        super(props);
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

    render() {
        let { loaderState, residentList = [] } = this.props;

        return (
            <div className='dashboard-root m-t' >
                {loaderState ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div className='m-t-md'>
                        {residentList.length > 0 ?
                            <div>
                                <FilterPanel />
                                <GraphPanel />
                            </div> :
                            <h2 className='text-center text-danger'>No resident information is available currently</h2>}
                    </div>}
            </div >
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
        loaderState: state.oracle.loaderState
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



