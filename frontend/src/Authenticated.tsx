import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import firebase from 'firebase/app';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';

// const firebaseConfig = {
//   apiKey: "AIzaSyAb-ZaacUnWVMh8e6XRcmY9t_QbXfgXHhg",
//   authDomain: "news-app-6ca40.firebaseapp.com",
//   databaseURL: "https://news-app-6ca40.firebaseio.com",
//   projectId: "news-app-6ca40",
//   storageBucket: "news-app-6ca40.appspot.com",
//   messagingSenderId: "478691017225",
//   appId: "1:478691017225:web:290ae53f0ea4a1aa912ed8"
// };

var firebaseConfig = {
  apiKey: "AIzaSyD1qHEVWqJHvkudKq_1GDMEg3qYV3J8jqw",
  authDomain: "newsapp2-70958.firebaseapp.com",
  projectId: "newsapp2-70958",
  storageBucket: "newsapp2-70958.appspot.com",
  messagingSenderId: "693142805098",
  appId: "1:693142805098:web:763af0e4a98661b50a8813"
};

firebase.initializeApp(firebaseConfig);

type Props = {
  readonly children: React.ReactNode;
};

const Authenticated = ({ children }: Props) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  function onAuthStateChange() {
    return firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }

  useEffect(() => onAuthStateChange(), []);

  return (
    <div>
      {user && children}
      {!user && (
        <div>
        <h1>Sign In </h1>
        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      )}
    </div>
  );
};

export default Authenticated;