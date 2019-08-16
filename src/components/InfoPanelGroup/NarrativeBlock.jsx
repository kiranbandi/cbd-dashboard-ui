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

    const { residentFilter, width, narrativeData } = props;
    let filteredNarratives;

    //  the narratives already come premarked for the date range
    //  we just check if the date filter is active and 
    // based on that removed the marked narratives and show them
    if (residentFilter && !residentFilter.isAllData) {
        filteredNarratives = _.filter(narrativeData, (d) => d.mark);
    }
    else {
        filteredNarratives = _.clone(narrativeData);
    }

    return (
        <div className='narrative-box' style={{ width }}>
            <div className="hr-divider">
                <h4 className="hr-divider-content"> NARRATIVES </h4>
            </div>
            {filteredNarratives.length > 0 ?
                <div className='inner-table'>
                    <ReactTable
                        data={filteredNarratives}
                        columns={columns}
                        showPagination={false}
                        className='-highlight'
                        noDataText='No Narratives Available'
                        defaultSorted={[{ id: "Date", desc: true }]} />
                </div> :
                <h2 className='inner-header'>No Records Available</h2>}

        </div>)
}
