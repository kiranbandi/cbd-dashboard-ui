import React from 'react';
import FacultyStatCardSet from './FacultyStatCardSet';
import ReactTable from 'react-table';


const UGcolumns = [{
    Header: 'Name',
    accessor: 'faculty_name',
    className: 'text-left'
},
{
    Header: 'EPAs',
    accessor: 'epa_count',
    className: 'text-center',
    maxWidth: 100
},
{
    Header: 'AVG. EPA SCORE',
    accessor: 'entrustment_score',
    className: 'text-center',
    maxWidth: 125
},
{
    Header: 'Avg. Words',
    accessor: 'words_per_comment',
    className: 'text-center',
    maxWidth: 100
}];

const UGMultiColumns = [{
    Header: 'Name',
    columns: [
        {
            Header: '',
            accessor: 'faculty_name',
            className: 'text-left'
        }
    ]
},
{
    Header: 'EPAs',
    columns: [
        {
            Header: 'Overall',
            accessor: 'epa_count',
            className: 'text-center',
            maxWidth: 75
        },
        {
            Header: 'Period',
            accessor: 'epa_count_period',
            className: 'text-center',
            maxWidth: 75
        }
    ]
},
{
    Header: 'Expiry(%)',
    columns: [
        {
            Header: 'Overall',
            accessor: 'expired_epa_percentage',
            className: 'text-center',
            maxWidth: 75
        },
        {
            Header: 'Period',
            accessor: 'expired_epa_percentage_period',
            className: 'text-center',
            maxWidth: 75
        }
    ]
},
{
    Header: 'AVG. EPA SCORE',
    columns: [
        {
            Header: 'Overall',
            className: 'text-center',
            accessor: 'entrustment_score',
            maxWidth: 75
        },
        {
            Header: 'Period',
            className: 'text-center',
            accessor: 'entrustment_score_period',
            maxWidth: 75
        }
    ]
},
{
    Header: 'Avg. Words',
    columns: [
        {
            Header: 'Overall',
            className: 'text-center',
            accessor: 'words_per_comment',
            maxWidth: 75
        },
        {
            Header: 'Period',
            className: 'text-center',
            accessor: 'words_per_comment_period',
            maxWidth: 75
        }
    ]
}];

const columns = [
    {
        Header: 'Name',
        accessor: 'faculty_name',
        className: 'text-left'
    },
    {
        Header: 'EPAs',
        accessor: 'epa_count',
        className: 'text-center',
        maxWidth: 120
    },
    {
        Header: 'Expiry(%)',
        accessor: 'expired_epa_percentage',
        className: 'text-center',
        maxWidth: 120
    },
    {
        Header: 'AVG. EPA SCORE',
        accessor: 'entrustment_score',
        className: 'text-center',
        maxWidth: 120
    },
    {
        Header: 'Avg. Words',
        accessor: 'words_per_comment',
        className: 'text-center',
        maxWidth: 120
    }
];

const multiColumns = [
    {
        Header: 'Name',
        columns: [
            {
                Header: '',
                accessor: 'faculty_name',
                className: 'text-left'
            }
        ]
    },
    {
        Header: 'EPAs',
        columns: [
            {
                Header: 'Overall',
                accessor: 'epa_count',
                className: 'text-center',
                maxWidth: 75
            },
            {
                Header: 'Period',
                accessor: 'epa_count_period',
                className: 'text-center',
                maxWidth: 75
            }
        ]
    },
    {
        Header: 'Expiry(%)',
        columns: [
            {
                Header: 'Overall',
                accessor: 'expired_epa_percentage',
                className: 'text-center',
                maxWidth: 75
            },
            {
                Header: 'Period',
                accessor: 'expired_epa_percentage_period',
                className: 'text-center',
                maxWidth: 75
            }
        ]
    },
    {
        Header: 'AVG. EPA SCORE',
        columns: [
            {
                Header: 'Overall',
                className: 'text-center',
                accessor: 'entrustment_score',
                maxWidth: 75
            },
            {
                Header: 'Period',
                className: 'text-center',
                accessor: 'entrustment_score_period',
                maxWidth: 75
            }
        ]
    },
    {
        Header: 'Avg. Words',
        columns: [
            {
                Header: 'Overall',
                className: 'text-center',
                accessor: 'words_per_comment',
                maxWidth: 75
            },
            {
                Header: 'Period',
                className: 'text-center',
                accessor: 'words_per_comment_period',
                maxWidth: 75
            }
        ]
    }
];


export default (props) => {

    const { isUG = false, dateFilterActive, width, processedRecords } = props;

    const columnStore = isUG ? [UGcolumns, UGMultiColumns] : [columns, multiColumns];

    return <div className={'all-faculty-table table-box ' + (dateFilterActive ? 'm-t-md' : '')}
        style={{ width: width }}>
        <h3>Summary of All Faculties</h3>
        <ReactTable
            data={processedRecords}
            columns={dateFilterActive ? columnStore[1] : columnStore[0]}
            defaultPageSize={10}
            resizable={false}
            className='-highlight -striped'
            defaultSorted={[{ id: "faculty_name", desc: false }]} />
    </div>
}
