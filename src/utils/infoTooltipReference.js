// var reference = {
//     'pc_acquired_expired': 'This chart shows the total number of EPAs that have been acquired (completed and not expired) by residents in each program and the total number of EPAs that have expired. It also show the average number of EPAs that are acquired and expired per resident in each program.'
// }

// module.exports = reference;

export default {
    facultyDevlopment: {},
    residentMetrics: {},
    normativeAssessment: {},
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
    comparePrograms: {}
}