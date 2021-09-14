import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// v9 compat packages are API compatible with v8 code


const config = {
  apiKey: "AIzaSyDKh1kqqP22CDhPn-GpG4Gi8TEEzT5We8Y",
  authDomain: "crwn-db-8c523.firebaseapp.com",
  projectId: "crwn-db-8c523",
  storageBucket: "crwn-db-8c523.appspot.com",
  messagingSenderId: "62622853313",
  appId: "1:62622853313:web:c32cc2aa21ce8a63e1cc40",
  measurementId: "G-L79NDQBSE4"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // userRef is the document reference
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = userRef.get();

  // this code simply creates the snapshot/data
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;