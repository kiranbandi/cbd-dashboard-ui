import React, { Component } from 'react';
import { getAllData } from '../../utils/requestServer';
import Loading from 'react-loading';
import { Radar, Line } from 'react-chartjs';
import templateEpaSourceMap from '../../utils/epaSourceMap';
import moment from 'moment';

const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default class ProgramDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false,
            allRecords: [],
            groupedRecords: {},
            groupedRecordCount: {},
            selected: 1,
            monthCount: {}
        };
        this._isMounted = false;

        this.selectionChange = this.selectionChange.bind(this);
    }

    selectionChange(event) {
        event.preventDefault();
        const selected = event.target.className.split(" ")[1].split("-")[2];
        this.setState({ selected });
    }

    componentDidMount() {
        this._isMounted = true;
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });
        // get list of all residents
        getAllData()
            .then((data) => {
                let allRecords = _.filter(data, (d) => !d.isExpired),
                    groupedRecords = _.groupBy(allRecords, (d) => d.epa),
                    groupedRecordCount = {},
                    internalMonthCount = {
                        "Jan": 0, "Feb": 0, "Mar": 0,
                        "Apr": 0, "May": 0, "Jun": 0, "Jul": 0,
                        "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0
                    },
                    monthCount = {
                        1: _.clone(internalMonthCount), 2: _.clone(internalMonthCount),
                        3: _.clone(internalMonthCount), 4: _.clone(internalMonthCount)
                    };

                _.map(allRecords, (d) => {
                    let monthKey = moment(d.observation_date, 'YYYY-MM-DD').format('MMM'),
                        internalCount = +d.epa.split(".")[0];
                    monthCount[internalCount][monthKey] += 1;
                });

                // get a count of each EPA
                _.map(groupedRecords, (d, key) => {
                    groupedRecordCount[key] = d.length;
                });

                this._isMounted && this.setState({ allRecords, groupedRecords, groupedRecordCount, monthCount })
            })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching records"); })
            .finally(() => {
                this._isMounted && this.setState({ isLoaderVisible: false });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {

        const { allRecords, groupedRecordCount, selected, monthCount } = this.state,
            subKeyList = Object.keys(templateEpaSourceMap[selected].subRoot);

        let radarData, LineData;


        // find out records that have rotation and phase tag on them
        const taggedRecords = _.filter(allRecords, (d) => (!!d.rotationTag && !!d.phaseTag));

        const phaseGroupedTaggedRecords = _.groupBy(taggedRecords, (d) => d.phaseTag);

        const possibleRotations = ["EM", "EM(REGINA)", "EM(PED)", "EM(RGNL)", "ANESTHESIA", "CARDIO", "ICU", "GIM", "GEN SURG", "NEURO", "OPTHO", "ORTHO", "PLASTICS", "SELECTIVE", "TOXICOLOGY", "TRAUMA", "OTHER"];


        let selectedRotationSplit;

        if (selected == 1) {
            selectedRotationSplit = phaseGroupedTaggedRecords['TTD'] || []
        }
        else if (selected == 2) {
            selectedRotationSplit = phaseGroupedTaggedRecords['F'] || []
        }
        else if (selected == 3) {
            selectedRotationSplit = phaseGroupedTaggedRecords['CORE'] || []
        }
        else {
            selectedRotationSplit = phaseGroupedTaggedRecords['TP'] || []
        }


        selectedRotationSplit = _.groupBy(selectedRotationSplit, (d) => d.rotationTag);


        var newLineData;

        if (taggedRecords.length > 0) {

            newLineData = {
                labels: possibleRotations,
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(28,168,221,.03)",
                        strokeColor: "#43b98e",
                        pointColor: "#43b98e",
                        pointStrokeColor: 'rgba(28,168,221,.03)',
                        pointHighlightFill: "rgba(28,168,221,.03)",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: _.map(possibleRotations, (d) => (selectedRotationSplit[d] ? selectedRotationSplit[d].length : 0))
                    }
                ]
            }
        }




        if (allRecords.length > 0) {
            radarData = {
                labels: subKeyList,
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(28,168,221,.03)",
                        strokeColor: "#43b98e",
                        pointColor: "#43b98e",
                        pointStrokeColor: 'rgba(28,168,221,.03)',
                        pointHighlightFill: "rgba(28,168,221,.03)",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: _.map(subKeyList, (d) => groupedRecordCount[d] || 0)
                    }
                ]
            };

            LineData = {
                labels: moment.monthsShort(),
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(28,168,221,.03)",
                        strokeColor: "#43b98e",
                        pointColor: "#43b98e",
                        pointStrokeColor: 'rgba(28,168,221,.03)',
                        pointHighlightFill: "rgba(28,168,221,.03)",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: _.map(monthList, (d) => monthCount[selected][d])
                    }
                ]
            }
        }

        var width = document.body.getBoundingClientRect().width - 250;

        width = width < 800 ? width : width / 2;

        var radarOptions = {
            angleLineColor: 'grey',
            angleLineWidth: 0.5,
            pointLabelFontColor: 'white',
            pointLabelFontSize: 15,
        };

        return (
            <div className='m-a dashboard-root-program' >
                {this.state.isLoaderVisible ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div className='m-t text-center'>
                        {allRecords.length > 0 ?
                            <div className='row'>
                                {/* <div className='col-sm-6 xol-xs-12'>
                                    <div className='m-a epa-select-container row'>
                                        <h3 className='text-left'> EPA Split Distribution</h3>
                                        <div className='right-pane col-xs-12'>
                                            <Radar options={radarOptions} data={_.clone(radarData)} width={width} height={400} redraw={true} />
                                        </div>
                                    </div>
                                </div> */}
                                {taggedRecords.length > 0 &&
                                    <div className='col-sm-6 col-xs-12'>
                                        <div className='m-a epa-select-container row'>
                                            <h3 className='text-left'> EPA Rotation Distribution</h3>
                                            <div className='right-pane col-xs-12'>
                                                <Line data={newLineData} width={width} height={400} redraw={true} />
                                            </div>
                                        </div>
                                    </div>}
                                <div className='col-sm-6 col-xs-12'>
                                    <div className='m-a epa-select-container row'>
                                        <h3 className='text-left'> EPA Monthly Distribution</h3>
                                        <div className='right-pane col-xs-12'>
                                            <Line data={LineData} width={width} height={400} redraw={true} />
                                        </div>
                                    </div>
                                </div>
                                <div className='selection-box-container'>
                                    {_.map(templateEpaSourceMap, (inner, i) => {
                                        return <div
                                            className={'selection-box box-id-' + (+i) + " " + (selected == (i) ? 'selected-button' : '')}
                                            key={'select-' + i}
                                            onClick={this.selectionChange}>
                                            {inner.topic}
                                        </div>
                                    })}
                                </div>

                            </div> :
                            <h2 className='text-center text-danger'>No program information is available currently</h2>}
                    </div>}
            </div >
        );
    }
}
