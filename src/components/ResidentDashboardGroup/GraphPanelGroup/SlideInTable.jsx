import React from 'react';
import ReactTable from 'react-table';
import { customFilter } from '../../../utils/genericUtility';

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
    Header: 'Comments',
    accessor: 'Feedback',
    className: 'feedback-cell',
    filterMethod: customFilter
}];


export default (props) => {
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
