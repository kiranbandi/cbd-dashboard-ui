import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScheduleBlock from './ScheduleBlock';
import { ROTATION_SCHEDULE_MAP, CARDS_LIST } from '../../../utils/programInfo';
import { setInfoCard } from '../../../redux/actions/actions';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


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
        // preventing crossing and ensure atleast one step is present
        if ((sliderValue[1] > sliderValue[0]) && (sliderValue[1] - sliderValue[0] >= 1)) {
            this.setState({ sliderValue });
        }
        // zero step is only allowed if both are being set to zero
        else if (sliderValue[1] == 0 && sliderValue[0] == 0) {
            this.setState({ sliderValue });
        }
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
                infoCardsVisible } = this.props,
            { isHistoryVisible, isEPAperBlockVisible, sliderValue } = this.state,
            { rotationSchedule = {}, longitudinalSchedule = {}, programStartDate } = residentInfo;

        // if the current month is before july then pick the last year  
        const currentAcademicYear = moment().month() <= 5 ? moment().year() - 1 : moment().year();
        const currentScheduleDates = ROTATION_SCHEDULE_MAP[currentAcademicYear];
        const currentSchedule = rotationSchedule[currentAcademicYear];
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
            currentScheduleDates[sliderValue[0]] + ' - ' + currentScheduleDates[sliderValue[1]] : '(Drag slider points to set range)';

        return (
            <div className='schedule-box text-center hidden-xs'>
                <div className="hr-divider">
                    <h4 className="hr-divider-content"> ROTATION SCHEDULE </h4>
                </div>
                <button onClick={this.showHistorySchedule} className={'view-back-button btn btn-primary-outline' + (isHistoryVisible ? ' selected' : '')}>
                    <span className="icon icon-clock"></span>
                    <span>View History</span>
                </button>
                <button onClick={this.showEPAsPerBlock} className={'view-back-button per-block-button btn btn-primary-outline' + (isEPAperBlockVisible ? ' selected' : '')}>
                    <span className="icon icon-book"></span>
                    <span>View EPAs/Block</span>
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
                    <h2>{sliderDatesLabel}</h2>
                    <Range dots min={0} max={currentSchedule.length} step={1} value={sliderValue} allowCross={false} onChange={this.onRangeChange} />
                </div>


            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ setInfoCard }, dispatch)
    };
}


export default connect(null, mapDispatchToProps)(RotatioSchedule);




