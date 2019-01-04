import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FileUpload, GraphPanel } from '../components';
import getFile from '../utils/getFile';
import processRCMFile from '../utils/processRCMFile';
import downloadCSV from '../utils/downloadCSV';
import { setResidentData } from '../redux/actions/actions';
import toastr from '../utils/toastr';
import Loading from 'react-loading';

// component might be refacored out so not involving Redux at this point 
//  and relying on internal state 
class Tools extends Component {

    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            dataReady: false,
            showGraphPanel: false
        }
        this.onProcessFile = this.onProcessFile.bind(this);
        this.visualizeRecords = this.visualizeRecords.bind(this);
    }

    componentDidMount() {
        // On this tab make residentData null so that it doesnt interfere with data
        // from the other tab
        this.props.actions.setResidentData(null);
    }

    componentWillUnmount() {
        //When moving out of the tab make residentData null so that it doesnt interfere with data
        // from the other tab 
        this.props.actions.setResidentData(null);
    }

    onProcessFile() {
        // turn on file processing loader
        this.setState({ processing: true, dataReady: false });
        // fetch the file from the system and then process it 
        getFile('rcm-file')
            .then((response) => { return processRCMFile(response) })
            .then((data) => {
                // quick hack so the data can be easily pulled in non group format
                window.emCBD = { 'rcmData': data };
                // group data on the basis of EPA
                var groupedResidentData = _.groupBy(data, (d) => d.EPA);
                // store data in json format in redux 
                this.props.actions.setResidentData(groupedResidentData);
                this.setState({ dataReady: true });
            })
            .catch(() => {
                toastr["error"]("Failed to process files , Please try again.", "ERROR");
            })
            // turn off file processing loader
            .finally(() => { this.setState({ processing: false }) });
    }

    downloadFile(event) {
        // process the file and download it as a csv
        event.preventDefault();
        downloadCSV();
    }

    visualizeRecords(event) {
        this.setState({ showGraphPanel: !this.state.showGraphPanel });
    }

    render() {
        const { processing, dataReady, showGraphPanel } = this.state;
        return (
            <div className='tools-root m-t' >
                <div className='container'>
                    <h2 className='text-center text-primary'>Royal College of Medicine Export File Processor</h2>
                    <p className='tools-text m-t m-b'>
                        The files exported from the royal college of medicine website can be quite difficult to analyze.This tool lets you process those files into a more manageble format.
                         You also have an option to visualize the records on the file for a quick overview if you want.The processing is done completely on your machine inside your browser so your data is safe.
                 </p>
                    <FileUpload id='rcm-file' label='File Exported from Royal College Portal' />
                    <button className="btn btn-primary-outline m-t process-btn" onClick={this.onProcessFile}>
                        <span className='process-span'>{"PROCESS FILE"} </span>
                        {processing && <Loading type='spin' height='25px' width='25px' color='#d6e5ff' delay={-1} />}
                    </button>
                </div>

                {dataReady &&
                    <div>
                        <div className='container'>
                            <div className="alert alert-success m-t-md m-b">
                                <strong>File processing complete.</strong>
                                You can use the buttons below to download your files in CSV format or visualize the records for a quick overview.
                            </div>
                            <button className="btn btn-success-outline m-r" onClick={this.downloadFile}>Download</button>
                            <button className="btn btn-success-outline " onClick={this.visualizeRecords}>Visualize Records</button>
                        </div>
                        <div>
                            {showGraphPanel && <GraphPanel />}
                        </div>
                    </div>}
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ setResidentData }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(Tools);