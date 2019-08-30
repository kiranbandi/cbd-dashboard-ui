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

        const { infoCard } = this.props;

        const panelWidth = Array.isArray(infoCard) ? infoCard.length > 1 ? '27.5%' : '275px' : '275px';

        return (
            <div className='cc-modal-root'>
                <div className='modal-main'>
                    <button type="button" className="close" onClick={this.closeModal}>
                        <span>×</span>
                    </button>
                    <h3 className='text-center'>Infographic Cards</h3>
                    <div className='info-panel-inner text-center'>
                        <div className='image-container'>
                            {/* loop only for EM because it has more than 1 card */}
                            {Array.isArray(infoCard) ? <div>{_.map(infoCard, (image) =>
                                <img style={{ width: panelWidth }} key={image} className='info-card' src={"assets/img/cards/" + image + ".png"} />
                            )}</div> :
                                <img style={{ width: panelWidth }} className='info-card' src={"assets/img/cards/" + infoCard + ".png"} />
                            }
                        </div>
                    </div>

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






