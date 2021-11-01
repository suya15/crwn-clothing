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
  const userRef = await firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  // this code simply creates the snapshot/data if it doesnt exist already in the database
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

// utility func to convert the query docs to shopdata strucuture using map and adding desired feilds to the entities, 
// following this the data will be further structred to mapped structure
// this is one of the most important use of reduce

export const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
  // structuring the shop data
  const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
    const{title,items} = docSnapshot.data();

    return{
        routeName: encodeURI(title.toLowerCase()),
        id: docSnapshot.id,
        title,
        items
    };
  });

  // mapping the data like hash map
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// utility for the persistence of session
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

// utility to make collections and documents to it
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
 const collectionRef = await firestore.collection(collectionKey);

 const batch = firestore.batch();
 objectsToAdd.forEach(obj => {
   // making ref for each object by firestore generated id
   const newDocRef = collectionRef.doc();
   batch.set(newDocRef, obj);
 });

 // commit returns promise with success null value
 return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;