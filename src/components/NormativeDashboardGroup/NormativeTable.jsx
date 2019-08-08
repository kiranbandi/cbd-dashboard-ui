import React from 'react';
import ReactTable from 'react-table';

const columns = [{
    Header: 'Name',
    accessor: 'resident_name',
    className: 'text-left',
    maxWidth: 150,
},
{
    Header: 'EPAs',
    accessor: 'record_count',
    className: 'text-center',
    maxWidth: 100,
},
{
    Header: 'EPAs/week',
    accessor: 'epa_per_week',
    className: 'text-center',
    maxWidth: 100,
},
{
    Header: 'Expired',
    accessor: 'expired',
    className: 'text-center',
    maxWidth: 100,
}];


export default (props) => {

    return (
        <div className='normative-table table-box' style={{ width: props.width }}>
            <ReactTable
                data={props.records}
                columns={columns}
                defaultPageSize={10}
                resizable={false}
                className='-highlight'
                defaultSorted={[{ id: "resident_name", desc: true }]} />
        </div>)

}


