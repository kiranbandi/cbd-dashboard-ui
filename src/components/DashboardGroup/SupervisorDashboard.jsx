import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllData } from '../../utils/requestServer';
import { setDataDumpState } from '../../redux/actions/actions';
import Loading from 'react-loading';

class SupervisorDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false
        }
    }

    componentDidMount() {

        const { allData } = this.props;
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });
        // get list of all residents
        getAllData()
            .then((residentList) => {
                this.props.actions.setResidentList(residentList);
            })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching resident list"); })
            .finally(() => {
                this.setState({ isLoaderVisible: false });
            });
    }


    render() {
        return (
            <div className='m-a' >
                Supervisory Metrics Page Coming Soon...
            </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        residentList: state.oracle.residentList,
        loaderState: state.oracle.loaderState
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SupervisorDashboard);