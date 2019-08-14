import React from 'react';
import ReactTable from 'react-table';

const columns = [{
    Header: 'DATE',
    accessor: 'observation_date',
    maxWidth: 100,
}, {
    Header: 'OBSERVER',
    accessor: 'observer_name',
    className: 'text-left',
    maxWidth: 125,
},
{
    Header: 'FEEDBACK',
    accessor: 'feedback',
    className: 'feedback-cell',
    sortable: false
}];


export default (props) => {


    return (
        <div className='narrative-box' style={{ width: props.width }}>
            <div className="hr-divider">
                <h4 className="hr-divider-content"> NARRATIVES </h4>
            </div>
            {props.narrativeData.length > 0 ?
                <div className='inner-table'>
                    <ReactTable
                        data={props.narrativeData}
                        columns={columns}
                        showPagination={false}
                        className='-highlight'
                        noDataText='No Narratives Available'
                        defaultSorted={[{ id: "Date", desc: true }]} />
                </div> :
                <h2 className='inner-header'>No Records Available</h2>}

        </div>)
}
