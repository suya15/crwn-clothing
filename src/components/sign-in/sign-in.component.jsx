import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';

const SignIn = () => {

    const [userCredentials, setCredentials] = useState({ email: '', password: '' })
    const dispatch = useDispatch();
    const googleSignInStartHandler = () => dispatch(googleSignInStart());
    const emailSignInStartHandler = (email, password) => dispatch(emailSignInStart({ email, password }))

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStartHandler(email, password);
    };


    // below same function for different inputs written dynamically
    const handleChange = event => {

        // destructuring for values what we need or extracting out of event.target
        const { value, name } = event.target;

        // name will be taken out of event.target and will be set accordingly for both name and value, both name and value will be dynamically set
        // we need use it and reuturn te changes just like we do in our reducer
        setCredentials({ ...userCredentials, [name]: value })

    };


    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput name="email"
                    type="email"
                    label="email"
                    handleChange={handleChange}
                    value={email}
                    required />
                <FormInput name="password"
                    type="password"
                    label="password"
                    handleChange={handleChange}
                    value={password}
                    required />


                <div className="buttons">
                    <CustomButton type="submit"> Sign in </CustomButton>
                    <CustomButton type="button" onClick={googleSignInStartHandler} isGoogleSignIn> Sign in With Google </CustomButton>
                </div>

            </form>
        </div>
    )

}


export default SignIn;

// without using hooks using mapDispatchToProps is below implemented

// import React, {useState} from 'react';
// import { connect } from 'react-redux';

// import CustomButton from '../custom-button/custom-button.component';
// import FormInput from '../form-input/form-input.component';
// import './sign-in.styles.scss';
// import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';

// const SignIn = ({ emailSignInStart, googleSignInStart }) => {

//     const [userCredentials, setCredentials] = useState({ email: '', password: '' })

//     // constructor(props) {
//     //     super(props);


//     //     this.state = {
//     //         email: '',
//     //         password: ''
//     //     }
//     // }
//     const { email, password } = userCredentials;

//     const handleSubmit = async event => {
//         event.preventDefault();
//         // const { email, password } = this.state;
//         // const { emailSignInStart } = this.props;
//         emailSignInStart(email, password);
//         // try {
//         //     await auth.signInWithEmailAndPassword(email, password);
//         //     this.setState({
//         //         email: '',
//         //         password: ''
//         //     });
//         // } catch(error) {
//         //     console.log(error);
//         // }


//         // this.setState({ email: '', password: '' })
//     };


//     // below same function for different inputs written dynamically
//     const handleChange = event => {

//         // destructuring for values what we need or extracting out of event.target
//         const { value, name } = event.target;

//         // name will be taken out of event.target and will be set accordingly for both name and value, both name and value will be dynamically set
//         // this.setState({ [name]: value })
//         // we need use it and reuturn te changes just like we do in our reducer
//         setCredentials({ ...userCredentials, [name]: value })

//     };


//     return (
//         <div className="sign-in">
//             <h2>I already have an account</h2>
//             <span>Sign in with your email and password</span>

//             <form onSubmit={handleSubmit}>
//                 <FormInput name="email"
//                     type="email"
//                     label="email"
//                     handleChange={handleChange}
//                     value={email}
//                     required />
//                 <FormInput name="password"
//                     type="password"
//                     label="password"
//                     handleChange={handleChange}
//                     value={password}
//                     required />


//                 <div className="buttons">
//                     <CustomButton type="submit"> Sign in </CustomButton>
//                     <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn> Sign in With Google </CustomButton>
//                 </div>

//             </form>
//         </div>
//     )

// }


// const mapDispatchToProps = dispatch => ({
//     googleSignInStart: () => dispatch(googleSignInStart()),
//     emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
// });


// export default connect(null, mapDispatchToProps)(SignIn);