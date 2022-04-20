import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchToResidentDashboard } from '../../redux/actions/actions';
import _ from 'lodash';

const columns = [{
    Header: 'Name',
    accessor: 'fullname',
    className: 'text-left',
    maxWidth: 150
},
{
    Header: 'Total',
    accessor: 'totalAssessments',
    className: 'text-center',
    maxWidth: 75
},
{
    Header: 'Achieved',
    accessor: 'completedAssessments',
    className: 'text-center',
    maxWidth: 100
},
{
    Header: 'Achievement(%)',
    accessor: 'achievementRate',
    className: 'text-center',
    maxWidth: 130
}];

let NormativeTable = (props) => {

    // For small screens the table spans the entire width so dont set any maxwidth 
    const moddedColumns = _.map(columns, (column) => {
        const { maxWidth, ...otherProps } = column;
        return props.smallScreen ? { ...otherProps } : { ...column };
    });

    return (
        <div className='normative-table table-box' style={{ width: props.width }}>
            <ReactTable
                data={props.records}
                columns={moddedColumns}
                defaultPageSize={10}
                resizable={false}
                className='-highlight'
                getTdProps={(state, rowInfo, column, instance) => {
                    return {
                        onClick: (e, handleOriginal) => {
                            const username = rowInfo.original.username,
                                { actions, residentFilter, residentList } = props;
                            // validate username to check if its non empty 
                            if (username && username.length > 0) {
                                // first get the resident username from the list
                                // then check if the resident exists and then trigger a custom select resident action 
                                let resident = _.find(residentList, (d) => d.username == username);
                                if (resident) {
                                    // set the username on the filter
                                    residentFilter.username = resident.username;
                                    actions.switchToResidentDashboard(resident, residentFilter);
                                }
                            }
                        }
                    }
                }}
                defaultSorted={[{ id: "fullname", desc: true }]} />
        </div>)

}



function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ switchToResidentDashboard }, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        residentList: state.oracle.residentList,
        residentFilter: state.oracle.residentFilter
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NormativeTable);

