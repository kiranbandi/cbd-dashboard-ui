import React from 'react';
import ReactTable from 'react-table';

const columns = [{
    Header: 'Name',
    accessor: 'resident_name',
    className: 'text-left',
    maxWidth: 150
},
{
    Header: 'EPAs',
    accessor: 'record_count',
    className: 'text-center',
    maxWidth: 100
},
{
    Header: 'EPAs/week',
    accessor: 'epa_per_week',
    className: 'text-center',
    maxWidth: 100
},
{
    Header: 'Expiry(%)',
    accessor: 'expiry_rate',
    className: 'text-center',
    maxWidth: 100
}];

const multiColumns = [{
    Header: 'Name',
    columns: [{
        Header: '',
        accessor: 'resident_name',
        maxWidth: 150,
        className: 'text-left'
    }]
},
{
    Header: 'EPAs',
    columns: [{
        Header: 'Overall',
        accessor: 'record_count',
        className: 'text-center',
        maxWidth: 75
    },
    {
        Header: 'Period',
        accessor: 'record_count_period',
        className: 'text-center',
        maxWidth: 75
    }
    ]
},
{
    Header: 'EPAs/week',

    columns: [{
        Header: 'Overall',
        className: 'text-center',
        accessor: 'epa_per_week',
        maxWidth: 75
    },
    {
        Header: 'Period',
        className: 'text-center',
        accessor: 'epa_per_week_period',
        maxWidth: 75
    }
    ]
}, {
    Header: 'Expiry(%)',

    columns: [{
        Header: 'Overall',
        className: 'text-center',
        accessor: 'expiry_rate',
        maxWidth: 75
    },
    {
        Header: 'Period',
        className: 'text-center',
        accessor: 'expiry_rate_period',
        maxWidth: 75
    }
    ]
}];


export default (props) => {

    const dateFilterActive = document.getElementById('filter-dateFilterActive') && document.getElementById('filter-dateFilterActive').checked;


    return (
        <div className='normative-table table-box' style={{ width: props.width }}>
            <ReactTable
                data={props.records}
                columns={dateFilterActive ? multiColumns : columns}
                defaultPageSize={10}
                resizable={false}
                className='-highlight'
                defaultSorted={[{ id: "resident_name", desc: true }]} />
        </div>)

}


