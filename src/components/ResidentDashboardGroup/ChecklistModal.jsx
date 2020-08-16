/*global $*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleChecklistVisbility } from '../../redux/actions/actions';

class ChecklistModal extends Component {

    constructor(props) {
        super(props);
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
                    <h3 className='text-center'>Infographic Cards</h3>
                    <div className='info-panel-inner text-center'>
                        <div className='image-container'>
                          
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ toggleChecklistVisbility }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(ChecklistModal);






