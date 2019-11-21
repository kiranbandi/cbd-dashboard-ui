import React, { Component } from 'react';
import ReactTable from 'react-table';
import * as d3 from 'd3';
import moment from 'moment';

const columns = [
    {
        Header: 'Name',
        accessor: 'faculty_name',
        className: 'text-left',
        maxWidth: 150
    },
    {
        Header: 'EPAs',
        accessor: 'epa_count',
        className: 'text-center',
        maxWidth: 100
    },
    {
        Header: 'Expiry(%)',
        accessor: 'expired_epa_percentage',
        className: 'text-center',
        maxWidth: 100
    },
    {
        Header: 'Avg. EPA',
        accessor: 'entrustment_score',
        className: 'text-center',
        maxWidth: 100
    },
    {
        Header: 'Avg. Words',
        accessor: 'words_per_comment',
        className: 'text-center',
        maxWidth: 100
    }
];

const multiColumns = [
    {
        Header: 'Name',
        columns: [
            {
                Header: '',
                accessor: 'faculty_name',
                maxWidth: 150,
                className: 'text-left'
            }
        ]
    },
    {
        Header: 'EPAs',
        columns: [
            {
                Header: 'Overall',
                accessor: 'epa_count',
                className: 'text-center',
                maxWidth: 75
            },
            {
                Header: 'Period',
                accessor: 'epa_count_period',
                className: 'text-center',
                maxWidth: 75
            }
        ]
    },
    {
        Header: 'Expiry(%)',
        columns: [
            {
                Header: 'Overall',
                accessor: 'expired_epa_percentage',
                className: 'text-center',
                maxWidth: 75
            },
            {
                Header: 'Period',
                accessor: 'expired_epa_percentage_period',
                className: 'text-center',
                maxWidth: 75
            }
        ]
    },
    {
        Header: 'Avg. EPA',
        columns: [
            {
                Header: 'Overall',
                className: 'text-center',
                accessor: 'entrustment_score',
                maxWidth: 75
            },
            {
                Header: 'Period',
                className: 'text-center',
                accessor: 'entrustment_score_period',
                maxWidth: 75
            }
        ]
    },
    {
        Header: 'Avg. Words',
        columns: [
            {
                Header: 'Overall',
                className: 'text-center',
                accessor: 'words_per_comment',
                maxWidth: 75
            },
            {
                Header: 'Period',
                className: 'text-center',
                accessor: 'words_per_comment_period',
                maxWidth: 75
            }
        ]
    }
];

export default (props) => {
    function generateProcessedData() {
        let filteredObserverDataList = props.records.filter(d => d.data.filter(dd => !dd.isExpired).length > 5);

        let data = filteredObserverDataList.map(d => {
            let dataInDateRange;
            if (props.dateFilterActive && props.startDate && props.endDate) {
                dataInDateRange = d.data.filter(dd =>
                    moment(dd.observation_date, 'YYYY-MM-DD').isBetween(
                        moment(props.startDate, 'MM/DD/YYYY'),
                        moment(props.endDate, 'MM/DD/YYYY')
                    )
                );
            }

            return {
                faculty_name: d.name,
                epa_count: d.data.length,
                epa_count_period: dataInDateRange ? dataInDateRange.length : 0,
                expired_epa_percentage: Math.round(d.data.filter(dd => dd.isExpired).length / d.data.length * 100),
                expired_epa_percentage_period: (dataInDateRange && dataInDateRange.length > 0) ?
                    Math.round(dataInDateRange.filter(dd => dd.isExpired).length / dataInDateRange.length * 100) : Number.NaN,
                entrustment_score: Math.round((d3.mean(d.data.filter(dd => !dd.isExpired).map(dd => +dd.rating || 0)) || 0) * 100) / 100,
                entrustment_score_period: (dataInDateRange && dataInDateRange.length > 0) ?
                    Math.round((d3.mean(dataInDateRange.filter(dd => !dd.isExpired).map(dd => +dd.rating || 0)) || 0) * 100) / 100 : Number.NaN,
                words_per_comment: Math.round(d3.mean(d.data.filter(dd => !dd.isExpired).map(dd => dd.feedback.split(" ").length) || 0)),
                words_per_comment_period: (dataInDateRange && dataInDateRange.length > 0) ?
                    Math.round(d3.mean(dataInDateRange.filter(dd => !dd.isExpired).map(dd => dd.feedback.split(" ").length) || 0)) : Number.NaN
            };
        }).sort();
        if ((props.dateFilterActive && props.startDate && props.endDate)) {
            data = data.filter(d => d.epa_count_period > 0);
        }

        return data;
    }

    const processedData = generateProcessedData();

    return (
        <div className='normative-table table-box' style={{ width: props.width }}>
            <ReactTable
                data={processedData}
                columns={props.dateFilterActive ? multiColumns : columns}
                defaultPageSize={10}
                resizable={false}
                className='-highlight'
                defaultSorted={[{ id: "faculty_name", desc: true }]} />
        </div>
    );
}