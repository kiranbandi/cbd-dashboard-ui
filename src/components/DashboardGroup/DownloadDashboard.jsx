import React, { Component } from 'react';
import { getAllData } from '../../utils/requestServer';
import downloadCSV from '../../utils/downloadCSV';
import Loading from 'react-loading';

export default class ExportDataTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaderVisible: false
        };
        this._isMounted = false;
        this.downloadFile = this.downloadFile.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    downloadFile(event) {
        event.preventDefault();
        // toggle loader before fetching data
        this.setState({ isLoaderVisible: true });
        // get list of all residents
        getAllData()
            .then((data) => {
                window.emCBD = {
                    'rcmData': _.map(data, (_r) => {
                        return [_r.observation_date, _r.resident_name, _r.epa, _r.observer_name, _r.observer_type, _r.rating, _r.type, _r.situation_context, _r.feedback, _r.professionalism_safety, _r.isExpired || false];
                    })
                };
                downloadCSV();
            })
            // toggle loader again once the request completes
            .catch(() => { console.log("error in fetching all records"); })
            .finally(() => {
                this._isMounted && this.setState({ isLoaderVisible: false });
            });
    }

    render() {
        return (
            <div className='m-a export-data-container'>
                <p className='info-text'>This page is meant purely for research purposes and can let you download the entire record collection of all residents in the program in an easily accessible CSV file.</p>
                <p className='text-warning info-text'> <span className="icon icon-info-with-circle"></span> Because of the secure nature of data involved and the fact that this is a bulk export please make sure that this file is stored and handled responsibily.</p>
                <button className="btn btn-success m-t-0 m-a bulk-export" type="submit" onClick={this.downloadFile}>
                    <span className='download-span'>{"Download CSV"} </span>
                    {this.state.isLoaderVisible && <Loading type='spin' height='30px' width='30px' color='#d6e5ff' delay={-1} />}
                </button>
            </div >
        );
    }
}
