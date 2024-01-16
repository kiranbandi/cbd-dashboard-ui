import React, { Component } from 'react';
import FacultyGraph from './FacultyGraph';

export default class FacultyGraphGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { printModeON, width, processedRecords,
            dateFilterActive, startDate, endDate, selectFaculty,
            currentFaculty, isUG = false, qualScoreEnabled = false } = this.props;

        // format the data into the required format for a graph component
        // epa_count data
        const data_epa_count = _.map(processedRecords, (d) => [d.faculty_name, d.epa_count, d.epa_count_period]);
        // expired_epa_percentage data
        const data_expired_epa_percentage = _.map(processedRecords, (d) => [d.faculty_name, d.expired_epa_percentage, d.expired_epa_percentage_period]);
        // suggestion_percentage data
        const data_suggestion_percentage = _.map(processedRecords, (d) => [d.faculty_name, d.suggestion_percentage, d.suggestion_percentage_period]);
        // entrustment_score data
        // for entrustment scores since we cannot show EPA scores that havent been graded we remove the expired ones
        const data_entrustment_score = _.map(processedRecords, (d) => [d.faculty_name, d.entrustment_score, d.entrustment_score_period]);
        // words_per_comment data
        const data_words_per_comment = _.map(processedRecords, (d) => [d.faculty_name, d.words_per_comment, d.words_per_comment_period]);
        // NLP QualScore data
        const data_qual_score = _.map(processedRecords, (d) => [d.faculty_name, d.qual_score, d.qual_score_period]);

        const currentFacultyData = _.find(processedRecords, (d) => d.faculty_name == currentFaculty) || false;

        return (<div>
            {processedRecords.length > 0 && <div className='text-center'>
                <FacultyGraph
                    title={'Total EPAs Observed '}
                    className={'printable-graph-1'}
                    titleValue={!!currentFacultyData ? currentFacultyData.epa_count : ''}
                    secondTitleValue={!!currentFacultyData ? currentFacultyData.epa_count_period : ''}
                    printModeON={printModeON}
                    dateFilterActive={dateFilterActive}
                    startDate={startDate}
                    endDate={endDate}
                    currentFaculty={currentFaculty}
                    trackType={'epa_count'}
                    data={data_epa_count}
                    selectFaculty={selectFaculty}
                    width={((isUG ? printModeON ? width : 2 * width : width) / 2) - 50} />
                {!isUG && <FacultyGraph
                    title={'EPA Expiry Rate '}
                    className={'printable-graph-2'}
                    titleValue={!!currentFacultyData ? currentFacultyData.expired_epa_percentage + '%' : ''}
                    secondTitleValue={!!currentFacultyData ? currentFacultyData.expired_epa_percentage_period + '%' : ''}
                    printModeON={printModeON}
                    dateFilterActive={dateFilterActive}
                    startDate={startDate}
                    endDate={endDate}
                    currentFaculty={currentFaculty}
                    trackType={'expired_epa_percentage'}
                    data={data_expired_epa_percentage}
                    selectFaculty={selectFaculty}
                    width={(width / 2) - 50} />}
                <FacultyGraph
                    title={'Average Entrustment Score '}
                    className={'printable-graph-3'}
                    isUG={isUG}
                    titleValue={!!currentFacultyData ? currentFacultyData.entrustment_score : ''}
                    secondTitleValue={!!currentFacultyData ? currentFacultyData.entrustment_score_period : ''}
                    printModeON={printModeON}
                    dateFilterActive={dateFilterActive}
                    startDate={startDate}
                    endDate={endDate}
                    currentFaculty={currentFaculty}
                    trackType={'entrustment_score'}
                    data={data_entrustment_score}
                    selectFaculty={selectFaculty}
                    width={(width / 2) - 50} />
                <FacultyGraph
                    title={'Average Words Per Comment '}
                    className={'printable-graph-4'}
                    titleValue={!!currentFacultyData ? currentFacultyData.words_per_comment : ''}
                    secondTitleValue={!!currentFacultyData ? currentFacultyData.words_per_comment_period : ''}
                    printModeON={printModeON}
                    dateFilterActive={dateFilterActive}
                    startDate={startDate}
                    endDate={endDate}
                    currentFaculty={currentFaculty}
                    trackType={'words_per_comment'}
                    data={data_words_per_comment}
                    selectFaculty={selectFaculty}
                    width={(width / 2) - 50} />


                {qualScoreEnabled &&
                    <FacultyGraph
                        title={'Quality of Assessment for Learning score (QuAL score)'}
                        className={'printable-graph-5'}
                        titleValue={!!currentFacultyData ? currentFacultyData.qual_score : ''}
                        secondTitleValue={!!currentFacultyData ? currentFacultyData.qual_score_period : ''}
                        printModeON={printModeON}
                        dateFilterActive={dateFilterActive}
                        startDate={startDate}
                        endDate={endDate}
                        currentFaculty={currentFaculty}
                        trackType={'qual_score'}
                        data={data_qual_score}
                        selectFaculty={selectFaculty}
                        width={(width / 2) - 50} />}

                {qualScoreEnabled &&
                    <FacultyGraph
                        title={'Suggestion Given Rate'}
                        className={'printable-graph-6'}
                        titleValue={!!currentFacultyData ? currentFacultyData.suggestion_percentage + '%' : ''}
                        secondTitleValue={!!currentFacultyData ? currentFacultyData.suggestion_percentage_period + '%' : ''}
                        printModeON={printModeON}
                        dateFilterActive={dateFilterActive}
                        startDate={startDate}
                        endDate={endDate}
                        currentFaculty={currentFaculty}
                        trackType={'suggestion_percentage'}
                        data={data_suggestion_percentage}
                        selectFaculty={selectFaculty}
                        width={(width / 2) - 50} />}
            </div>}
        </div>

        );


    }

}