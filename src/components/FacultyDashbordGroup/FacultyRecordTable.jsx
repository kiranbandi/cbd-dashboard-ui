import React from 'react';
import ReactTable from 'react-table';
import { customFilter } from '../../utils/genericUtility';

const columns = [{
    Header: 'Date',
    accessor: 'observation_date',
    maxWidth: 150,
    className: 'text-center',
    filterMethod: customFilter
}, {
    Header: 'Resident Name',
    accessor: 'resident_name',
    maxWidth: 200,
    filterMethod: customFilter
},
{
    Header: 'EPA',
    accessor: 'epa',
    maxWidth: 150,
    className: 'epa-cell',
    filterMethod: customFilter
},
{
    Header: 'Rating',
    accessor: 'rating',
    maxWidth: 60,
    className: 'text-center',
    filterMethod: customFilter
},
{
    Header: 'Feedback',
    accessor: 'feedback',
    className: 'feedback-cell',
    filterMethod: customFilter
}];


export default (props) => {

    const { currentFacultyRecords = [], currentFaculty = 'ALL', width } = props;
    let innerRecords = [];

    // if there are no records available or
    //  if the faculty is set to all then dont show anything
    if (currentFaculty == 'ALL' || currentFacultyRecords.length == 0) {
        return null;
    }

    else {
        innerRecords = currentFacultyRecords[0].records || [];
    }

    return <div className='table-box' style={{ width: width }}>
        {currentFacultyRecords.length > 0 &&
            <ReactTable
                data={innerRecords}
                columns={columns}
                defaultPageSize={10}
                resizable={false}
                filterable={true}
                className='-highlight -striped'
                defaultSorted={[{ id: "Date", desc: true }]} />}
    </div>

}
