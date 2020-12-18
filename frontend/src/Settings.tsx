import React, { useState } from "react";
import Topic from "./Topic";
import Authenticated from "./Authenticated";
import firebase from "firebase/app";
// Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
type category = {
  name: string;
  following: boolean;
};

type UserPref = {
  categories: category[];
  country: string;
};

const Settings = () => {
  //fetch topics init
  const [topics, setTopics] = useState<category[]>([]);
  const [country, setCountry] = useState("us");

  const email = firebase.auth().currentUser?.email;

  const fetchUserPrefs = () => {
    firebase
      .auth()
      .currentUser?.getIdToken(true)
      .then((idtoken) => {
        fetch("/UserPref/" + email, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            idtoken,
          },
        })
          .then((response) => response.json())
          .then((d) => {
            setTopics(d.categories);
            setCountry(d.country);
          });
      })
      .catch(() => {
        console.log("not authenticated");
      });
  };

  const updateTopics = (name: string) => {
    // find where in topics that the name occurs, and then set fav
    const newArr = topics.map((topic) =>
      topic.name === name ? { name: name, following: !topic.following } : topic
    );
    setTopics(newArr);

    //get email from firebase
    //send req to update user prefs

    const email = firebase.auth().currentUser?.email;
    const prefs: UserPref = { categories: topics, country: country };

    firebase
      .auth()
      .currentUser?.getIdToken(true)
      .then((idtoken) => {
        fetch("/UserPref/" + email, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            idtoken,
          },
          body: JSON.stringify(prefs),
        });
        //   .then((res) => res.text())
        //   .then((id) => setSongs([...songs, { name, artist, rating, id }]));
      })
      .catch(() => {
        console.log("not authenticated");
      });
  };

  console.log(topics);

  const changeCountry = (event: any) => {
    setCountry(event.target.value);
  };

  const countries = [
    "ae",
    "ar",
    "at",
    "au",
    "be",
    "bg",
    "br",
    "ca",
    "ch",
    "cn",
    "co",
    "cu",
    "cz",
    "de",
    "eg",
    "fr",
    "gb",
    "gr",
    "hk",
    "hu",
    "id",
    "ie",
    "il",
    "in",
    "it",
    "jp",
    "kr",
    "lt",
    "lv",
    "ma",
    "mx",
    "my",
    "ng",
    "nl",
    "no",
    "nz",
    "ph",
    "pl",
    "pt",
    "ro",
    "rs",
    "ru",
    "sa",
    "se",
    "sg",
    "si",
    "sk",
    "th",
    "tr",
    "tw",
    "ua",
    "us",
    "ve",
    "za",
  ];

  fetchUserPrefs();

  return (
    <div style={{ marginLeft: "20px" }}>
      <h1>Sign In </h1>
      <Authenticated>
        <text>(Will implement later after Firebase is set up)</text>
      </Authenticated>
      <h1>Followed Topics: </h1>
      <div style={{ marginLeft: "20px" }}>
        <select onChange={changeCountry}>
          {countries.map((country) => (
            <option value={country}>{country.toUpperCase()}</option>
          ))}
        </select>

        {topics.map((topic) => (
          <Topic
            key={topic.name}
            name={topic.name}
            fav={topic.following}
            callback={updateTopics}
          />
        ))}
      </div>
    </div>
  );
};

export default Settings;
