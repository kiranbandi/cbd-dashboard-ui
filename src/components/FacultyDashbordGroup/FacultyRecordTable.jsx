import React from 'react';
import ReactTable from 'react-table';
import { customFilter } from '../../utils/genericUtility';
import ReactTooltip from 'react-tooltip';
import infoTooltipReference from '../../utils/infoTooltipReference';

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


const randomTooltipId = `info-tooltip-${(Math.random() * 10000).toFixed(0)}`;

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
                <a
                    data-tip="React-tooltip"
                    data-for={randomTooltipId}
                >
                    <img width="20" height="20" src="https://www.flaticon.com/svg/static/icons/svg/189/189664.svg"></img>
                </a>
                <ReactTooltip id={randomTooltipId} place="left" type="dark" effect="float">
                    <p>{infoTooltipReference.facultyDevlopment.summaryOfEPAsByFacultyName}</p>
                </ReactTooltip>
            </h3>,
            <ReactTable
                key='faculty-table'
                data={innerRecords}
                columns={columns}
                defaultPageSize={10}
                pageSizeOptions={getPageSizeOptions()}
                resizable={false}
                filterable={true}
                className='-highlight -striped'
                defaultSorted={[{ id: "observation_date", desc: true }]} />]}
    </div>

}
