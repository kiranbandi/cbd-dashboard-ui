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
    residentMetrics: {
        main: `This dashboard organizes the EPAs that have been completed by each of the residents in the program with the goal of informing resident learning and comptence committee assessment.`,
        checklist: `Clicking this button will load a task list that can be populated and tracked by the resident, academic advisers, and/or competency committee members that have access to the dashboard.`,
        viewHistory: `This button loads rotation schedules from prior years. It will not open if rotations from prior years have not been entered.`,
        viewEPAsBlock: `This button displays the number of EPAs completed during the specified rotation. A percentage and heat map (from red to green) indicates whether this is below, at, or above the number expected by the program. Programs can specify the expected number of EPAs per rotation.`,
        calendarSlider: `Adjusting this slider helps to identify EPAs completed on a given rotation. EPAs completed on the selected rotation will be represented on the dashboard throughout the dashboard as 'open diamonds' instead of 'closed circles.' This can be helpful to identify EPAs that were completed since the last review.`,
        writtenExamScores: `This graph displays the written exam scores (reported as a score from 0-100). This data will only appear if entered by a Program Administrator.`,
        oralExamScores: `This graph displays the oral exam scores (reported as a score from 0-100) from oral exams in the year selected in the drop-down menu. Mouse-over each score to see any associated comments. This data will only appear if entered by a Program Administrator.`,
        recentEPAs: `This graph displays the most recently completed EPAs by time (oldest to newest on the horizontal axis) and entrustment score ('I had to do' to 'I didn't need to be there on the vertical axis).  The drop-down menu can load the last 10, last 25, last 1 month, or last 3 months of EPAs. Mousing over each EPA displays additional EPA details.`,
        competenceCommitteeFeedbackAndResidentProgress: `This graph displays feedback from previous Competence Committees by time (oldest to newest on the horizontal axis) and rating (inactive to accelerated on the vertical axis). Promotion between stages is indicated by green lines. This information will only appear if this feedback has been entered into the dashboard (this can be done by a program administrator).`,
        showEPAPlan: `Click to view the assessment plan for this EPA.`,
        showEPATable: `Clicking the 'open book' icon opens a sortable, searchable graph displaying detailed information on each EPA. This information can also be seen by mousing-over individual EPAs.`,
        showEPAFilter: `Clicking the 'gears' icon opens a list of drop-down menus for contextual variables. When one or more contextual variable is selected the EPAs containing that variable will turn from black to pink.`,
        viewNarratives: `This table displays data from non-EPA-specific narratives submitted to Mainport ePortfolio.`,
        viewExpiredEPAs: `This table displays data from EPAs the resident has sent which have expired.`
    },
    normativeAssessment: {
        main: `This dashboard compares the EPA completion and expiration of each of the residents in the program with the goal of providing normative context to the competence committee.`,
        getRecords: `Select a resident stage to chart the EPA metrics of the residents currently in that stage. The number of EPAs/week, total number of EPAs, and EPA expiry percentage can be reviewed by selecting the respective graph. Clicking 'Filter by Date' adds the same metrics for the specified time interval.`
    },
    programEvaluation: {
        main: `This dashboard organizes all of the EPAs that have been completed for residents in the program by the rotation and year they were completed during with the goal of informing program evaluation.`,
        overallAcuisitionMetricsYears: `These EPA metrics contextualize the EPAs that have been completed within your program across several academic years`,
        overallAcuisitionMetrics: `These EPA metrics contextualize the EPAs that have been completed within your program over every selected academic year. The 'EPA Rating' graphic demonstrates the number of EPAs that have been rated at each level of entrustment from 1 (I had to do) to 5 (I didn't need to be there).`,
        EPASpecificRotationDistribution: `This graph displays the number of the selected EPA that have been observed during each rotation.`,
        rotationSpecificEPADistribution: `This graph displays the number of EPAs that have been observed during the selected rotation.`,
        EPACompletionDistribution: `This graph demonstrates which EPAs are not being completed enough (<100%) and which are being completed too much (>100%) relative to the assessment plan for your discipline. Simply put, it will readily identify any EPAs within your program that are not getting filled out at an adequate rate so that investigations and interventions can occur to address anticipated shortfalls before residents reach the end of the stage. The percentage values are calculated within each stage using data from all of the EPAs completed in the selected academic year using the following equation: 100 * (Number of TTD 1 EPAs completed / Number of TTD EPAs completed) / (Number of TTD 1 EPAs needed / Number of TTD EPAs needed). Previous years can be loaded using the drop-down menu.`,
        EPACompletionDistributionStage: `These values show the degree of deviation from the EPA completion ratio outlined in the program's assessment plan for each training stage and overall. Divergence is higher when EPAs in a stage are over- and under-represented relative to the assessment plan. A heat map (0% green, 50% yellow, 100% red) highlights programs/stages of concern so that investigations and interventions can occur to address these deviations and ensure that residents are given adequate opportunity to complete all of the EPAs before they reach the end of their current stage of training.`,
        EPACountPerRotation: `This graph demonstrates the average number of EPAs completed on a given rotation for residents in your program. It is calculated by dividing the number of EPAs completed by your residents when they are on that rotation by the number of times residents from your program have completed that rotation. The data from previous academic years can be reviewed by adjusting the drop-down menu.`,
        EPAMonthlyDistribution: `This graph demonstrates the number of EPA observations submitted per month over multiple years. It is intended to identify increases and decreases in EPA assessments over seasons and years.`,
        Report: `Clicking the Report button will prepare a PDF version of this page (with the exception of the 'EPA Specific Rotation Distribution' and 'Rotation Specific EPA Distribution' - these do not appear in the Export).`
    },
    comparePrograms: {
        OverallAcquisitionMetricsForAllPrograms: `These EPA metrics contextualize the EPAs that have been completed within all programs over the selected academic year. The 'EPA Rating' graphic demonstrates the number of EPAs that have been rated at each level of entrustment from 1 (I had to do) to 5 (I didn't need to be there). The 'Training Stage' graphic demonstrates the proportion of residents in each stage of training.`,
        EPAsAcquiredAndExpired: `This graph displays the number of EPAs that have been completed and expired in each program. Mouse-over each row for additional details.`,
        EPAsAcquiredAndExpired: `This graph displays the number of EPAs that have been completed and expired in each program per resident. Mouse-over each row for additional details.`,
        ResidentTrainingStageDistribution: `This stack chart displays the proportion of residents in each program that are in each stage of training (TTD, Foundations, Core, TTP). Mouse-over each row for additional details.`,
        EPARatingDistribution: `This stack chart displays the proportion of EPAs in each program that have been rated at each level of entrustment ('I had to do' to 'I didn't need to be there'). Mouse-over each row for additional details.`,
        EPAFeedbackWordCount: `This graph displays the average number of words contained within the completed EPAs of each program. The length of the feedback has been found to correlate with feedback quality.`,
        MonthlyDistributionByProgram: `These graphs display the number of EPAs completed within each of the programs during each month of the selected year.`,
        ProgramFeedbackDistribution: `This stack chart displays the proportion of residents in each program that have been given a particular type of feedback at their last CC Meeting. Mouse-over each row for additional details.`,
        programEPAcompletionDivergence: `This graph demonstrates the degree of deviation from the EPA completion ratio outlined in each program's assessment plan for each training stage and overall. Divergence is higher when EPAs in a stage are over- and under-represented relative to the assessment plan. A heat map (0% green, 50% yellow, 100% red) highlights programs/stages of concern so that investigations and interventions can occur to address these deviations and ensure that residents are given adequate opportunity to complete all of the EPAs before they reach the end of their current stage of training.`

    }
}