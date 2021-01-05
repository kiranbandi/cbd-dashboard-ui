import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScheduleBlock from './ScheduleBlock';
import { ROTATION_SCHEDULE_MAP, CARDS_LIST } from '../../../utils/programInfo';
import { setInfoCard, updateResidentData, setResidentFilter } from '../../../redux/actions/actions';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { InfoTip } from '../../';
import infoTooltipReference from '../../../utils/infoTooltipReference';


class RotatioSchedule extends Component {

    constructor(props) {
        super(props);
        this.showHistorySchedule = this.showHistorySchedule.bind(this);
        this.showEPAsPerBlock = this.showEPAsPerBlock.bind(this);
        this.onRotationBlockClick = this.onRotationBlockClick.bind(this);
        this.onRangeChange = this.onRangeChange.bind(this);

        this.state = {
            isHistoryVisible: false,
            isEPAperBlockVisible: false,
            sliderValue: [0, 0]
        };
    }

    onRangeChange(sliderValue) {

        let { residentData, actions, residentFilter } = this.props,
            currentAcademicYear = moment().month() <= 5 ? moment().year() - 1 : moment().year(),
            currentScheduleDates = ROTATION_SCHEDULE_MAP[currentAcademicYear];

        // preventing crossing and ensure atleast one step is present,
        // this checking can be skipped when range is reset to zero
        if ((sliderValue[1] == 0 && sliderValue[0] == 0) || ((sliderValue[1] > sliderValue[0]) && (sliderValue[1] - sliderValue[0] >= 1))) {

            this.setState({ sliderValue });

            let startDate = currentScheduleDates[sliderValue[0]],
                endDate = currentScheduleDates[sliderValue[1]],
                // if dates are same dont mark the records
                dontMark = startDate == endDate;

            // loop through the data and modify it on the fly
            _.map(residentData, (groupedData, groupKey) => {
                _.map(groupedData, (d, innerKey) => {
                    residentData[groupKey][innerKey].mark = dontMark ? false :
                        moment(d.Date, 'YYYY-MM-DD').isBetween(moment(startDate, 'DD-MMM-YYYY'), moment(endDate, 'DD-MMM-YYYY'), 'days', '[]');
                })
            });
            // do a shallow update on the data and the resident date filter in redux
            actions.updateResidentData(residentData);
            residentFilter = {
                ...residentFilter,
                'startDate': moment(startDate, 'DD-MMM-YYYY').format('MM/DD/YYYY'),
                'endDate': moment(endDate, 'DD-MMM-YYYY').format('MM/DD/YYYY'), 'isAllData': dontMark
            };

            // set the datefilter values , they are weirdly managed by jquery so this is quick fix
            // at some point in future the date filter should be replaced by a 
            //  pure react comp so this wouldnt be necessary
            $('#filter-startDate-resident').val(residentFilter.startDate);
            $('#filter-endDate-resident').val(residentFilter.endDate);

            actions.setResidentFilter(residentFilter);
        };
    }

    showHistorySchedule() {
        this.setState({ isHistoryVisible: !this.state.isHistoryVisible });
    }

    showEPAsPerBlock() {
        this.setState({ isEPAperBlockVisible: !this.state.isEPAperBlockVisible });
    }

    onRotationBlockClick(event) {

        const { residentInfo, actions } = this.props,
            // split and replace back slashes "/" in the names
            rotation = event.target.id.split("-")[1].split('/').join('-'),
            rotationName = CARDS_LIST.indexOf(rotation) > -1 ? rotation : 'EM';

        let imageName = rotationName, currentPhase = residentInfo.currentPhase || '';
        if (imageName == 'EM') {
            if (currentPhase == 'transition-to-discipline') {
                imageName = ['EM-TTD']
            }
            else if (currentPhase == 'foundations-of-discipline') {
                imageName = ['EM-F']
            }
            else if (currentPhase == 'core-of-discipline') {
                imageName = ['EM-C-1', 'EM-C-2', 'EM-C-3']
            }
            else {
                imageName = ['EM-TP-1', 'EM-TP-2']
            }
        }
        // trigger the modal and set the image list
        actions.setInfoCard(imageName);
    }


    render() {


        const dateBoxes = ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
            //200px to offset the 30px margin on both sides and vertical scroll bar width
            widthAvailable = document.body.getBoundingClientRect().width - 200,
            widthForEachMonth = widthAvailable / 12,
            { residentInfo, residentData, rotationRequired,
                infoCardsVisible, enableFilter } = this.props,
            { isHistoryVisible, isEPAperBlockVisible, sliderValue } = this.state,
            { rotationSchedule = {}, longitudinalSchedule = {}, programStartDate } = residentInfo;

        // if the current month is before july then pick the last year  
        const currentAcademicYear = moment().month() <= 5 ? moment().year() - 1 : moment().year();
        const currentScheduleDates = ROTATION_SCHEDULE_MAP[currentAcademicYear];
        const currentSchedule = rotationSchedule[currentAcademicYear] || [];
        const currentLongSchedule = longitudinalSchedule[currentAcademicYear];

        let historicalYears = _.filter(_.keys(rotationSchedule), (year) => {
            // if the resident started before july of a year say 2017 then we add the schedule of the year 
            // before too if not we just get that year alone 
            return year < currentAcademicYear && year >= (moment(programStartDate).year() - (moment(programStartDate).month() <= 5 ? 1 : 0))
        });
        // if there are more than 5 historical years then cut it to the recent 5
        if (historicalYears.length > 5) {
            historicalYears = historicalYears.slice(historicalYears.length - 5);
        }

        const sliderDatesLabel = sliderValue[1] - sliderValue[0] >= 1 ?
            currentScheduleDates[sliderValue[0]] + ' to ' + currentScheduleDates[sliderValue[1]] : '(Drag slider or click points to set range)';

        return (
            <div className='schedule-box text-center hidden-xs'>
                <div className="hr-divider">
                    <h4 className="hr-divider-content"> ROTATION SCHEDULE </h4>
                </div>
                <button
                    onClick={this.showHistorySchedule}
                    className={'view-back-button btn btn-primary-outline' + (isHistoryVisible ? ' selected' : '')}
                >
                    <span className="icon icon-clock"></span>
                    <span>View History</span>
                    <s-tooltip border-width="1px" show-delay="2000" orientation="right" style={{ fontFamily: 'inherit' }}>{infoTooltipReference.residentMetrics.viewHistory}</s-tooltip>
                </button>
                <button
                    onClick={this.showEPAsPerBlock}
                    className={'view-back-button per-block-button btn btn-primary-outline' + (isEPAperBlockVisible ? ' selected' : '')}
                >
                    <span className="icon icon-book"></span>
                    <span>View EPAs/Block</span>
                    <s-tooltip border-width="1px" show-delay="2000" orientation="right" style={{ fontFamily: 'inherit' }}>{infoTooltipReference.residentMetrics.viewEPAsBlock}</s-tooltip>
                </button>

                {isHistoryVisible && <div className='all-historical-schedule'>
                    {historicalYears.length > 0 ?
                        _.map(historicalYears, (year) => {
                            return <ScheduleBlock
                                key={'yearblock-' + year}
                                residentData={residentData}
                                isEPAperBlockVisible={isEPAperBlockVisible}
                                rotationRequired={rotationRequired}
                                academicYear={year}
                                scheduleDateList={ROTATION_SCHEDULE_MAP[year]}
                                scheduleRotationList={rotationSchedule[year]}
                                LongSchedule={''}
                                widthAvailable={widthAvailable}
                                isHistorical={true} />
                        }) :
                        <h3 className='no-history-label'>No Historical Data available</h3>}
                </div>}
                <div style={{ width: widthAvailable }} className='custom-gannt-style-chart'>
                    {dateBoxes.map((year, index) => {
                        return <span style={{ width: widthForEachMonth }} key={index} className='yearBox'>{year}</span>
                    })}
                </div>
                <ScheduleBlock
                    onRotationBlockClick={this.onRotationBlockClick}
                    infoCardsVisible={infoCardsVisible}
                    isEPAperBlockVisible={isEPAperBlockVisible}
                    residentData={residentData}
                    rotationRequired={rotationRequired}
                    academicYear={currentAcademicYear}
                    scheduleDateList={currentScheduleDates}
                    scheduleRotationList={currentSchedule}
                    LongSchedule={currentLongSchedule}
                    widthAvailable={widthAvailable} />

                <div style={{ 'width': widthAvailable + 'px' }}
                    className='slider-container-resident'>
                    <label className='filter-label'>Filter EPAs by Rotation Schedule </label>
                    <InfoTip info={infoTooltipReference.residentMetrics.calendarSlider} />
                    <h2>{sliderDatesLabel}</h2>
                    <Range dots min={0} max={currentSchedule.length} step={1} defaultValue={[0, 0]} allowCross={false} onAfterChange={this.onRangeChange} />
                </div>

            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setInfoCard,
            updateResidentData,
            setResidentFilter
        }, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        residentFilter: state.oracle.residentFilter
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(RotatioSchedule);




