export default {
    residentMetrics: {
        main: `This dashboard organizes the EPAs that have been completed by each of the residents in the program with the goal of informing resident learning and comptence committee assessment.`,
        dateFilter: `Click this to enable a date filter that allows users to highlight assessments that fall in a time period. The assessments in the selected time period turn from regular round points to diamond shaped points.`,
        viewHistory: `This button loads rotation schedules from prior years if available.`,
        viewEPAsBlock: `This button displays the number of EPAs completed during the specified rotation. A heat map (from red to green) indicates whether this is below, at, or above 10 EPAs per block.`,
        rotationSchedule: `A chronological map of the one45 rotation schedule of the resident. Hover the mouse over any block to see additional information about that rotation block.`,
        acquisitionMetricsForResident: `The boxes to the left show the amalgamated metrics for EPAs completed by the selected resident. The chart to the right visualizes the weekly EPA acquisition rate of the resident for the last six months.`,
        viewExpiredEPAs: `This table shows you a list of all assessments that are still inprogress but past their expiry date.`,
        recentEPAs: `This graph displays the most recently completed EPAs by time (oldest to newest on the horizontal axis) and entrustment score ('I had to do' to 'I didn't need to be there') on the vertical axis.  The drop-down menu can load the last 10, last 25, last 1 month, or last 3 months of EPAs. Mousing over each EPA displays additional EPA details.`,
        showEPATable: `Clicking the 'open book' icon opens a table displaying detailed information on each assessment. The table is sortable (click column header) and searchable (click in the white box and type). This information can also be seen by mousing-over individual EPAs.`,
        showEPAFilter: `Clicking the 'gears' icon opens a list of drop-down menus for contextual variables. When one or more contextual variable is selected the EPAs containing that variable will turn from black to red.`,
        showObjectiveBreakdown: `Clicking the 'info' icon opens a popup with a breakdown of the completed and required objectives for the given EPA.`
    },
    normativeAssessment: {
        main: `This dashboard compares the EPA completion of each of the residents in the program with the goal of providing normative context to the competence committee.`,
        stages: `Select a resident stage to chart the EPA metrics of the residents currently in that stage. By default EPA metrics are mapped for all stages combined. Additional information can be reviewed by selecting the respective graph using the radio buttons below. Finally residents without any data are filtered out by default but this can be toggled using the checkbox.`
    },
    facultyDevlopment: {
        main: `This dashboard organizes all of the EPAs that have been completed for residents in the program by the Faculty member that completed them with the goal of informing faculty development.`,
        filterFaculty: `Select a specific faculty member for their metrics to be highlighted. Alternatively you can click on any of the bars in the charts below to select that faculty.`,
        filterYear: `Select an academic year to only look at assessments completed in that year.`,
        filterDepartment: `Select a department to only look at assessments completed by assessors from that department.`,
        filterOutFacultyWithMinimumRecords: `Adjust this slider to exclude faculty with less than the selected number of EPAs completed. This helps in excluding external reviewers or reviewers from other programs whose data isnt relevant to this program.`,
        acquisitionMetricsForAllFaculty: `These are the amalgamated metrics for EPAs completed by all Faculty in a given rotation. Mouse-over the EPA Rating visual to see the proportion of EPAs rated at each level of entrustment. Mouse-over the Training Stage visual to see the proportion of EPAs completed in each stage of training.`,
        acquisitionMetricsForSingleFaculty: `These are the metrics for EPAs completed by the selected Faculty. Mouse-over the EPA Rating visual to see the proportion of EPAs rated at each level of entrustment. Mouse-over the Training Stage visual to see the proportion of EPAs completed in each stage of training.`,
        EPADistribution: `This spider plot displays the breadth of the EPAs that the Faculty member completes. A Faculty that fills out EPAs in proportion to the program's requirements would display a perfect circle.`,
        totalEPAsObserved: `This chart displays the number of EPAs observed by each faculty member. Mouse-over for each faculty's name and click to highlight that faculty member's data. If a faculty is selected, their EPA count is shown in the chart title in red.`,
        EPAExpiryRate: `This chart displays the percentage of EPAs sent to each faculty member that expired before completion. Mouse-over for each faculty's name and click to highlight that faculty member's data. `,
        averageEntrustmentScore: `This chart displays the average entrustment score of EPAs completed by each faculty member. Mouse-over for each faculty's name and click to highlight that faculty member's data. If a faculty is selected, their average entrustment score is shown in the chart title in red. `,
        averageWordsPerComment: `This chart displays the average number of words per comment included with the EPAs completed by each faculty member. Mouse-over for each faculty's name and click to highlight that faculty member's data. If a faculty is selected, their average words per comment metric is shown in the chart title in red. `,
        summaryOfEPAsByFacultyName: `This table displays EPAs completed by the selected Faculty. It is searchable (click the white box) and sortable (click the column header).`,
        summaryOfEPAsByExpiredFacultyName:`This table displays Expired EPAs that were not completed by the selected Faculty. It is searchable (click the white box) and sortable (click the column header) and can be exported as CSV file.`,
        groupAndRole: `The following pie charts show the distribution of the different assessor roles and groups. If a faculty is selected, their group and role are shown in the chart title in red.`
    },
    programEvaluation: {
        main: `This dashboard organizes all of the EPAs that have been completed for residents in the program by the rotation and year they were completed during with the goal of informing program evaluation.`,
        EPAsAcquiredAndExpired: `This graph displays the number of EPAs that have been completed per resident in each year.`,
        EPARatingDistribution: `This stack chart displays the proportion of EPAs in each year that have been rated at each level of entrustment ('I had to do' to 'I didn't need to be there'). Mouse-over each row for additional details.`,
        overallAcuisitionMetricsYears: `These EPA metrics contextualize the EPAs that have been completed within your program across different academic years`,
        overallAcuisitionMetricsbyYear: `These EPA metrics contextualize the EPAs that have been completed within your program over the selected academic year.`,
        overallAcuisitionMetrics: `These EPA metrics contextualize the EPAs that have been completed within your program over every selected academic year. The 'EPA Rating' graphic demonstrates the number of EPAs that have been rated at each level of entrustment from 1 (I had to do) to 5 (I didn't need to be there).`,
        EPASpecificRotationDistribution: `This graph displays the number of the selected EPA that have been observed during each rotation.`,
        rotationSpecificEPADistribution: `This graph displays the number of EPAs that have been observed during the selected rotation.`,
        EPACompletionDistribution: `This graph demonstrates which EPAs are not being completed enough (<100%) and which are being completed too much (>100%) relative to the assessment plan for your discipline. Simply put, it will readily identify any EPAs within your program that are not getting filled out at an adequate rate so that investigations and interventions can occur to address anticipated shortfalls before residents reach the end of the stage. The percentage values are calculated within each stage using data from all of the EPAs completed in the selected academic year using the following equation: 100 * (Number of TTD 1 EPAs completed / Number of TTD EPAs completed) / (Number of TTD 1 EPAs needed / Number of TTD EPAs needed). Previous years can be loaded using the drop-down menu.`,
        EPACompletionDistributionStage: `These values show the degree of deviation from the EPA completion ratio outlined in the program's assessment plan for each training stage and overall. Divergence is higher when EPAs in a stage are over- and under-represented relative to the assessment plan. A heat map (0% green, 50% yellow, 100% red) highlights programs/stages of concern so that investigations and interventions can occur to address these deviations and ensure that residents are given adequate opportunity to complete all of the EPAs before they reach the end of their current stage of training.`,
        EPACountPerRotation: `This graph demonstrates the average number of EPAs completed on a given rotation for residents in your program. It is calculated by dividing the number of EPAs completed by your residents when they are on that rotation by the number of times residents from your program have completed that rotation. The data from previous academic years can be reviewed by adjusting the drop-down menu.`,
        rotationDist: `This graph shows the total number of EPAs completed in a given rotation by residents in your program. By default only rotation schedules where the program is the scheduling group are shown here.`,
        rotationGroupFilter: `Use this filter to restrict data to a particular schedule group. By default this is set to the current active program if a matching schedule group is found with the same name.`,
        rotationClassification: `Use this to group the records based on different rotation criteria such as the name of the rotation or the site where the rotation was performed.`,
        EPAFeedbackWordCount: `This graph displays the average number of words contained within the completed EPAs of each year. The length of the feedback has been found to correlate with feedback quality.`,
        EPAMonthlyDistribution: `This graph visualizes the number of EPA observations submitted per month over multiple years. It is intended to identify increases and decreases in EPA assessments over seasons and years.`,
    },

    programOversight:{
        main: `This dashboard lets you compare metrics among different programs for the purpose of program oversight.`,
    },

    rotationModule: {
        main: `This page lets you import one45 rotation schedule data into the dashboard by academic year.`
    }

}