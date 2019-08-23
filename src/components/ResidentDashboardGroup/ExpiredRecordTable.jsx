import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { customFilter } from '../../utils/genericUtility';

const columns = [{
    Header: 'Expired Date',
    accessor: 'Date',
    filterMethod: customFilter
}, {
    Header: 'EPA',
    accessor: 'EPA',
    filterMethod: customFilter
},
{
    Header: 'Observer Name',
    accessor: 'Observer_Name',
    className: 'text-left',
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
                            {this.state.isVisible ? <span className="icon icon-chevron-down"></span> : <span className="icon icon-chevron-right"></span>}
                            Expired EPAs: {expiredResidentData.length} (Last Expired Record on {expiredResidentData[0].Date})
                        </h4>
                        <div className={'table-box ' + (this.state.isVisible ? '' : 'hidden-table-box')}>
                            <ReactTable
                                data={expiredResidentData}
                                columns={columns}
                                defaultPageSize={5}
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
        expiredResidentData: _.reverse(_.sortBy(state.oracle.expiredResidentData, (d) => d.Date))
    };
}

export default connect(mapStateToProps, null)(ExpiredResidentData);

