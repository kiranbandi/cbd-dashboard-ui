import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getResidentList, getResidentData } from '../utils/requestServer';

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { residentList } = this.props;
        if (residentList == null) {
            getResidentList().then((residentList) => {
                getResidentData(residentList[0]);
            }).catch();
        }
    }


    render() {
        let { loaderState, configuration, genome = {}, multiLevel, multiLevelType, plotType } = this.props;
        return (
            <div className='dashboard-root m-t'>
            </div>
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
        residentData: state.oracle.residentData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



