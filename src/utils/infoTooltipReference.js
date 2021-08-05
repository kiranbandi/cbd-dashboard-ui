export default {
    residentMetrics: {
        main: `This dashboard organizes the EPAs that have been completed by each of the residents in the program with the goal of informing resident learning and comptence committee assessment.`,
        dateFilter: `Click this to enable a date filter that allows users to highlight assessments that fall in a time period. The assessments in the selected time period turn from regular round points to diamond shaped points.`,
        viewHistory: `This button loads rotation schedules from prior years if available.`,
        viewEPAsBlock: `This button displays the number of EPAs completed during the specified rotation. A heat map (from red to green) indicates whether this is below, at, or above 10 EPAs per block.`,
        rotationSchedule: `A chronological map of the one45 rotation schedule of the resident. Hover the mouse over any block to see additional information about that rotation block.`,
        acquisitionMetricsForResident: `The boxes to the left show the amalgamated metrics for EPAs completed by the selected resident. The chart to the right visualizes the weekly EPA acquisition rate of the resident for the last six months.`,
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
        filterOutFacultyWithMinimumRecords: `Adjust this slider to exclude faculty with less than the selected number of EPAs completed. This helps in excluding external reviewers or reviewers from other programs whose data isnt relevant to this program.`,
        acquisitionMetricsForAllFaculty: `These are the amalgamated metrics for EPAs completed by all Faculty in a given rotation. Mouse-over the EPA Rating visual to see the proportion of EPAs rated at each level of entrustment. Mouse-over the Training Stage visual to see the proportion of EPAs completed in each stage of training.`,
        acquisitionMetricsForSingleFaculty: `These are the metrics for EPAs completed by the selected Faculty. Mouse-over the EPA Rating visual to see the proportion of EPAs rated at each level of entrustment. Mouse-over the Training Stage visual to see the proportion of EPAs completed in each stage of training.`,
        EPADistribution: `This spider plot displays the breadth of the EPAs that the Faculty member completes. A Faculty that fills out EPAs in proportion to the program's requirements would display a perfect circle.`,
        totalEPAsObserved: `This chart displays the number of EPAs observed by each faculty member. Mouse-over for each faculty's name and click to highlight that faculty member's data. If a faculty is selected, their EPA count is shown in the chart title in red.`,
        EPAExpiryRate: `This chart displays the percentage of EPAs sent to each faculty member that expired before completion. Mouse-over for each faculty's name and click to highlight that faculty member's data. `,
        averageEntrustmentScore: `This chart displays the average entrustment score of EPAs completed by each faculty member. Mouse-over for each faculty's name and click to highlight that faculty member's data. If a faculty is selected, their average entrustment score is shown in the chart title in red. `,
        averageWordsPerComment: `This chart displays the average number of words per comment included with the EPAs completed by each faculty member. Mouse-over for each faculty's name and click to highlight that faculty member's data. If a faculty is selected, their average words per comment metric is shown in the chart title in red. `,
        summaryOfEPAsByFacultyName: `This table displays EPAs completed by the selected Faculty. It is searchable (click the white box) and sortable (click the column header).`,
        groupAndRole: `The following pie charts show the distribution of the different assessor roles and groups. If a faculty is selected, their group and role are shown in the chart title in red.`
    }
}