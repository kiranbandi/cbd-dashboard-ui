import React, { Component } from 'react';
// import ReactSelect from 'react-select';
import processSingleProgramRecords from '../../utils/processSingleProgramRecords';
import Summary from '../ProgramEvaluationGroup/ProgramSummary';
// import EPAspecificRotation from '../ProgramEvaluationGroup/EPAspecificRotation';
// import RotationSpecificEPA from '../ProgramEvaluationGroup/RotationSpecificEPA';
import EPAOverallbyRotation from '../ProgramEvaluationGroup/EPAOverallbyRotation';

export default class ProgramBasePanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            academicYear: { 'label': '2020-2021', 'value': '2020' },
            selected: 'all',
            rotationCount: {}
        };
        // this.selectionChange = this.selectionChange.bind(this);
        // this.onSelectAcademicYear = this.onSelectAcademicYear.bind(this);
    }

    // selectionChange(event) {
    //     event.preventDefault();
    //     let selected = event.target.className.split(" ")[1].split("-")[2];
    //     this.setState({ selected });
    // }

    // onSelectAcademicYear(academicYear) {
    //     this.setState({ academicYear });
    // }


    render() {

        const { allRecords, programInfo, residentList,
            possibleAcademicYears, width } = this.props,
            { academicYear, selected } = this.state;

        const { recordsInYearAndPhase, summaryData } = processSingleProgramRecords(allRecords, possibleAcademicYears[0]);

        return (
            <div className='program-base-panel text-center'>
                {/* <div className='row'>
                    <div className='year-selection-box'>
                        <h2 className='header'>Academic Year: </h2>
                        <div className='react-select-root'>
                            <ReactSelect
                                value={academicYear}
                                options={possibleAcademicYears}
                                styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                onChange={this.onSelectAcademicYear} />
                        </div>
                    </div>
                    <div className='selection-box-container'>
                        <h2 className='header'>Resident Stage : </h2>
                        <div
                            className={'selection-box box-id-all' + " " + (selected == 'all' ? 'selected-button' : '')}
                            key={'select-all'} onClick={this.selectionChange}> All Stages
                        </div>
                        {_.map(programInfo.epaSourceMap, (inner, i) => {
                            return <div
                                className={'selection-box box-id-' + (inner.ID) + " " + (selected == (inner.ID) ? 'selected-button' : '')}
                                key={'select-' + inner.ID}
                                onClick={this.selectionChange}>
                                {inner.topic}
                            </div>
                        })}
                    </div>
                </div> */}
                <div className='row m-t'>
                    <Summary data={summaryData} possibleAcademicYears={possibleAcademicYears} />
                    {/* <EPAspecificRotation
                        width={width / 2}
                        epaSourceMap={programInfo.epaSourceMap}
                        filteredRecords={recordsInYearAndPhase} />
                    <RotationSpecificEPA
                        width={width / 2}
                        epaSourceMap={programInfo.epaSourceMap}
                        rotationList={programInfo.rotationList}
                        filteredRecords={recordsInYearAndPhase} /> */}
                    <EPAOverallbyRotation
                        // 40px to account for margin around the boxes above
                        width={(width)}
                        allRecords={recordsInYearAndPhase} />
                </div>
            </div>
        );
    }
}



