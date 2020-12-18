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
            idtoken,
          },
        })
          .then((response) => response.json())
          .then((d) => {
            // console.log("hereeee")
            console.log(d);
            setTopics(d.categories);
            setCountry(d.country);
          });
      })
      .catch(() => {
        console.log("not authenticated get");
      });
  };

  const updateTopics = (name: string) => {
    // find where in topics that the name occurs, and then set fav
    // console.log("topics", topics)
    const newArr = topics.map((topic) =>
      topic.name === name ? { name: name, following: !topic.following } : topic
    );
    setTopics(newArr);

    // console.log("newarr",newArr)

    //get email from firebase
    //send req to update user prefs

    const email = firebase.auth().currentUser?.email;
    const prefs: UserPref = { categories: newArr, country: country };

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
      })
      .catch(() => {
        console.log("not authenticated set");
      });
  };

  const changeCountry = (event: any) => {
    const newCountry = event.target.value;
    setCountry(newCountry);

    const email = firebase.auth().currentUser?.email;
    const prefs: UserPref = { categories: topics, country: newCountry };

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
      })
      .catch(() => {
        console.log("not authenticated set");
      });
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

  // fetchUserPrefs();

  return (
    <div style={{ marginLeft: "20px" }}>
      <Authenticated>
        <div style={{ width: "100%", overflow: "auto" }}>
          <div style={{ float: "left" }}>
            <h1>Followed Topics: </h1>
          </div>
          <div style={{ float: "right", width: "70%" }}>
            <br /> <br />
            <button onClick={fetchUserPrefs}>⟳</button>
          </div>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <select onChange={changeCountry} value={country}>
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
      </Authenticated>
    </div>
  );
};

export default Settings;
