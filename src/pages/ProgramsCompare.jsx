import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gerRecordsByYear } from '../utils/requestServer';
import processProgramRecords from '../utils/processProgramRecords';
import Loading from 'react-loading';
import ReactSelect from 'react-select';
import { ROTATION_SCHEDULE_MAP, PROGRAM_LIST } from '../utils/programInfo';
import {
    ResidentDashboard, ProgramDashboard,
    FacultyDashboard, Modal,
    NormativeDashboard, DownloadDashboard
} from '../components';

const possibleAcademicYears = _.map(_.keys(ROTATION_SCHEDULE_MAP), (d) => (
    {
        'label': d + "-" + (Number(d) + 1), 'value': d
    }
));

class ProgramsCompare extends Component {

    constructor(props) {
        super(props);
        this.state = {
            academicYear: { 'label': '2019-2020', 'value': '2019' },
            loaderState: false,
            recordData: []
        };
        this.onSelectAcademicYear = this.onSelectAcademicYear.bind(this);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        //  turn loader on
        this.setState({ loaderState: true });
        // fetch data for default academic year
        gerRecordsByYear(this.state.academicYear.value, false).then((records) => {
            this.setState({ 'recordData': processProgramRecords(records, PROGRAM_LIST) });
        })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching records"); })
            .finally(() => {
                this._isMounted && this.setState({ loaderState: false });
            });
    }

    onSelectAcademicYear(academicYear) {
        // set the academic year and turn loader on
        this.setState({ academicYear, loaderState: true });
        // fetch data for that specific academic year
        gerRecordsByYear(academicYear.value, false).then((recordData) => {
            this.setState({ 'recordData': processProgramRecords(records, PROGRAM_LIST) });
        })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching records"); })
            .finally(() => {
                this._isMounted && this.setState({ loaderState: false });
            });

    }

    render() {

        const { loaderState, recordData, academicYear } = this.state;

        debugger;

        return (
            <div className='m-a program-compare-root container-fluid' >
                <div className='m-t text-center'>
                    <div className='year-selection-box'>
                        <h2 className='header'>Academic Year </h2>
                        <div className='react-select-root'>
                            <ReactSelect
                                value={academicYear}
                                options={possibleAcademicYears}
                                styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                onChange={this.onSelectAcademicYear} />
                        </div>
                    </div>
                </div>

                {loaderState ?
                    <Loading className='loading-spinner' type='spin' height='100px' width='100px' color='#d6e5ff' delay={- 1} /> :
                    <div className='m-t'>
                        {recordData.length > 0 &&
                            <div>
                                Hello
                            </div>}
                    </div>
                }
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsCompare);



