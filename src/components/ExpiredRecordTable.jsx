import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

class ExpiredResidentData extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let columns = [{
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
        }],
            { width, expiredResidentData = [] } = this.props;

        return (
            <div className='expired-box'>
                {expiredResidentData.length > 0 &&
                    <div>
                        <div className="hr-divider">
                            <h4 className="hr-divider-content"> EXPIRED EPAs </h4>
                        </div>
                        <div className='table-box'>
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


function customFilter(filter, rows) {
    rows[filter.id] = rows[filter.id] || '';
    filter.value = filter.value || '';
    return rows[filter.id].toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
}

function mapStateToProps(state) {
    return {
        expiredResidentData: state.oracle.expiredResidentData
    };
}

export default connect(mapStateToProps, null)(ExpiredResidentData);

