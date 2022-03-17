import React, { Component } from 'react';

export default class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileName: 'No file selected...'
        };
        this.onFileChange = this.onFileChange.bind(this);
    }

    onFileChange(event) {
        this.setState({
            fileName: event.target.files[0].name || 'No file selected...'
        });
    }

    render() {

        const { id = 'file', label = 'Upload file' } = this.props;
        return (
            <div className='upload-file-container'>
                <h4>{label}</h4>
                <p className='upload-text'>{this.state.fileName}</p>
                <input type="file" name="file" id={id} className="inputfile" onChange={this.onFileChange} />
                <label htmlFor={id} className="btn btn-primary-outline">
                    Select File <i className="fa fa-upload" aria-hidden="true"></i>
                </label>
            </div>
        );
    }
}