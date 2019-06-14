export default function() {



    let radarData, LineData;

    const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // find out records that have rotation and phase tag on them
    const taggedRecords = _.filter(allRecords, (d) => (!!d.rotationTag && !!d.phaseTag));

    const phaseGroupedTaggedRecords = _.groupBy(taggedRecords, (d) => d.phaseTag);

    const possibleRotations = ["EM", "EM(REGINA)", "EM(PED)", "EM(RGNL)", "ANESTHESIA", "CARDIO", "ICU", "GIM", "GEN SURG", "NEURO", "OPTHO", "ORTHO", "PLASTICS", "SELECTIVE", "TOXICOLOGY", "TRAUMA", "OTHER"];


    let selectedRotationSplit;

    if (selected == 1) {
        selectedRotationSplit = phaseGroupedTaggedRecords['TTD'] || []
    } else if (selected == 2) {
        selectedRotationSplit = phaseGroupedTaggedRecords['F'] || []
    } else if (selected == 3) {
        selectedRotationSplit = phaseGroupedTaggedRecords['CORE'] || []
    } else {
        selectedRotationSplit = phaseGroupedTaggedRecords['TP'] || []
    }


    selectedRotationSplit = _.groupBy(selectedRotationSplit, (d) => d.rotationTag);


    var newLineData;

    if (taggedRecords.length > 0) {

        newLineData = {
            labels: possibleRotations,
            datasets: [{
                label: "My First dataset",
                fillColor: "rgba(28,168,221,.03)",
                strokeColor: "#43b98e",
                pointColor: "#43b98e",
                pointStrokeColor: 'rgba(28,168,221,.03)',
                pointHighlightFill: "rgba(28,168,221,.03)",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: _.map(possibleRotations, (d) => (selectedRotationSplit[d] ? selectedRotationSplit[d].length : 0))
            }]
        }
    }




    if (allRecords.length > 0) {
        radarData = {
            labels: subKeyList,
            datasets: [{
                label: "My First dataset",
                fillColor: "rgba(28,168,221,.03)",
                strokeColor: "#43b98e",
                pointColor: "#43b98e",
                pointStrokeColor: 'rgba(28,168,221,.03)',
                pointHighlightFill: "rgba(28,168,221,.03)",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: _.map(subKeyList, (d) => groupedRecordCount[d] || 0)
            }]
        };

        LineData = {
            labels: moment.monthsShort(),
            datasets: [{
                label: "My First dataset",
                fillColor: "rgba(28,168,221,.03)",
                strokeColor: "#43b98e",
                pointColor: "#43b98e",
                pointStrokeColor: 'rgba(28,168,221,.03)',
                pointHighlightFill: "rgba(28,168,221,.03)",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: _.map(monthList, (d) => monthCount[selected][d])
            }]
        }
    }



    var radarOptions = {
        angleLineColor: 'grey',
        angleLineWidth: 0.5,
        pointLabelFontColor: 'white',
        pointLabelFontSize: 15,
    };


}