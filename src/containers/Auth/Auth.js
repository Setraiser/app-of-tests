import React, {Component} from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import {connect} from 'react-redux';
import is from 'is_js';
import {auth} from '../../store/actions/auth';

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {
        const {auth} = this.props;
        const {email, password} = this.state.formControls;
        auth(
            email.value,
            password.value,
            true
        );
    }

    registerHandler = () => {
        const {auth} = this.props;
        const {email, password} = this.state.formControls;
        auth(
            email.value,
            password.value,
            false
        );  
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    validateControl = (value, validation) => {
        if (!validation) {
            return true;
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid; 
        }

        if (validation.email) {
           isValid = is.email(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid;
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs = () => {
        const {formControls} = this.state;
        return Object.keys(formControls).map((controlName, idx) => {
            const control = formControls[controlName];
            const {type, value, valid, touched, label, errorMessage, validation} = control;
            return (
                <Input 
                    key={controlName + idx}
                    type={type}
                    value={value}
                    valid={valid}
                    touched={touched}
                    label={label}
                    shouldValidate={!!validation}
                    errorMessage={errorMessage}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            );
        });
    }

    render() {
        const {isFormValid} = this.state;
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form 
                        onSubmit={this.submitHandler}
                        className={classes.AuthForm}
                    >
                        {this.renderInputs()}
                        <Button 
                            type="succes"
                            onClick={this.loginHandler}
                            disabled={!isFormValid}
                        >
                            Войти
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!isFormValid}
                        >Регистрация</Button>
                    </form>
                </div>
                
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);