// var reference = {
//     'pc_acquired_expired': 'This chart shows the total number of EPAs that have been acquired (completed and not expired) by residents in each program and the total number of EPAs that have expired. It also show the average number of EPAs that are acquired and expired per resident in each program.'
// }

// module.exports = reference;

export default {
    facultyDevlopment: {
        main: `This dashboard organizes all of the EPAs that have been completed for residents in the program by the Faculty member that completed them with the goal of informing faculty development.`,
        getRecords: `Select a rotation to review EPA metrics for Faculty that completed EPAs on that rotation. Select a specific Faculty member for their metrics to be highlighted. Filter by date to compare a specified time interval to overall data.`,
        filterOutFacultyWithMinimumRecords: `Adjust this slider to exclude faculty with less than the selected number of EPAs completed from these analyses.`,
        acquisitionMetricsForAllFaculty: `These are the amalgamated metrics for EPAs completed by all Faculty in a given rotation. Mouse-over the EPA Rating visual to see the proportion of EPAs rated at each level of entrustment. Mouse-over the Training Stage visual to see the proportion of EPAs completed in each stage of training.`,
        acquisitionMetricsForSingleFaculty: `These are the metrics for EPAs completed by the selected Faculty. Mouse-over the EPA Rating visual to see the proportion of EPAs rated at each level of entrustment. Mouse-over the Training Stage visual to see the proportion of EPAs completed in each stage of training.`,
        EPADistribution: `This spider plot displays the breadth of the EPAs that the Faculty member completes. A Faculty that fills out EPAs in proportion to the program's requirements would display a perfect circle.`,
        totalEPAsObserved: `This chart displays the number of EPAs observed by each faculty member. Mouse-over for each faculty's name. Click to load that faculy member's dashboard. `,
        EPAExpiryRate: `This chart displays the percentage of EPAs sent to each faculty member that expired before completion. Mouse-over for each faculty's name. Click to load that faculy member's dashboard. `,
        averageEntrustmentScore: `This chart displays the average entrustment score of EPAs completed by each faculty member. Mouse-over for each faculty's name. Click to load that faculy member's dashboard. `,
        averageWordsPerComment: `This chart displays the average number of words per comment included with the EPAs completed by each faculty member. Mouse-over for each faculty's name. Click to load that faculy member's dashboard. `,
        summaryOfEPAsByFacultyName: `This table displays EPAs completed by the selected Faculty. It is searchable (click the white box) and sortable (click the column header).`,
        reportAndCondensedReport: `Clicking the Report button will prepare a PDF version of this page with the currently selected rotation and/or Faculty. Clicking condensed report does the same but removes the table of EPAs completed by the Faculty to present only unidentifiable data. These reports are intended to be used for Faculty coaching.`
    },
    residentMetrics: {},
    normativeAssessment: {
        main: `This dashboard compares the EPA completion and expiration of each of the residents in the program with the goal of providing normative context to the competence committee.`,
        getRecords: `Select a resident stage to chart the EPA metrics of the residents currently in that stage. The number of EPAs/week, total number of EPAs, and EPA expiry percentage can be reviewed by selecting the respective graph. Clicking 'Filter by Date' adds the same metrics for the specified time interval.`
    },
    programEvaluation: {
        main: `This dashboard organizes all of the EPAs that have been completed for residents in the program by the rotation and year they were completed during with the goal of informing program evaluation.`,
        overallAcuisitionMetrics: `These EPA metrics contextualize the EPAs that have been completed within your program over the selected academic year. The 'EPA Rating' graphic demonstrates the number of EPAs that have been rated at each level of entrustment from 1 (I had to do) to 5 (I didn't need to be there).`,
        EPASpecificRotationDistribution: `This graph displays the number of the selected EPA that have been observed during each rotation.`,
        rotationSpecificEPADistribution: `This graph displays the number of EPAs that have been observed during the selected rotation.`,
        EPACompletionDistribution: `This graph demonstrates which EPAs are not being completed enough (<100%) and which are being completed too much (>100%) relative to the assessment plan for your discipline. Simply put, it will readily identify any EPAs within your program that are not getting filled out at an adequate rate so that investigations and interventions can occur to address anticipated shortfalls before residents reach the end of the stage. The percentage values are calculated within each stage using data from all of the EPAs completed in the selected academic year using the following equation: 100 * (Number of TTD 1 EPAs completed / Number of TTD EPAs completed) / (Number of TTD 1 EPAs needed / Number of TTD EPAs needed). Previous years can be loaded using the drop-down menu.`,
        EPACountPerRotation: `This graph demonstrates the average number of EPAs completed on a given rotation for residents in your program. It is calculated by dividing the number of EPAs completed by your residents when they are on that rotation by the number of times residents from your program have completed that rotation. The data from previous academic years can be reviewed by adjusting the drop-down menu.`,
        EPAMonthlyDistribution: `This graph demonstrates the number of EPA observations submitted per month over multiple years. It is intended to identify increases and decreases in EPA assessments over seasons and years.`,
        Report: `Clicking the Report button will prepare a PDF version of this page (with the exception of the 'EPA Specific Rotation Distribution' and 'Rotation Specific EPA Distribution' - these do not appear in the Export).`
    },
    comparePrograms: {
        OverallAcquisitionMetricsForAllPrograms: `These EPA metrics contextualize the EPAs that have been completed within all programs over the selected academic year. The 'EPA Rating' graphic demonstrates the number of EPAs that have been rated at each level of entrustment from 1 (I had to do) to 5 (I didn't need to be there). The 'Training Stage' graphic demonstrates the proportion of residents in each stage of training.`,
        EPAsAcquiredAndExpired: `This graph displays the number of EPAs that have been completed and expired in each program. The toggle button allows this metric to be displayed per resident. Mouse-over each row for additional details.`,
        ResidentTrainingStageDistribution: `This stack chart displays the proportion of residents in each program that are in each stage of training (TTD, Foundations, Core, TTP). Mouse-over each row for additional details.`,
        EPARatingDistribution: `This stack chart displays the proportion of EPAs in each program that have been rated at each level of entrustment ('I had to do' to 'I didn't need to be there'). Mouse-over each row for additional details.`,
        EPAFeedbackWordCount: `This graph displays the average number of words contained within the completed EPAs of each program. The length of the feedback has been found to correlate with feedback quality.`,
        MonthlyDistributionByProgram: `These graphs display the number of EPAs completed within each of the programs during each month of the selected year.`
    }
}