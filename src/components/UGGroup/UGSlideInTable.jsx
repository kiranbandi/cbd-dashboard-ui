import React from 'react';
import ReactTable from 'react-table';
import { customFilter } from '../../utils/genericUtility';

const columns = [{
    Header: 'Date',
    accessor: 'date',
    maxWidth: 150,
    filterMethod: customFilter
}, {
    Header: 'Rating',
    accessor: 'rating',
    maxWidth: 60,
    filterMethod: customFilter
},
{
    Header: 'Observer Name',
    accessor: 'observer_name',
    maxWidth: 150,
    className: 'text-left',
    filterMethod: customFilter
},
{
    Header: 'Admission Type',
    accessor: 'admission_type',
    className: 'text-left situation-cell',
    maxWidth: 150,
    filterMethod: customFilter
},
{
    Header: 'Patient Type',
    accessor: 'patient_type',
    className: 'text-left situation-cell',
    maxWidth: 150,
    filterMethod: customFilter
},
{
    Header: 'Feedback',
    accessor: 'feedback',
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
                defaultSorted={[{ id: "date", desc: true }]} />
        </div>)
}
