import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

class InfoPanel extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        let { residentData, residentFilter, residentList } = this.props;

        let residentInfo = false, scheduleMap;

        if (residentFilter && residentFilter.username) {
            residentInfo = _.find(residentList, (resident) => resident.username == residentFilter.username);
            scheduleMap = residentInfo.rotationSchedule.split(",");
        }

        let dateBoxes = ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN"]

        //125px to offset the 30px margin on both sides and vertical scroll bar width
        let widthAvailable = document.body.getBoundingClientRect().width - 200;

        let widthForEachMonth = widthAvailable / 12;

        let currentSchedule = ["01-Jul-2018", "30-Jul-2018", "27-Aug-2018", "24-Sep-2018", "22-Oct-2018", "19-Nov-2018", "17-Dec-2018", "14-Jan-2019", "11-Feb-2019", "11-Mar-2019", "08-Apr-2019", "06-May-2019", "03-Jun-2019", "30-Jun-2019"];

        let startDate = moment("01-07-2018", "DD-MM-YYYY");


        if (residentData) {

            let tempData = _.flatMap(residentData);
            let highPerformanceEPA = tempData.filter((record) => (+record.Rating) >= 4);
            let weeksPassed = (moment().diff(startDate, "weeks"));

            // Get EPAS since last 3 months 
            let dateSinceMeasure = moment(residentInfo.uploadedData).subtract(3, 'month');

            let totalEPA = tempData.length;
            let totalAchievedEPA = highPerformanceEPA.length;

            let EPAPerWeek = tempData.length / weeksPassed;

            let recordsSinceLast3Months = tempData.filter((record) => {
                return moment(record.Date, 'YYYY-MM-DD').isAfter(dateSinceMeasure);
            }).length;

            let EPA3month = recordsSinceLast3Months / (moment().diff(dateSinceMeasure, "weeks"));

        }

        return (
            <div className='info-panel'>
                {residentInfo &&
                    <div className='info-panel-inner'>
                        <div className='titular-block'>
                            <span><b>CURRENT PHASE -</b> {residentInfo.currentPhase.split("-").join(" ")}</span>
                            <span><b>PROGRAM START DATE -</b> {(new Date(residentInfo.programStartDate)).toDateString()}</span>
                            <span><b>RECORDS AVAILABLE TILL -</b> {(new Date(residentInfo.uploadedData)).toDateString()}</span>
                        </div>

                        {!!residentData &&
                            <div className='epaSpeedBox'>

                                

                            </div>
                        }

                        <div className='schedule-box text-center'>
                            <div className="hr-divider">
                                <h4 className="hr-divider-content">
                                    ROTATION SCHEDULE
                            </h4>
                            </div>
                            <div style={{ width: widthAvailable }} className='custom-gannt-style-chart'>
                                {dateBoxes.map((year, index) => {
                                    return <span style={{ width: widthForEachMonth }} key={index} className='yearBox'>{year}</span>
                                })}
                                {currentSchedule.map((current, index) => {

                                    let currentDate = moment(current, "DD-MMM-YYYY");
                                    let endingDate = moment(currentSchedule[index + 1], "DD-MMM-YYYY");

                                    let distanceFromStart = currentDate.diff(startDate, "days");

                                    let distanceInBetween = endingDate.diff(currentDate, "days");

                                    let widthFromleft = (widthForEachMonth * distanceFromStart) / 30;

                                    let internalWidth = (widthForEachMonth * distanceInBetween) / 30;

                                    if (!isNaN(internalWidth)) {
                                        return [<span className='chart-line' key={"index-" + index} style={{ marginLeft: widthFromleft, width: internalWidth }}>{scheduleMap[index]}</span>, <span key={"index-line-" + index} className='hr-divider lined-border'></span>]
                                    }
                                    return;
                                })}
                            </div>
                        </div>

                    </div>

                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        residentData: state.oracle.residentData,
        residentFilter: state.oracle.residentFilter,
        residentList: state.oracle.residentList
    };
}

export default connect(mapStateToProps, null)(InfoPanel);
