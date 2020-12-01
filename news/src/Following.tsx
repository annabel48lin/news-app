import React, { useState } from "react";

import "./Border.css";
import FilteredArticles from "./FilteredArticles";
import Topic from "./Topic";


const Following = () => {
  const [searchBar, setSearchBar] = useState("");
  const articles = [
    {
      headline:
        "One Seat, Competing Pressures as Newsom Considers Senate Pick ",
      source: "https://assets.stickpng.com/images/592fe3133919fe0ee3614d93.png",
      description:
        "Alex Padilla, California’s secretary of state, has emerged as the front-runner to succeed Kamala Harris. But Gov. Gavin Newsom appears to be in no rush to make his choice.",
      link:
        "https://www.nytimes.com/2020/11/29/us/California-senate-seat-padilla-newsom.html",
      topic: "Politics"
    },
    {
      headline: "It’s okay if you weren’t paying attention to gadgets in 2020. Here are the best ones you missed.",
      source: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/The_Logo_of_The_Washington_Post_Newspaper.svg/1200px-The_Logo_of_The_Washington_Post_Newspaper.svg.png",
      description:
        "Better-sounding smart speakers, mini and mighty iPhones, TV upgrades and more: Our tech columnist tests the fall’s buzziest new electronics",
      link:
        "https://www.washingtonpost.com/technology/2020/11/30/smart-speaker-iphone-gadget-gift-guide/",
      topic: "Tech"
    },
    {
      headline: "Iran's supreme leader vows revenge after top nuclear scientist apparently assassinated",
      source: "data:image/png;base64,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",
      description:
        "Iran's Supreme Leader Ayatollah Seyyed Ali Khamenei has vowed revenge after the killing of the country's chief nuclear scientist, as top officials pile blame on Israel.",
      link:
        "https://www.cnn.com/2020/11/28/middleeast/iran-mohsen-fakhrizadeh-nuclear-scientists-killed-intl/index.html",
        topic: "World"
    },
  ];

  const following = ["Politics", "World", "Tech"]
  
  const containsStr = (arr : string[], str : string) => {
    for (const topic of arr) {
      if (topic === str) return true
    }
    return false 
  };

  const topicsInit = following.map((topicName)=> ({name: topicName, fav: false}))
  
  
  // articles that have topics you are following (based on settings)
  let filteredArticles =  articles.filter((article)=>
    (containsStr (following, article.topic))
  )

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
      <h1 style={{marginLeft: "20px"}}> Welcome! Today is 11/29. Here's your news for today: </h1>

      
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
