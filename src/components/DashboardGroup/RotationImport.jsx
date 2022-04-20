import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactSelect from 'react-select';
import FileUpload from './FileUpload';
import getFile from '../../utils/getFile';
import processOne45File from '../../utils/processOne45File';
import { setRotationSchedules } from '../../utils/requestServer';
import _ from 'lodash';
const possibleAcademicYears = [{ 'label': 'July 2017 - June 2018', 'value': '2017' },
{ 'label': 'July 2018 - June 2019', 'value': '2018' },
{ 'label': 'July 2019 - June 2020', 'value': '2019' },
{ 'label': 'July 2020 - June 2021', 'value': '2020' },
{ 'label': 'July 2021 - June 2022', 'value': '2021' },
{ 'label': 'July 2022 - June 2023', 'value': '2022' },
{ 'label': 'July 2023 - June 2024', 'value': '2023' }];

class ResidentDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'academicYear': 0,
            'loading': false,
            'success': false
        };
        this.onRotationUpload = this.onRotationUpload.bind(this);
    }

    async onRotationUpload() {

        const { academicYear } = this.state,
            academic_year = possibleAcademicYears[academicYear];

        // setup button debouncing
        if (!this.state.loading) {
            // turn on loader and remove success message if shown already
            this.setState({ loading: true, success: false });
            try {
                // Get the uploaded file
                const fileContents = await getFile('one45-file');
                // Process the data
                const { rotationData } = await processOne45File(fileContents, academic_year.value);

                if (rotationData.length > 0) {
                    await setRotationSchedules(rotationData);
                    this.setState({ success: true });
                }

            } catch (error) {
                alert('sorry there wasn an error in updating the rotation data.');
            }
            this.setState({ loading: false });
        }
    }

    onSelectAcademicYear = (academicYear) => { this.setState({ 'academicYear': _.findIndex(possibleAcademicYears, d => d.value == academicYear.value), "success": false }) };

    render() {

        const { academicYear, loading, success } = this.state;

        return (
            <div className='dashboard-root-resident rotation-upload-wrapper m-t' >
                <div className='m-a-md'>
                    <div className="alert alert-info">
                        <p>This page controls the rotation schedule data being shown in all the visual summary dashboards. Use it to upload the one45 export file for a particular academic year.
                            <br /> Make sure to select the correct academic year corresponding to the data in the one45 file and also ensure that that the export is for the entire period between July 1 to Jun 30 for a given academic year.</p>
                    </div>
                    <div className='year-selection-box'>
                        <h4 className='header'>Academic Year </h4>
                        <div className='react-select-root'>
                            <ReactSelect
                                value={possibleAcademicYears[academicYear]}
                                options={possibleAcademicYears}
                                styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                                onChange={this.onSelectAcademicYear} />
                        </div>
                        <FileUpload id='one45-file' label='one45 File' />
                    </div>
                    <div className='m-t-md button-box'>
                        <button type="submit" className="filter-button btn btn-primary-outline" onClick={this.onRotationUpload}>
                            UPLOAD
                            {loading && <i className='fa fa-spinner fa-spin filter-loader'></i>}
                        </button>
                    </div>
                    {success && <h4 className='m-t-md text-success'>The rotation schedule was uploaded successfully.</h4>}
                </div>

            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        residentList: state.oracle.residentList,
        residentData: state.oracle.residentData,
        residentFilter: state.oracle.residentFilter
    };
}

export default connect(mapStateToProps, {})(ResidentDashboard);



