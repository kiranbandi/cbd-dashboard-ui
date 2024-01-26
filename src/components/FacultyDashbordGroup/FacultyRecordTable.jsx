import React from 'react';
import ReactTable from 'react-table';
import { customFilter } from '../../utils/genericUtility';
import infoTooltipReference from '../../utils/infoTooltipReference';
import { InfoTip } from '../';
import { NumberToEPAText } from "../../utils/convertEPA";

const columns = [{
    Header: 'Date',
    accessor: 'observation_date',
    maxWidth: 100,
    className: 'text-center',
    filterMethod: customFilter
}, {
    Header: 'Resident Name',
    accessor: 'resident_name',
    maxWidth: 125,
    filterMethod: customFilter
},
{
    Header: 'EPA',
    accessor: 'epa',
    maxWidth: 50,
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


const columns_with_qualscore = [{
    Header: 'Date',
    accessor: 'observation_date',
    maxWidth: 100,
    className: 'text-center',
    filterMethod: customFilter
}, {
    Header: 'Resident Name',
    accessor: 'resident_name',
    maxWidth: 125,
    filterMethod: customFilter
},
{
    Header: 'EPA',
    accessor: 'epa',
    maxWidth: 50,
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
    Header: 'QuAL',
    accessor: 'qual',
    maxWidth: 75,
    className: 'text-center',
    filterMethod: customFilter
},
{
    Header: 'Evidence',
    accessor: 'q1',
    maxWidth: 75,
    className: 'text-center',
    filterMethod: customFilter
},
{
    Header: 'Suggestion',
    accessor: 'q2i',
    maxWidth: 75,
    className: 'text-center',
    filterMethod: customFilter
}, {
    Header: 'Linked',
    accessor: 'q3i',
    maxWidth: 75,
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

    const { currentFacultyRecords = [], currentFaculty = 'ALL', width, qualScoreEnabled = false } = props;
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
                <InfoTip info={infoTooltipReference.facultyDevlopment.summaryOfEPAsByFacultyName} />
            </h3>,
            <div>
                {qualScoreEnabled &&
                    <div>
                        <p key={'line-break-1'} >Overall QuAL Score: 0 (Minimal) - 5 (Excellent)</p>
                        <p key={'line-break-2'} >Evidence Score: 0 (No comment at all) - 3 (Full Description)</p>
                        <p key={'line-break-3'} >Suggestion Given: Yes/No</p>
                        <p key={'line-break-4'} >Suggestion Linked to Behavior Descibed: Yes/No</p>
                    </div>}
            </div>,
            <ReactTable
                key='faculty-table'
                data={(_.map(innerRecords, (d) => ({ ...d, 'epa': props.isUG ? d.epa : NumberToEPAText(d.epa) })))}
                columns={qualScoreEnabled ? columns_with_qualscore : columns}
                defaultPageSize={10}
                pageSizeOptions={getPageSizeOptions()}
                resizable={false}
                filterable={true}
                className='-highlight -striped'
                defaultSorted={[{ id: "observation_date", desc: true }]} />]}
    </div>

}
