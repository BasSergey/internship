import React, { Component } from 'react';
import { FormErrors } from '../FormErrors';
import './Form.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    render() {
        return (
            <form className="form  demoForm">
                <h2>Сontact me</h2>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <label className={`form-label ${this.errorClass(this.state.formErrors.email)}`}>
                    <span htmlFor="email">Enter email</span>
                    <input type="email" required className="form-control" name="email" placeholder="email"
                        value={this.state.email}
                        onChange={this.handleUserInput}></input>
                </label>

                <label className={`form-label ${this.errorClass(this.state.formErrors.password)}`}>
                    <span htmlFor="password">Enter your password</span>
                    <input type="password" className="form-control" name="password" placeholder="password"
                        value={this.state.password}
                        onChange={this.handleUserInput}></input>


                </label>
                <button type="submit" className="button" disabled={!this.state.formValid}>Sign up</button>
            </form>
        )
    }
}

export default Form;