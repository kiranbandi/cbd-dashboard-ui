import React, { Component } from 'react';
import { scaleLinear } from 'd3';
import UGLineChart from './UGLineChart';
import UGSlideInTable from './UGSlideInTable';
import UGStudentSubFilter from './UGStudentSubFilter';
import PieChart from '../ReusableComponents/PieChart';

export default class GraphRow extends Component {

    constructor(props) {
        super(props);
        this.state = { admission_type: '', patient_type: '' };
        this.onHighlightChange = this.onHighlightChange.bind(this);
    }

    onHighlightChange(event) {
        let { admission_type, patient_type } = this.state,
            clickerID = event.target.id.split('-');



        // if one of the patient type buttons is clicked
        if (clickerID[0] == 'patient') {
            // if the same button is clicked twice we disable it
            if (clickerID[2] == patient_type) {
                patient_type = '';
            }
            else {
                patient_type = clickerID[2];
            }
        }
        // if one of the admission type buttons is clicked
        else {
            // if the same button is clicked twice we disable it
            if (clickerID[2] == admission_type) {
                admission_type = '';
            }
            else {
                admission_type = clickerID[2];
            }
        }

        this.setState({ admission_type, patient_type });

    }

    render() {

        const { admission_type = '', patient_type = '' } = this.state;

        let { epaSource, isTableVisible, currentRotation,
            widthPartition, smallScreen = false, epaSourceMap,
            studentEPAData, onMouseOut, onMouseOver,
            onTableExpandClick } = this.props;





        // margin of 10px on either side reduces the available width by 20
        var marginVertical = 40;
        var marginHorizontal = 40;
        var height = 220;
        var innerHeight = height - 20;
        var width = (smallScreen ? widthPartition : widthPartition * 2) - 20;

        // Get recorded observation count
        const recordedCount = studentEPAData.length;

        const xScale = scaleLinear().domain([0, studentEPAData.length - 1]).range([marginHorizontal, width - marginHorizontal])
        const yScale = scaleLinear().domain([5, 1]).range([marginVertical, innerHeight - marginVertical])


        let sortedData = _.sortBy(_.clone(studentEPAData), (d) => d.date);

        let scoreData = _.map(sortedData, (d, i) => {

            const record_admission_type = d.admission_type == 'in patient' ? 'in' : d.admission_type == 'out patient' ? 'out' : 'na';
            const record_patient_type = d.patient_type == 'adult' ? 'adult' : d.patient_type == 'pediatrics' ? 'child' : 'na';

            let highlight = false;
            if (admission_type.length > 0 && patient_type.length > 0) {
                highlight = ((record_admission_type == admission_type) && (record_patient_type == patient_type)) ? true : false;
            }
            else if (admission_type.length > 0) {
                highlight = (record_admission_type == admission_type);
            }
            else if (patient_type.length > 0) {
                highlight = (record_patient_type == patient_type);
            }

            return {
                x: xScale(i),
                y: yScale(d.rating),
                highlight,
                admission_type: record_admission_type,
                patient_type: record_patient_type,
                mark: d.mark,
                rotationMark: d.rotationMark
            };

        });


        const trackTrailPositions = _.map([...Array(5)], (d, i) => {
            return {
                x: marginHorizontal,
                dx: width - (2 * marginHorizontal),
                y: yScale(i + 1)
            }
        })

        return (
            <div className='text-xs-center'>
                {/* widthly reduced slightly by 10px to facilitate extra gap at the last */}
                <div style={{ width: (smallScreen ? widthPartition : widthPartition * 0.6) - 10 }} className='inner-cell epa-title-cell text-left' >
                    <span className='inner-offset-label text-left'>
                        <b>{"EPA " + epaSource + ": "}</b>{epaSourceMap.subRoot[epaSource]}
                    </span>
                </div>
                <div style={{ width: smallScreen ? widthPartition : widthPartition * 1.4 }} className='inner-cell observation-cell'>
                    <div className='card-container'>

                        <div className='chart-wrapper'>
                            <div className='graph-card first-card'>
                                <span className='card-text'>{recordedCount}</span>
                                <span className='card-label'>Completed</span>
                            </div>
                        </div>
                        <UGStudentSubFilter
                            patient_type={patient_type}
                            admission_type={admission_type}
                            onHighlightChange={this.onHighlightChange}
                            scoreData={scoreData} />
                    </div>

                </div>
                <div style={{ width: smallScreen ? widthPartition : widthPartition * 2 }} className='inner-cell score-cell'>
                    <UGLineChart
                        currentRotation={currentRotation}
                        trackTrailPositions={trackTrailPositions}
                        width={width}
                        data={scoreData}
                        epaSource={epaSource}
                        smallScreen={smallScreen}
                        innerHeight={innerHeight}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut} />
                    <span className={"icon table-icon icon-open-book " + epaSource + (isTableVisible ? ' open-table' : ' ')} onClick={onTableExpandClick}></span>
                </div>
                {!smallScreen && isTableVisible &&
                    <UGSlideInTable
                        data={studentEPAData}
                        width={widthPartition} />}
            </div>
        );
    }
}
