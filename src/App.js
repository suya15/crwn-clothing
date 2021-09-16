import './App.css';
import HomePage from './pages/homepage.component';

import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import React from 'react';
import { setCurrentUser } from './redux/user/user.actions';
import {connect} from 'react-redux';


class App extends React.Component {

  // unsubscribing the auth to avoid memory leak

  unsubscribeFromAuth = null;


  componentDidMount() {
    const {setCurrentUser} = this.props;

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
          <Route exact path='/signin' component={SignInAndSignUpPage} />

        </Switch>
      </div>
    );

  }

}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) // note is all about this dispatch understand carefully
});

export default connect(null, mapDispatchToProps)(App); // note has menion of this too
