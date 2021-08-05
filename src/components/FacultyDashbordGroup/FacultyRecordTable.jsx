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
    Header: 'EPA',
    accessor: 'EPA',
    maxWidth: 50,
    className: 'epa-cell',
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
        innerRecords = _.filter(innerRecords, (d) => !d.isExpired);

    }

    const getPageSizeOptions = () => {
        if (innerRecords.length < 5) {
            return [innerRecords.length];
        } else {
            const optionList = [5];
            for (let i = 5; i < innerRecords.length; optionList.push(i = (i * 2 > innerRecords.length ? innerRecords.length : i * 2)));
            return optionList;
        }
    }

    return <div className='table-box' style={{ width: width }}>
        {currentFacultyRecords.length > 0 &&
            [<h3 key='faculty-table-title'>
                Summary of EPAs by <span className='text-capitalize'>{currentFaculty} </span>
                <i data-for={'faculty-table-infotip'} data-tip={infoTooltipReference.facultyDevlopment.summaryOfEPAsByFacultyName} className="fa fa-info-circle instant-tooltip-trigger"></i>
            </h3>,
            <ReactTable
                key='faculty-table'
                data={(_.map(innerRecords, (d) => ({ ...d, 'epa': NumberToEPAText(d.epa) })))}
                columns={columns}
                defaultPageSize={10}
                pageSizeOptions={getPageSizeOptions()}
                resizable={false}
                filterable={true}
                defaultSorted={[{ id: "observation_date", desc: true }]} />]}
        <ReactTooltip id={'faculty-table-infotip'} className='custom-react-tooltip' />
    </div>

}
