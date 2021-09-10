import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';

import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ email: '', password: '' })
    }


    // below same function for different inputs written dynamically
    handleChange = event => {

        // destructuring for values what we need or extracting out of event.target
        const { value, name } = event.target;

        // name will be taken out of event.target and will be set accordingly for both name and value
        this.setState({ [name]: value })
    }



    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email"
                        type="email"
                        label="email"
                        handleChange={this.handleChange}
                        value={this.state.email}
                        required />
                    <FormInput name="password"
                        type="password"
                        label="password"
                        handleChange={this.handleChange}
                        value={this.state.password}
                        required />


                    <div className="buttons">
                        <CustomButton type="submit"> Sign in </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn> Sign in With Google </CustomButton>
                    </div>

                </form>
            </div>
        )

    }
}


export default SignIn;