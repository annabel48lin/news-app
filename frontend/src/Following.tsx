import React, { useState } from "react";

import "./Border.css";
import FilteredArticles from "./FilteredArticles";
import Topic from "./Topic";


const Following = () => {
  const [searchBar, setSearchBar] = useState("");
  type CleanArticle = {
    source: string;
    author: string;
    title: string;
    topic: string;
    description: string;
    url: string;
    urlToImage: string;
  };
  const articles:CleanArticle[] = require("./dummyArticles.json")

  const following = ["Politics", "World", "Tech"]
  
  const containsStr = (arr : string[], str : string) => {
    for (const topic of arr) {
      if (topic === str) return true
    }
    return false 
  };

  const topicsInit = following.map((topicName)=> ({name: topicName, fav: false}))
  
  let filteredArticles = articles
  
  // articles that have topics you are following (based on settings)
  // let filteredArticles =  articles.filter((article)=>
  //   (containsStr (following, article.topic))
  // )

  const [topics, setTopics] = useState(topicsInit);
  // pass this in to Topic 
  const updateTopics = (name: string) => {
    // find where in topics that the name occurs, and then set fav
    const newArr = topics.map((topic) => topic.name === name ? {name : name, fav : !topic.fav} : topic)
    setTopics(newArr)
  }

  const allFalse = topics.reduce((res, curr)=> (!curr.fav && res), true);

  const contains = (arr : { name: string;  fav: boolean} [], str : string) => {
    for (const val of arr) {
        if (val.name === str && val.fav===true) return true
    }
    return false 
  };

  //articles in topics that are clicked/chosen
  if (!allFalse){
    filteredArticles =  articles.filter((article)=>
    (contains (topics, article.topic))
  )
  }
  
  return (
    <div>
      <h2 style={{marginLeft: "20px"}}> Welcome! It's 12/1. Here's your news for today: </h2>

      
      <div style={{marginLeft: "20px"}}>
        {topics.map((topic)=>(
          
          <Topic key = {topic.name} name={topic.name} fav={topic.fav} callback={updateTopics}/>
   
        ))}
      </div>


      <div style={{ float: "right", textAlign: "right" }}>
        <input
          value={searchBar}
          placeholder="search.."
          onChange={(e) => setSearchBar(e.target.value)}
        />
      </div>

      <div style={{ width: "100%", float: "left" }}>
          {filteredArticles===[] ? <span> There are no articles </span>: 
          <span><FilteredArticles articles={filteredArticles} query={searchBar} /></span>}
        
      </div>
    </div>
  );
};

export default Following;
