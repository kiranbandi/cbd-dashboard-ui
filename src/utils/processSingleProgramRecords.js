import _ from 'lodash';
import moment from 'moment';

export default function(allRecords = [], academicYear, trainingPhase) {

    // remove records that dont have a rotation or a phase tag as  they might be erroneous
    // as also consider only records that lie in that given academic year
    let recordsInYear = _.filter(allRecords, (d) => (!!d.rotationTag && !!d.phaseTag && matchAcademicYear(d.observation_date, academicYear.value))),
        // then consider only records that were attained by residents in that phase
        recordsInYearAndPhase = trainingPhase == 'all' ? recordsInYear : _.filter(recordsInYear, (d) => d.phaseTag == trainingPhase);

    // for some calculations we can ignore the expired records as for them the metrics dont
    // exist so we filter them out from the list
    let nonExpiredRecords = recordsInYearAndPhase.filter(dd => !dd.isExpired),
        // group records by rating and only consider the non expired ones as expired records have no rating
        ratingGroup = _.groupBy(nonExpiredRecords, (d) => d.rating),
        //get residents with available data
        residentsWithData = _.groupBy(recordsInYearAndPhase, (d) => d.username),
        resident_count = Object.keys(residentsWithData).length,
        epa_count = recordsInYearAndPhase.length,
        expired_count = epa_count - nonExpiredRecords.length;

    return {
        recordsInYearAndPhase,
        'summaryData': {
            resident_count,
            epa_count,
            expired_count,
            rating_group: _.map([1, 2, 3, 4, 5], (d) => (ratingGroup[d] ? ratingGroup[d].length : 0)),
            expired_epa_percentage: epa_count == 0 ? 0 : Math.round((expired_count / epa_count) * 100),
            entrustment_score: Math.round((_.meanBy(nonExpiredRecords, (dd) => +dd.rating || 0) || 0) * 100) / 100,
            words_per_comment: Math.round(_.meanBy(nonExpiredRecords, (dd) => dd.feedback.split(" ").length) || 0)
        }
    }

}

function matchAcademicYear(recordDate, academicYear) {
    var timeObj = moment(recordDate, 'YYYY-MM-DD');
    return (timeObj.isBetween(moment('07/01/' + Number(academicYear), 'MM/DD/YYYY'), moment('06/30/' + (Number(academicYear) + 1), 'MM/DD/YYYY'), 'days', '[]'))
}

// The following blocks involves some serious calculations !!!
function calculateRotationCount(residentList, academicYear, residentsWithData) {

    let rotationCount = {};
    // we filter out residents who were active in that current year and only get their rotations ,
    // so if we are looking at the year 2018-2019 then the academic year is 2018
    // so we only take residents who started before July 2019 
    var activeResidentList = _.filter(residentList, (d) => {
        return (moment(d.programStartDate).isBefore(moment('07/01/' + (Number(academicYear) + 1), 'MM/DD/YYYY')))
    });

    // some residents might be active but might not have any data,
    // so here we take remove them from the active resident list as it is obvious they arent active
    // this is an opinionated choice but can be changed later on
    var activeResidentListWithData = _.filter(activeResidentList, (d) => residentsWithData.hasOwnProperty(d.username));

    // Finally if the academic year is still on going we only take the rotations that have been completed,
    // if not we count all rotations in that year,
    // for this we check the rotation schedule and compare with todays date.

    // if today is in the selected academic year period
    if (moment().isBetween(moment('07/01/' + Number(academicYear), 'MM/DD/YYYY'), moment('06/30/' + (Number(academicYear) + 1), 'MM/DD/YYYY'), 'days', '[]')) {
        // remove rotations that will start after todays and get count of those before
        const rotationStopCount = _.filter(ROTATION_SCHEDULE_MAP[academicYear],
            (rotationDate) => moment().isAfter(moment(rotationDate, 'DD-MMM-YYYY'))).length;

        // if not count each rotation for the whole year
        _.map(activeResidentListWithData, (resident) => {
            // if a resident has a list then only get the rotations that have been done
            const rotationList = resident.rotationSchedule[academicYear] ?
                resident.rotationSchedule[academicYear].slice(0, rotationStopCount) : [];
            _.map(rotationList, (rotation, rindex) => {
                if (rotationCount.hasOwnProperty(rotation)) { rotationCount[rotation] += 1; } else { rotationCount[rotation] = 1; }
            });
        })
    } else {
        // if not count each rotation for the whole year
        _.map(activeResidentListWithData, (resident) => {
            _.map(resident.rotationSchedule[academicYear], (rotation) => {
                if (rotationCount.hasOwnProperty(rotation)) { rotationCount[rotation] += 1; } else { rotationCount[rotation] = 1; }
            });
        })
    }
    return rotationCount;
}