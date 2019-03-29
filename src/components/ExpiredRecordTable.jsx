import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

class ExpiredResidentData extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let columns = [{
            Header: 'Date',
            accessor: 'Date',
            maxWidth: 150,
            filterMethod: customFilter
        }, {
            Header: 'Rating',
            accessor: 'Rating',
            maxWidth: 60,
            filterMethod: customFilter
        },
        {
            Header: 'Observer Name',
            accessor: 'Observer_Name',
            maxWidth: 150,
            className: 'text-left',
            filterMethod: customFilter
        },
        {
            Header: 'Situation Context',
            accessor: 'Situation_Context',
            className: 'text-left situation-cell',
            maxWidth: 350,
            filterMethod: customFilter
        },
        {
            Header: 'Feedback',
            accessor: 'Feedback',
            className: 'feedback-cell',
            filterMethod: customFilter
        }],
            { width, expiredResidentData = [] } = this.props;

            expiredResidentData = [{"Date":"2018-08-27","Resident_Name":"mock data","EPA":"1.1","Observer_Name":"Alison Turnquist","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-07-21","Resident_Name":"mock data","EPA":"1.2","Observer_Name":"Terrance Zlipko","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-07-16","Resident_Name":"mock data","EPA":"1.2","Observer_Name":"Jon Nataraj","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-08-27","Resident_Name":"mock data","EPA":"1.2","Observer_Name":"Alison Turnquist","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-09-22","Resident_Name":"mock data","EPA":"1.2","Observer_Name":"Desiree Rouleau","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-07-16","Resident_Name":"mock data","EPA":"1.3","Observer_Name":"Jon Nataraj","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-07-18","Resident_Name":"mock data","EPA":"1.3","Observer_Name":"Philip Fitzpatrick","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-07-23","Resident_Name":"mock data","EPA":"1.3","Observer_Name":"Kamini Premkumar","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-09-22","Resident_Name":"mock data","EPA":"1.3","Observer_Name":"Desiree Rouleau","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-10-07","Resident_Name":"mock data","EPA":"2.1","Observer_Name":"Mark Taylor","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-09-26","Resident_Name":"mock data","EPA":"2.2","Observer_Name":"Philip Fitzpatrick","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-10-09","Resident_Name":"mock data","EPA":"2.2","Observer_Name":"Philip Joseph Davis","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-10-07","Resident_Name":"mock data","EPA":"2.2","Observer_Name":"Mark Taylor","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-07-18","Resident_Name":"mock data","EPA":"2.3","Observer_Name":"Philip Fitzpatrick","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-09-26","Resident_Name":"mock data","EPA":"2.3","Observer_Name":"Philip Fitzpatrick","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2018-07-23","Resident_Name":"mock data","EPA":"2.4","Observer_Name":"Kamini Premkumar","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true},{"Date":"2019-01-08","Resident_Name":"mock data","EPA":"2.4","Observer_Name":"Randi Ramunno","Observer_Type":"Clinical Supervisor","Rating":"","Type":"","Situation_Context":"","Feedback":"","Professionalism_Safety":"","isExpired":true}];


        return (
            <div className='table-box'>
                {expiredResidentData.length > 0 &&
                    <ReactTable
                        data={expiredResidentData}
                        columns={columns}
                        defaultPageSize={5}
                        resizable={false}
                        filterable={true}
                        className='-highlight'
                        defaultSorted={[{ id: "Date", desc: true }]} />}

            </div>)
    }
}


function customFilter(filter, rows) {
    rows[filter.id] = rows[filter.id] || '';
    filter.value = filter.value || '';
    return rows[filter.id].toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
}

function mapStateToProps(state) {
    return {
        expiredResidentData: state.oracle.expiredResidentData
    };
}

export default connect(mapStateToProps, null)(ExpiredResidentData);

