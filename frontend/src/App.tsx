import React, {useState, useEffect} from 'react';
import Home from "./Home";
import Following from "./Following";
import Settings from "./Settings";
import Authentication from "./Authenticated"
import {
  Link,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { Toolbar, Tabs, Tab } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import SettingsIcon from "@material-ui/icons/Settings";
import firebase from "firebase/app";


function App() {
  const menu = [
    {
      name: "home",
      icon: HomeIcon,
      page: Home,
      url: "/home",
    },
    {
      name: "following",
      icon: CollectionsBookmarkIcon,
      page: Home,
      url: "/following",
    },
    {
      name: "settings",
      icon: SettingsIcon,
      page: Home,
      url: "/settings",
    },
  ];
  
  const [value, setValue] = React.useState(0);
  const [following, setFollowing] = useState<string[]>([]);
  const [country, setCountry] = useState("us")

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  type CleanArticle = {
    source: string;
    author: string;
    title: string;
    topic: string;
    description: string;
    url: string;
    urlToImage: string;
  };

  

  const fetchArticles = () => {
    fetch('/newsToday?country=' + country)
      .then((res) => res.json())
      .then((json) => {console.log(json); setArticles(json)});
      console.log(country)
  }
  // const articles:CleanArticle[] = require("./dummyArticles.json")
  const [articles, setArticles] = useState<CleanArticle[]>([])

  window.onload = function () {
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        fetchArticles()
        localStorage.setItem("hasCodeRunBefore", "true");
    }
}

  const width = 1500;

  const widthModifier = {
    width: `${width}px`,
  };


  const email = firebase.auth().currentUser?.email;

  const fetchUserPrefs = () => {
    console.log("made it here")
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
            console.log("d",d);
            setFollowing(d.categories);
            setCountry(d.country);

            fetchArticles();
          });
      })
      .catch(() => {
        console.log("not authenticated get");
      });
  };

  // fetchUserPrefs()

  return (
      <div style={{ width: "70%" }}>
      <Toolbar>
        <Tabs style={widthModifier} variant="fullWidth" value={value} onChange={handleChange}>
          {menu.map((item) => (
           
            <Tab
              key = {item.name}
              label={item.name}
              icon={<item.icon />}
              component={Link}
              to={item.url}
              onChange={() => fetchUserPrefs}
            >
            </Tab>
            
          ))}
        </Tabs>
      </Toolbar>

      <Switch>
        <Route path="/home" 
        render={(props) => (
          <Home {...props} articles = {articles} />
        )}
        />
        <Route path="/following" 
        render={(props) => (
          <Following {...props} 
            following = {following}
            callbackFollowing = {(following) => setFollowing(following)}
            articles = {articles} 
            
            />
        )}
        />
        <Route path="/settings"
        render= {(props) => {
          
            // fetchUserPrefs();
            // console.log("following",following)
            return (
          <Settings {...props}
            following = {following}
            callbackFollowing = {(following) => setFollowing(following)}
            callbackCountry = {(country) => setCountry(country)}
            countryI = {country}
            callbackArticles = {fetchArticles}
            />
            )}}
        />
        <Route path="/" 
        render={(props) => (
          <Home {...props} articles = {articles} />
        )}
         /> 
      </Switch>
    </div>
    
  );
}

export default App;
