import React from 'react';
import ReactTable from 'react-table';
import { customFilter } from '../../utils/genericUtility';
import { NumberToEPAText } from "../../utils/convertEPA";
import ReactTooltip from 'react-tooltip';
import infoTooltipReference from '../../utils/infoTooltipReference';

const columns = [{
    Header: 'Date',
    accessor: 'Date',
    maxWidth: 100,
    className: 'text-center',
    filterMethod: customFilter
},
{
    Header: 'Resident',
    accessor: 'Resident_Name',
    maxWidth: 200,
    className: 'text-center',
    filterMethod: customFilter
},
{
    Header: 'EPA',
    accessor: 'modded_epa',
    maxWidth: 50,
    className: 'epa-cell text-center',
    filterMethod: customFilter
},
{
    Header: 'Rating',
    accessor: 'Rating',
    maxWidth: 60,
    className: 'text-center',
    filterMethod: customFilter
},
{
    Header: 'Feedback',
    accessor: 'Feedback',
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
        // In the table show only records that have not been expired
        innerRecords = currentFacultyRecords[0].records || [];
    }


    return <div className='table-box' style={{ width: width }}>
        {currentFacultyRecords.length > 0 &&
            [<h3 key='faculty-table-title'>
                Summary of EPAs by <span className='text-capitalize'>{currentFaculty} </span>
                <i data-for={'faculty-table-infotip'} data-tip={infoTooltipReference.facultyDevlopment.summaryOfEPAsByFacultyName} className="fa fa-info-circle instant-tooltip-trigger"></i>
            </h3>,
            <ReactTable
                key='faculty-table'
                data={(_.map(innerRecords, (d) => ({ ...d, 'modded_epa': NumberToEPAText(d.EPA) })))}
                columns={columns}
                defaultPageSize={10}
                resizable={false}
                filterable={true}
                defaultSorted={[{ id: "observation_date", desc: true }]} />]}
        <ReactTooltip id={'faculty-table-infotip'} className='custom-react-tooltip' />
    </div>

}
