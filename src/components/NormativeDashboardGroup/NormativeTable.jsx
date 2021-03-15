import React from 'react';
import ReactTable from 'react-table';

const columns = [{
    Header: 'Name',
    accessor: 'fullname',
    className: 'text-left',
    maxWidth: 150
},
{
    Header: 'Total',
    accessor: 'totalAssessments',
    className: 'text-center',
    maxWidth: 75
},
{
    Header: 'Achieved',
    accessor: 'completedAssessments',
    className: 'text-center',
    maxWidth: 100
},
{
    Header: 'Achievement(%)',
    accessor: 'achievementRate',
    className: 'text-center',
    maxWidth: 130
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
                defaultSorted={[{ id: "fullname", desc: true }]} />
        </div>)

}


