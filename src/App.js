import './App.css';
import HomePage from './pages/homepage.component';

import { Switch, Route, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import React from 'react';
import { setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';


class App extends React.Component {

  // unsubscribing the auth to avoid memory leak

  unsubscribeFromAuth = null;


  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
          console.log(this.state);
        });
      }
      else {
        // always remember setState is async with its results // removed setState after using action dispatch
        setCurrentUser(userAuth); // to setCurrentUser we only need to pass the values which we want to modify
      }

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={
            () => this.props.currentUser ?
              (<Redirect to='/' />) :
              (<SignInAndSignUpPage />)
          } />

        </Switch>
      </div>
    );

  }

}


// without using createStructuredSelector
// const mapStateToProps = (state) => ({
//   currentUser: selectCurrentUser(state)
// });


//  using createStructuredSelector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) // note is all about this dispatch understand carefully
});

export default connect(mapStateToProps, mapDispatchToProps)(App); // note has menion of this too 1st arg of first bracket will be null if no mapStateToProps
