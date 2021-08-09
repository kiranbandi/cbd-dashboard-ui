import React, { Component } from 'react';
import BulletChart from './BulletChart';
import FormWrapper from './FormWrapper';
import { NumberToEPAText } from "../../../utils/convertEPA";
import _ from 'lodash';

export default class GraphRow extends Component {

    constructor(props) {
        super(props);
        this.state = { filterDict: {} };
        this.onHighlightChange = this.onHighlightChange.bind(this);
    }

    onHighlightChange(filterKey, filterValue) {
        if (filterKey === '*') {
            this.setState({ filterDict: filterValue });
        } else {
            this.state.filterDict[filterKey] = filterValue;
            const filterDict = this.state.filterDict;
            this.setState({ filterDict });
        }
    }

    render() {

        let { epaSource, innerKey, widthPartition, smallScreen, epaSourceMap, residentEPAData } = this.props;

        //  margin of 20px on either side reduces the available width by 40 
        // 15px bullet chart padding on either sides
        const bulletInnerWidth = widthPartition - 70;

        // Get the maximum required observations for each EPA from source MAP *
        const maxObservation = +epaSourceMap[epaSource.split(".")[0]].maxObservation[epaSource];
        // Get recorded observation count
        const recordedCount = residentEPAData.length;
        // Get achieved count based on values set by server
        const achievedCount = +epaSourceMap[epaSource.split(".")[0]].achieved[epaSource];

        // Get remaining count 
        const remainingCount = Math.max((maxObservation - achievedCount), 0);

        const isEPAComplete = remainingCount == 0 || +epaSourceMap[epaSource.split(".")[0]].completed[epaSource];

        let firstMeasure = Math.min((recordedCount / maxObservation) * bulletInnerWidth, bulletInnerWidth);
        let secondMeasure = Math.min((achievedCount / maxObservation) * bulletInnerWidth, bulletInnerWidth);

        // remap NaN values to 0
        firstMeasure = isNaN(firstMeasure) ? 0 : firstMeasure;
        secondMeasure = isNaN(secondMeasure) ? 0 : secondMeasure;

        // First group the data by Form IDs so that different forms are shown seperately
        const epaDataGroupedByForm = _.groupBy(residentEPAData, (d) => d.formID);

        // Only show form titles if multiple forms exist for a single EPA 
        const showFormTitle = _.keys(epaDataGroupedByForm).length > 1;

        // Create a list of form titles and if a form title already exists add version number to it so
        // that its distinguished to the user 
        let formTitles = [];
        _.map(epaDataGroupedByForm, (d) => {
            let formTitle = d[0].formTitle;
            if (formTitles.map((d) => d.key).indexOf(formTitle) == -1) {
                formTitles.push({ 'key': formTitle, 'label': 'V1 - ' + formTitle });
            }
            else {
                let existingTitles = _.filter(formTitles, (d) => d.key == formTitle);
                formTitles.push({ 'key': formTitle, 'label': 'V' + (existingTitles.length + 1) + ' - ' + formTitle });
            }
        });

        return (
            <div className='text-xs-center'>
                <div style={{ width: widthPartition }} className='inner-cell epa-title-cell'>
                    <span className='inner-offset-label'>
                        {NumberToEPAText(epaSource) + " - " + epaSourceMap[innerKey].subRoot[epaSource]}
                    </span>
                </div>
                <div style={{ width: widthPartition }} className='inner-cell observation-cell'>
                    <BulletChart
                        widthPartition={widthPartition}
                        bulletInnerWidth={bulletInnerWidth}
                        secondMeasure={secondMeasure}
                        firstMeasure={firstMeasure} />

                    <div className='card-container'>
                        {isEPAComplete && (maxObservation != 0) ?
                            <div className='graph-card first-card'>
                                <span className="fa fa-check-circle completed-check"></span>
                            </div> :
                            <div className='graph-card first-card'>
                                {(maxObservation != 0) && <span className='card-text'>{remainingCount}</span>}
                                {(maxObservation != 0) && <span className='card-title remaining-title'>TO GO</span>}
                            </div>}
                        <div className='graph-card'>
                            <span className='card-text'>{recordedCount}</span>
                            <span className='card-title recorded-title'>OBSERVED</span>
                        </div>
                        <div className='graph-card'>
                            <span className='card-text'>{maxObservation == 0 ? 'N/A' : maxObservation}</span>
                            <span className='card-title required-title'>REQUIRED</span>
                        </div>
                        <div className='graph-card '>
                            <span className='card-text'>{maxObservation == 0 ? 'N/A' : achievedCount}</span>
                            <span className='card-title achieved-title'>ACHIEVED</span>
                        </div>
                    </div>
                </div>
                <div style={{ width: smallScreen ? widthPartition : widthPartition * 2 }} className='inner-cell score-cell'>
                    {_.map(_.keys(epaDataGroupedByForm), (epa_form_id, formNumberIndex) =>
                        <FormWrapper
                            key={epaSource + '-' + epa_form_id}
                            formID={epa_form_id}
                            epaSource={epaSource}
                            formTitle={showFormTitle ? formTitles[formNumberIndex].label : ''}
                            openFilterID={this.props.openFilterID}
                            openTableID={this.props.openTableID}
                            widthPartition={widthPartition}
                            epaSourceMap={epaSourceMap}
                            smallScreen={smallScreen}
                            residentEPAData={epaDataGroupedByForm[epa_form_id]}
                            onMouseOver={this.props.onMouseOver}
                            onMouseOut={this.props.onMouseOut}
                            onInfoClick={this.props.onInfoClick}
                            onTableExpandClick={this.props.onTableExpandClick}
                            onFilterExpandClick={this.props.onFilterExpandClick} />)}
                </div>
            </div>
        );
    }
}