import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';

class SignIn extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;
        const { emailSignInStart } = this.props;
        emailSignInStart(email, password);
        // try {
        //     await auth.signInWithEmailAndPassword(email, password);
        //     this.setState({
        //         email: '',
        //         password: ''
        //     });
        // } catch(error) {
        //     console.log(error);
        // }


        // this.setState({ email: '', password: '' })
    }


    // below same function for different inputs written dynamically
    handleChange = event => {

        // destructuring for values what we need or extracting out of event.target
        const { value, name } = event.target;

        // name will be taken out of event.target and will be set accordingly for both name and value
        this.setState({ [name]: value })
    }



    render() {
        const { googleSignInStart } = this.props;
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
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn> Sign in With Google </CustomButton>
                    </div>

                </form>
            </div>
        )

    }
}


const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
});


export default connect(null, mapDispatchToProps)(SignIn);