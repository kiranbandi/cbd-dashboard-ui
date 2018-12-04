import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginSuccess, toggleLoader } from '../redux/actions/actions';
import Loading from 'react-loading';
import { requestLogin } from '../utils/requestServer';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                username: '',
                password: ''
            }
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        return this.setState({ credentials });
    }

    onSubmit(e) {
        const { loaderState = false } = this.props;
        const { credentials } = this.state;
        e.preventDefault();
        if (!loaderState) {
            this.props.actions.toggleLoader();
            requestLogin(credentials).then((username) => {
                this.props.actions.loginSuccess();
            }).finally(() => {
                this.props.actions.toggleLoader();
            });
        }
    }

    render() {

        const { loaderState = false } = this.props;
        return (
            <div className='login-container container col-lg-4 col-lg-offset-4 col-xs-10 col-xs-offset-1'>

                <span className="icon icon-user login-icon" role="login indicator"></span>

                <div className="hr-divider">
                    <h4 className="hr-divider-content hr-divider-heading">USER LOGIN</h4>
                </div>

                <div className="admin-box">
                    <div className="input-group m-a">
                        <span className="input-group-addon icon icon-users"></span>
                        <input type="text" className="form-control" name="username" placeholder="USERID" onChange={this.onChange} />
                    </div>
                    <div className="input-group m-a">
                        <span className="input-group-addon icon icon-lock"></span>
                        <input type="password" className="form-control" name="password" placeholder="PASSWORD" onChange={this.onChange} />
                    </div>
                    <button className="btn btn-success admin-btn" type="button" onClick={this.onSubmit}>
                        <span className='login-span'>{"LOGIN"} </span>
                        {loaderState && <Loading type='spin' height='30px' width='30px' color='#d6e5ff' delay={-1} />}
                    </button>

                </div>

            </div>
        )
    }
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ loginSuccess, toggleLoader }, dispatch)
    };
}

function mapStateToProps(state, ownProps) {
    return { loaderState: state.oracle.loaderState };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);