import React, { ChangeEvent, useState } from "react";
import Home from "./Home";
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from "react-router-dom";
import { isTemplateExpression } from "typescript";
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

  return (
    <div style={{ width: "70%" }}>
      <Toolbar>
        <Tabs variant="fullWidth">
          {menu.map((item) => (
            <Tab
              label={item.name}
              icon={<item.icon />}
              component={Link}
              to={item.url}
            >
              <div>{<item.page />}</div>
            </Tab>
          ))}
        </Tabs>
      </Toolbar>

      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/two" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
