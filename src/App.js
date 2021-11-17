import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './pages/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';
import { checkUserSession } from './redux/user/user.actions';
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';


const App = () => {

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  // unsubscribing the auth to avoid memory leak

  // unsubscribeFromAuth = null;


  // componentDidMount() {
  //   const { checkUserSession } = this.props;
  //   checkUserSession();
  //   // const { setCurrentUser
  //   //   //  collectionsArray 
  //   //   } = this.props;

  //     // we are not relying on any listeners like onAuthstateChange, we have moved to sagas
  //   // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

  //   //   if (userAuth) {

  //   //     const userRef = await createUserProfileDocument(userAuth);

  //   //     userRef.onSnapshot(snapshot => {
  //   //       setCurrentUser({
  //   //         id: snapshot.id,
  //   //         ...snapshot.data()
  //   //       })
  //   //     });
  //   //   }
  //   //   else {
  //   //     // always remember setState is async with its results // removed setState after using action dispatch
  //   //     setCurrentUser(userAuth); // to setCurrentUser we only need to pass the values which we want to modify

  //   //     // below function is called only so that we can write the shop data programmatically by calling a util
  //   //     // function so that we dont have to write ourselves into database
  //   //     // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items}))); 
  //   //   }

  //   // });
  // }

  // here as we know checkUserSession will not change , coz its coming from dispatch , 
  //so we can use it like here but if in case  checUserSession in parent would have changed so 
  // different syntax would have been  used to mimic componentDidMount
  // useEffect(() => {
  //   checkUserSession();
  // }, [checkUserSession]);
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }


  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={
          () => currentUser ?
            (<Redirect to='/' />) :
            (<SignInAndSignUpPage />)
        } />

      </Switch>
    </div>
  );


}


// without using createStructuredSelector
// const mapStateToProps = (state) => ({
//   currentUser: selectCurrentUser(state)
// });


//  using createStructuredSelector
// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
//   // below was just did to make collection and doc to it from shop data file 
//   // collectionsArray: selectCollectionsForPreview
// });


// const mapDispatchToProps = dispatch => ({
//   // setCurrentUser: user => dispatch(setCurrentUser(user)) // note is all about this dispatch understand carefully
//   checkUserSession: () => dispatch(checkUserSession())
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App); // note has menion of this too 1st arg of first bracket will be null if no mapStateToProps
export default App;