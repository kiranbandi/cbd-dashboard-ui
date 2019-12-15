import React, { Component } from 'react';
import FacultyGraph from './FacultyGraph';

export default class FacultyGraphGroup extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { width, processedRecords, dateFilterActive, startDate, endDate, currentFaculty } = this.props;

        // format the data into the required format for a graph component
        // epa_count data
        const data_epa_count = _.map(processedRecords, (d) => [d.faculty_name, d.epa_count, d.epa_count_period]);
        // expired_epa_percentage data
        const data_expired_epa_percentage = _.map(processedRecords, (d) => [d.faculty_name, d.expired_epa_percentage, d.expired_epa_percentage_period]);
        // entrustment_score data
        const data_entrustment_score = _.map(processedRecords, (d) => [d.faculty_name, d.entrustment_score, d.entrustment_score_period]);
        // words_per_comment data
        const data_words_per_comment = _.map(processedRecords, (d) => [d.faculty_name, d.words_per_comment, d.words_per_comment_period]);

        return (
            <div className='text-center'>
                <div className='faculty-graph-box m-r m-b'>
                    <div className="hr-divider">
                        <h4 className="hr-divider-content"> Total EPAs Observed Trend </h4>
                    </div>
                    <FacultyGraph
                        dateFilterActive={dateFilterActive}
                        startDate={startDate}
                        endDate={endDate}
                        currentFaculty={currentFaculty}
                        trackType={'epa_count'}
                        data={data_epa_count}
                        width={(width / 2) - 50} />
                </div>
                <div className='faculty-graph-box m-b'>
                    <div className="hr-divider">
                        <h4 className="hr-divider-content">EPA Expiry Trend  </h4>
                    </div>
                    <FacultyGraph
                        dateFilterActive={dateFilterActive}
                        startDate={startDate}
                        endDate={endDate}
                        currentFaculty={currentFaculty}
                        trackType={'expired_epa_percentage'}
                        data={data_expired_epa_percentage}
                        width={(width / 2) - 50} />
                </div>
                <div className='faculty-graph-box m-r m-b'>
                    <div className="hr-divider">
                        <h4 className="hr-divider-content"> Average Entrustment Score Trend </h4>
                    </div>
                    <FacultyGraph
                        dateFilterActive={dateFilterActive}
                        startDate={startDate}
                        endDate={endDate}
                        currentFaculty={currentFaculty}
                        trackType={'entrustment_score'}
                        data={data_entrustment_score}
                        width={(width / 2) - 50} />
                </div>
                <div className='faculty-graph-box m-b'>
                    <div className="hr-divider">
                        <h4 className="hr-divider-content"> Average Words Per Comment Trend </h4>
                    </div>
                    <FacultyGraph
                        dateFilterActive={dateFilterActive}
                        startDate={startDate}
                        endDate={endDate}
                        currentFaculty={currentFaculty}
                        trackType={'words_per_comment'}
                        data={data_words_per_comment}
                        width={(width / 2) - 50} />
                </div>
            </div>
        );


    }

}