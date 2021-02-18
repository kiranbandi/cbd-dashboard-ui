export default {
    residentMetrics: {
        main: `This dashboard organizes the EPAs that have been completed by each of the residents in the program with the goal of informing resident learning and comptence committee assessment.`,
        viewHistory: `This button loads rotation schedules from prior years. It will not open if rotations from prior years have not been entered.`,
        viewEPAsBlock: `This button displays the number of EPAs completed during the specified rotation. A percentage and heat map (from red to green) indicates whether this is below, at, or above the number expected by the program. Programs can specify the expected number of EPAs per rotation.`,
        calendarSlider: `Adjusting this slider helps to identify EPAs completed on a given rotation. EPAs completed on the selected rotation will be represented on the dashboard throughout the dashboard as 'open diamonds' instead of 'closed circles.' This can be helpful to identify EPAs that were completed since the last review.`,
        recentEPAs: `This graph displays the most recently completed EPAs by time (oldest to newest on the horizontal axis) and entrustment score ('I had to do' to 'I didn't need to be there on the vertical axis).  The drop-down menu can load the last 10, last 25, last 1 month, or last 3 months of EPAs. Mousing over each EPA displays additional EPA details.`,
        showEPAPlan: `Click to view the assessment plan for this EPA.`,
        showEPATable: `Clicking the 'open book' icon opens a sortable, searchable graph displaying detailed information on each EPA. This information can also be seen by mousing-over individual EPAs.`,
        showEPAFilter: `Clicking the 'gears' icon opens a list of drop-down menus for contextual variables. When one or more contextual variable is selected the EPAs containing that variable will turn from black to pink.`,
    },
    normativeAssessment: {
        main: `This dashboard compares the EPA completion of each of the residents in the program with the goal of providing normative context to the competence committee.`,
        getRecords: `Select a resident stage to chart the EPA metrics of the residents currently in that stage. The information can be reviewed by selecting the respective graph. Clicking 'Filter by Date' adds the same metrics for the specified time interval.`
    }
}