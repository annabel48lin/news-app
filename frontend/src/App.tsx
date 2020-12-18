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

  let country = "us"
  

  const fetchArticles = () => {
    fetch('/newsToday?country=' + country)
      .then((res) => res.json())
      .then((json) => {console.log(json); setArticles(json)});
  }
  // const articles:CleanArticle[] = require("./dummyArticles.json")
  const [articles, setArticles] = useState<CleanArticle[]>([])
  useEffect(() => fetchArticles(), []);


  const width = 1500;

  const widthModifier = {
    width: `${width}px`,
  };

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
           articles = {articles} />
        )}
        />
        <Route path="/settings"
        render= {(props) => (
          <Settings {...props}
            following = {following}
            callbackFollowing = {(following) => setFollowing(following)}
            />
        )}
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
