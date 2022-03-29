import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { customFilter } from '../../utils/genericUtility';
import infoTooltipReference from '../../utils/infoTooltipReference';
import { NumberToEPAText } from "../../utils/convertEPA";
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

const columns = [{
    Header: 'Encounter Date',
    accessor: 'Date',
    className: 'text-center',
    filterMethod: customFilter
}, {
    Header: 'Expiry Date',
    accessor: 'Expiry_Date',
    className: 'text-center',
    filterMethod: customFilter
}, {
    Header: 'EPA',
    accessor: 'EPA',
    filterMethod: customFilter
},
{
    Header: 'Assessor Name',
    accessor: 'Assessor_Name',
    className: 'text-center',
    filterMethod: customFilter
}];

class ExpiredResidentData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility(event) {
        event.preventDefault();
        this.setState({ isVisible: !this.state.isVisible });
    }

    render() {

        let { expiredResidentData = [], smallScreen = false } = this.props;

        return (
            <div className='expired-box' >
                {expiredResidentData.length > 0 && !smallScreen &&
                    <div>
                        <h4 onClick={this.toggleVisibility} className="text-left">
                            {this.state.isVisible ? <span className="fa fa-chevron-down"></span> : <span className="fa fa-chevron-right"></span>}
                            View Expired EPAs
                            <i data-for='expired-infotip' data-tip={infoTooltipReference.residentMetrics.viewExpiredEPAs} className="fa fa-info-circle instant-tooltip-trigger"></i>
                            <ReactTooltip id='expired-infotip' className='custom-react-tooltip' />
                        </h4>
                        <div className={'table-box ' + (this.state.isVisible ? '' : 'hidden-table-box')}>
                            <ReactTable
                                data={(_.map(expiredResidentData, (d) => ({ ...d, 'EPA': NumberToEPAText(d.EPA), 'Expiry_Date': moment(d.Expiry_Date, 'MMM DD, YYYY').format('YYYY-MM-DD') })))}
                                columns={columns}
                                defaultPageSize={10}
                                resizable={false}
                                filterable={true}
                                className='-highlight'
                                defaultSorted={[{ id: "Date", desc: true }]} />
                        </div>
                    </div>
                }
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        expiredResidentData: _.reverse(_.sortBy(state.oracle.expiredData, (d) => d.Date))
    };
}

export default connect(mapStateToProps, null)(ExpiredResidentData);

