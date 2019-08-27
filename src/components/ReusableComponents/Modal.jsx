/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleModalVisbility } from '../../redux/actions/actions';

// sample Modal than can be used when needed but is not in use currently

class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(event) {
        event.preventDefault();
        this.props.actions.toggleModalVisbility();
    }


    render() {


        return (
            <div className='cc-modal-root'>
                <div className='modal-main'>
                    <button type="button" className="close" onClick={this.closeModal}>
                        <span>×</span>
                    </button>
                    <h3>And then there were none...</h3>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ toggleModalVisbility }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(Modal);






