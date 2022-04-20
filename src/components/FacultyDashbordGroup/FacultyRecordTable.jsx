import React, { Component } from 'react';
import ReactTable from 'react-table';
import { customFilter } from '../../utils/genericUtility';
import { NumberToEPAText } from "../../utils/convertEPA";
import ReactTooltip from 'react-tooltip';
import infoTooltipReference from '../../utils/infoTooltipReference';
import downloadCSV from '../../utils/downloadCSV';
import _ from 'lodash';

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
    accessor: 'EPA',
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


export default class FacultyRecordTable extends Component {

    constructor(props) {
        super(props);
    }

    downloadReport = () => {

        const { currentFacultyRecords = [] } = this.props;

        if (currentFacultyRecords[0] && currentFacultyRecords[0].records) {
            downloadCSV(['Encounter Date', 'Resident', 'EPA', 'Rating', 'Feedback']
                , _.map(currentFacultyRecords[0].records, e =>
                ([e['Date'] || '',
                e['Resident_Name'] || '',
                NumberToEPAText(String(e['EPA'])),
                e['Rating'] || '',
                e['Feedback'] || ''])),
                'epa-summary-report');
        }
    }

    render() {

        const { currentFacultyRecords = [], currentFaculty = 'ALL', width } = this.props;
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

        return <div className='table-box no-printing' style={{ width: width }}>
            {currentFacultyRecords.length > 0 &&
                [<h3 key='faculty-table-title'>
                    Summary of EPAs by <span className='text-capitalize'>{currentFaculty} </span>
                    <i data-for={'faculty-table-infotip'} data-tip={infoTooltipReference.facultyDevlopment.summaryOfEPAsByFacultyName} className="fa fa-info-circle instant-tooltip-trigger"></i>
                    <button onClick={this.downloadReport} className='m-l btn btn btn-primary-outline'> <i className="fa fa-download"></i> Download Table</button>
                </h3>,
                <ReactTable
                    key='faculty-table'
                    data={(_.map(innerRecords, (d) => ({ ...d, 'EPA': NumberToEPAText(d.EPA) })))}
                    columns={columns}
                    defaultPageSize={10}
                    resizable={false}
                    filterable={true}
                    defaultSorted={[{ id: "observation_date", desc: true }]} />]}
            <ReactTooltip id={'faculty-table-infotip'} className='custom-react-tooltip' />
        </div>

    }

}
