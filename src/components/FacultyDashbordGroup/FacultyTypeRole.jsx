import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { schemeCategory10 } from 'd3';

export default class FacultyTypeRole extends PureComponent {

    render() {
        const { title, width, data = [], currentFaculty, currentFacultyData } = this.props;

        const flatRecords = _.flatMap(data, (d) => d.records);

        // First group records by Asessor Type
        const groupedByAssessorType = _.groupBy(flatRecords, (d) => d.Assessor_Type);
        // Then only take the internal assessors and group them by roles
        const internalGroupedByAssessorGroup = _.groupBy(groupedByAssessorType['internal'] || [], (d) => d.Assessor_Group);
        // Then group the assessors by role
        const GroupedByAssessorRole = _.groupBy(groupedByAssessorType['internal'] || [], (d) => d.Assessor_Role);

        const partWidth = width / 2;
        // Map data for pie charts
        let groupData = _.map(internalGroupedByAssessorGroup, (recs, d) => ({ 'name': capitalizeStr(d), 'value': recs.length })),
            roleData = _.map(GroupedByAssessorRole, (recs, d) => ({ 'name': capitalizeStr(d), 'value': recs.length }));

        // role filter to top 10 hits 
        roleData = roleData.sort((a, b) => b.value - a.value).slice(0, 10);

        const currentFacultyGroup = currentFacultyData.records && currentFacultyData.records[0] && currentFacultyData.records[0].Assessor_Group,
            currentFacultyRole = currentFacultyData.records && currentFacultyData.records[0] && currentFacultyData.records[0].Assessor_Role;

        return (

            <div className={'faculty-graph-box m-r m-b '}>
                <h3 className="text-left m-b">
                    {title}
                    {(currentFacultyGroup && currentFacultyRole) && <b className='title-append'>{capitalizeStr(currentFacultyGroup) + " (" + capitalizeStr(currentFacultyRole) + ")"}</b>}
                </h3>
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
                        <Tooltip labelStyle={{ 'color': 'black' }}
                            formatter={(value, name, props) => {
                                return [value, name];
                            }} />
                    </PieChart>
                    <h4 className='assessor-pie-title'>Group</h4>
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
                        <Tooltip labelStyle={{ 'color': 'black' }}
                            formatter={(value, name, props) => {
                                return [value, name];
                            }} />
                    </PieChart>
                    <h4 className='assessor-pie-title'>Role</h4>
                </div>

            </div>
        );
    }
}


const capitalizeStr = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
