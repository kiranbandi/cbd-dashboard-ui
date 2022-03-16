
export default {
  
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
        showEPATable: `Clicking the 'open book' icon opens a sortable, searchable table displaying detailed information on each EPA. This information can also be seen by mousing-over individual EPAs.`,
        showEPAFilter: `Clicking the 'gears' icon opens a list of drop-down menus for contextual variables. When one or more contextual variable is selected the EPAs containing that variable will turn from black to pink.`,
        viewNarratives: `This table displays data from non-EPA-specific narratives submitted to Mainport ePortfolio.`,
        viewExpiredEPAs: `This table displays data from EPAs the resident has sent which have expired.`
    },
    normativeAssessment: {
        main: `This dashboard compares the EPA completion and expiration of each of the residents in the program with the goal of providing normative context to the competence committee.`,
        getRecords: `Select a resident stage to chart the EPA metrics of the residents currently in that stage. The number of EPAs/week, total number of EPAs, and EPA expiry percentage can be reviewed by selecting the respective graph. Clicking 'Filter by Date' adds the same metrics for the specified time interval.`
    }
}