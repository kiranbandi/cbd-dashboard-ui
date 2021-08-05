import React, { Component } from 'react';
import FacultyGraph from './FacultyGraph';
import FacultyTypeRole from './FacultyTypeRole';
import infoTooltipReference from '../../utils/infoTooltipReference';

export default class FacultyGraphGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { width, processedRecords, allResidentRecords, selectFaculty, currentFaculty, all } = this.props;

        // format the data into the required format for a graph component
        const data_epa_count = _.map(processedRecords, (d) => [d.faculty_name, d.epa_count]);
        // entrustment_score data
        // for entrustment scores since we cannot show EPA scores that havent been graded we remove the expired ones
        const data_entrustment_score = _.map(processedRecords, (d) => [d.faculty_name, d.entrustment_score]);
        // words_per_comment data
        const data_words_per_comment = _.map(processedRecords, (d) => [d.faculty_name, d.words_per_comment]);

        const currentFacultyData = _.find(processedRecords, (d) => d.faculty_name == currentFaculty) || false;

        return (<div>
            {processedRecords.length > 0 && <div className='text-center'>
                <FacultyGraph
                    tooltipRef={infoTooltipReference.facultyDevlopment.totalEPAsObserved}
                    tooltipID={'faculty-epacount-infotip'}
                    title={'Total EPAs Observed '}
                    titleValue={!!currentFacultyData ? currentFacultyData.epa_count : ''}
                    currentFaculty={currentFaculty}
                    trackType={'epa_count'}
                    data={data_epa_count}
                    selectFaculty={selectFaculty}
                    width={(width / 2) - 50} />
                <FacultyGraph
                    tooltipRef={infoTooltipReference.facultyDevlopment.averageEntrustmentScore}
                    tooltipID={'faculty-epascore-infotip'}
                    title={'Average Entrustment Score '}
                    titleValue={!!currentFacultyData ? currentFacultyData.entrustment_score : ''}
                    currentFaculty={currentFaculty}
                    trackType={'entrustment_score'}
                    data={data_entrustment_score}
                    selectFaculty={selectFaculty}
                    width={(width / 2) - 50} />
                <FacultyGraph
                    tooltipRef={infoTooltipReference.facultyDevlopment.averageWordsPerComment}
                    tooltipID={'faculty-comment-infotip'}
                    title={'Average Words Per Comment '}
                    titleValue={!!currentFacultyData ? currentFacultyData.words_per_comment : ''}
                    currentFaculty={currentFaculty}
                    trackType={'words_per_comment'}
                    data={data_words_per_comment}
                    selectFaculty={selectFaculty}
                    width={(width / 2) - 50} />
                <FacultyTypeRole
                    title={'Assessor Group and Role Distribution'}
                    width={(width / 2) - 50}
                    data={processedRecords}
                    currentFacultyData={currentFacultyData}
                    currentFaculty={currentFaculty} />
            </div>}
        </div>

        );


    }

}