import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import './sign-up.styles.scss';
import { signUpStart } from '../../redux/user/user.actions';

const SignUp = ({ signUpStart }) => {

    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Password don't match");
            return;
        }

        signUpStart({ email, password, displayName });

        // this will clear our form
        // this.setState({
        //     displayName: '',
        //     email: '',
        //     password: '',
        //     confirmPassword: ''
        // })

        // try {
        //     // const {user} =  await auth.createUserWithEmailAndPassword(email, password);

        //     // await createUserProfileDocument(user, {displayName});

        //     // this will clear our form
        //     this.setState({
        //         displayName: '',
        //         email: '',
        //         password: '',
        //         confirmPassword: ''
        //     })


        // } catch (error) {
        //     console.error(error);

        // }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });

    };


    return (
        <div className="sign-up">
            <h2 className="title">I do not have a account</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required />
                <FormInput
                    type='text'
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required />
                <FormInput
                    type='password'
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required />
                <FormInput
                    type='password'
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);