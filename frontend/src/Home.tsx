import React, { useState } from "react";

import "./Border.css";
import FilteredArticles from "./FilteredArticles";
import Topic from "./Topic";


const Home = () => {
  const [searchBar, setSearchBar] = useState("");

  type CleanArticle = {
    source: string;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
  };
  const articles:CleanArticle[] = require("./dummyArticles.json")


  // US, World, Politics, Business, Tech, Entertainment
  const topicsInit = [
    {
      name: "US",
      fav: false
    },
    {
      name: "World",
      fav: false
    },
    {
      name: "Politics",
      fav: false
    },
    {
      name: "Business",
      fav: false
    },
    {
      name: "Tech",
      fav: false
    },
    {
      name: "Entertainment",
      fav: false
    },
  ]

  //if all favs are false, display all articles. Else, display the ones where fav is true
  const [topics, setTopics] = useState(topicsInit);
  // pass this in to Topic 
  const updateTopics = (name: string) => {
    // find where in topics that the name occurs, and then set fav
    const newArr = topics.map((topic) => topic.name === name ? {name : name, fav : !topic.fav} : topic)
    setTopics(newArr)
  }

  const allFalse = topics.reduce((res, curr)=> (!curr.fav && res), true)

  const contains = (arr : { name: string;  fav: boolean} [], str : string) => {
    for (const val of arr) {
      if (val.name === str && val.fav===true) return true
    }
    return false 
  };
  
  //filter by topic here??
  //see if topic is faved. if no topic is faved, return all
  let filteredArticles = articles;
  // if (!allFalse){
  //   filteredArticles =  articles.filter((article)=>
  //   (contains (topics, article.topic))
  // )
  // }
  
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
        <FilteredArticles articles={filteredArticles} query={searchBar} />
      </div>
    </div>
  );
};

export default Home;
