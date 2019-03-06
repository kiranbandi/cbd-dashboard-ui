import React from 'react';
import ReactTable from 'react-table';

function customFilter(filter, rows) {
    rows[filter.id] = rows[filter.id] || '';
    filter.value = filter.value || '';
    return rows[filter.id].toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
}

export default (props) => {

    const columns = [{
        Header: 'Date',
        accessor: 'Date',
        maxWidth: 150,
        filterMethod: customFilter
    }, {
        Header: 'Rating',
        accessor: 'Rating',
        maxWidth: 60,
        filterMethod: customFilter
    },
    {
        Header: 'Observer Name',
        accessor: 'Observer_Name',
        maxWidth: 150,
        className: 'text-left',
        filterMethod: customFilter
    },
    {
        Header: 'Situation Context',
        accessor: 'Situation_Context',
        className: 'text-left situation-cell',
        maxWidth: 350,
        filterMethod: customFilter
    },
    {
        Header: 'Feedback',
        accessor: 'Feedback',
        className: 'feedback-cell',
        filterMethod: customFilter
    }]

    return (
        <div className='table-box' style={{ width: (props.width * 4) - 75 }}>
            <ReactTable
                data={props.data}
                columns={columns}
                defaultPageSize={5}
                resizable={false}
                filterable={true}
                className='-highlight'
                defaultSorted={[{ id: "Date", desc: true }]} />
        </div>)
}
