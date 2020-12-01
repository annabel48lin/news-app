import React, {useState} from 'react';
import Home from "./Home";
import Following from "./Following";
import Settings from "./Settings"
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

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };


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
        <Route path="/home" component={Home} />
        <Route path="/following" component={Following} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </div>
    
  );
}

export default App;
