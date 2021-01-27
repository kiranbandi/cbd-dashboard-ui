import React, { Component } from 'react';
import Loading from 'react-loading';
import { requestLogin } from '../utils/requestServer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLoginData } from '../redux/actions/actions';

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = { showPawsLoginLoader: false }
    }

    componentDidMount() {
        const { pawsTicket } = this.props.route;
        // if the base route was launched with a ticket then validate the ticket
        if (pawsTicket) {
            this.setState({ showPawsLoginLoader: true });
            requestLogin(pawsTicket)
                .then((user) => {
                    this.props.actions.setLoginData(user)
                })
                .catch((err) => { console.log(err) })
                .finally(() => {
                    this.setState({ showPawsLoginLoader: false });
                })
        }
    }


    render() {

        const { showPawsLoginLoader } = this.state;

        return (
            <div id='app-container'>
                {showPawsLoginLoader ?
                    <Loading type='spin' className='paws-loader' height='100px' width='100px' color='#d6e5ff' delay={-1} />
                    : <div id='container-body'>
                        {this.props.children}
                    </div>}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ setLoginData }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(Container);