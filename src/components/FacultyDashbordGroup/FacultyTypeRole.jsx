import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
import infoTooltipReference from '../../utils/infoTooltipReference';

const schemeCategory10 = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
export default class FacultyTypeRole extends PureComponent {

    render() {
        const { title, width, data = [] } = this.props;

        // First group records by Asessor Type
        const groupedByAssessorType = _.groupBy(data, (d) => d.Assessor_Type);
        // Then only take the internal assessors and group them by roles
        const internalGroupedByAssessorGroup = _.groupBy(groupedByAssessorType['internal'] || [], (d) => d.Assessor_Group);
        // Then group the assessors by role
        const GroupedByAssessorRole = _.groupBy(groupedByAssessorType['internal'] || [], (d) => d.Assessor_Role);

        const partWidth = width / 3;
        // Map data for pie charts
        let groupData = _.map(internalGroupedByAssessorGroup, (recs, d) => ({ 'name': capitalizeStr(d), 'value': recs.length })),
            roleData = _.map(GroupedByAssessorRole, (recs, d) => ({ 'name': capitalizeStr(d), 'value': recs.length })),
            typeData = _.map(groupedByAssessorType, (recs, d) => ({ 'name': capitalizeStr(d), 'value': recs.length }))

        // role filter to top 10 hits 
        roleData = roleData.sort((a, b) => b.value - a.value).slice(0, 10);

        return (

            <div className={'faculty-graph-box m-r m-b '}>
                <h3 className="text-left m-b">
                    {title}
                    <i data-for={'faculty-typerole-infotip'} data-tip={infoTooltipReference.programEvaluation.TypeAndGroupAndRole} className="fa fa-info-circle instant-tooltip-trigger"></i>
                </h3>
                <div className='assessor-pie-box'>
                    <PieChart width={partWidth} height={300}>
                        <Pie
                            data={typeData}
                            cx={partWidth * 0.5}
                            cy={115}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value" label>
                            {data.sort((a, b) => b - a).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={schemeCategory10[index % schemeCategory10.length]} />
                            ))}
                        </Pie>
                        <Legend wrapperStyle={{ 'color': 'black' }} />
                        <Tooltip labelStyle={{ 'color': 'black' }} />
                    </PieChart>
                    <h4 className='assessor-pie-title'>Type</h4>
                </div>

                <div className='assessor-pie-box'>
                    <PieChart width={partWidth} height={300}>
                        <Pie
                            data={groupData}
                            cx={partWidth * 0.5}
                            cy={115}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value" label>
                            {data.sort((a, b) => b - a).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={schemeCategory10[index % schemeCategory10.length]} />
                            ))}
                        </Pie>
                        <Legend wrapperStyle={{ 'color': 'black' }} />
                        <Tooltip labelStyle={{ 'color': 'black' }} />
                    </PieChart>
                    <h4 className='assessor-pie-title'>Group(Internal Assessors)</h4>
                </div>
                <div className='assessor-pie-box'>

                    <PieChart width={partWidth} height={300}>
                        <Pie
                            data={roleData}
                            cx={partWidth * 0.5}
                            cy={115}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value" label>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={schemeCategory10[index % schemeCategory10.length]} />
                            ))}
                        </Pie>
                        <Legend wrapperStyle={{ 'color': 'black' }} />
                        <Tooltip labelStyle={{ 'color': 'black' }} />
                    </PieChart>
                    <h4 className='assessor-pie-title'>Role(Internal Assessors)</h4>
                </div>
                <ReactTooltip id={'faculty-typerole-infotip'} className='custom-react-tooltip' />
            </div>
        );
    }
}


const capitalizeStr = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
