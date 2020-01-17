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

    const { printModeON, currentFacultyRecords = [], currentFaculty = 'ALL', width } = props;
    let innerRecords = [];

    // if there are no records available or
    //  if the faculty is set to all then dont show anything
    if (currentFaculty == 'ALL' || currentFacultyRecords.length == 0) {
        return null;
    }

    else {
        innerRecords = currentFacultyRecords[0].records || [];
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

    const printModeTableContent = [];
    for (const record of innerRecords.slice(0, 10)) {
        printModeTableContent.push(<tr key={record.id}>
            <th>{record.observation_date}</th>
            <th>{record.resident_name}</th>
            <th>{record.epa}</th>
            <th>{record.rating}</th>
            <th>{record.feedback}</th>
        </tr>)
    }

    return <div className='table-box' style={{ width: width }}>
        {currentFacultyRecords.length > 0 &&
            (
                printModeON ?
                    (<table style={{ fontSize: '0.6em' }}>
                        <colgroup>
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="60%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Resident Name</th>
                                <th>EPA</th>
                                <th>Rating</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {printModeTableContent}
                        </tbody>
                    </table>
                    ) :
                    (<ReactTable
                        data={innerRecords}
                        columns={columns}
                        defaultPageSize={10}
                        pageSizeOptions={getPageSizeOptions()}
                        resizable={false}
                        filterable={true}
                        className='-highlight -striped'
                        defaultSorted={[{ id: "Date", desc: true }]} />)
            )
        }
    </div>

}
