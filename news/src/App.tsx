import React, {ChangeEvent, useState} from "react";
import Article from "./Article";
import FilteredArticles from "./FilteredArticles";

function App() {

  const articles = [
    {
      headline:"Headline",
      source:"https://howlround.com/sites/default/files/2018-11/nyt.png",
      description:"description description description description description description",
      link:"https://www.nytimes.com/2020/11/29/us/California-senate-seat-padilla-newsom.html",
    },
    {
      headline:"Headline2",
      source:"https://howlround.com/sites/default/files/2018-11/nyt.png",
      description:"description2 description2 description2 description2 description2 description2",
      link:"https://www.nytimes.com/2020/11/29/us/California-senate-seat-padilla-newsom.html",
    },
    {
      headline:"Headline3",
      source:"https://howlround.com/sites/default/files/2018-11/nyt.png",
      description:"description3 description3 description3 description3 description3 description3",
      link:"https://www.nytimes.com/2020/11/29/us/California-senate-seat-padilla-newsom.html",
    }
  ]
  const [searchBar, setSB] = useState("")
  const changeSearchQ = (e: ChangeEvent<HTMLInputElement>) => {
    setSB(e.target.value)
  }
  
  return (
    <div>
      <p> Welcome! Today is 11/29! Here's your news for today: </p>
      <input value={searchBar} placeholder="search.." onChange={changeSearchQ} />

      {/* <Article
        headline="Headline"
        source="https://howlround.com/sites/default/files/2018-11/nyt.png"
        description="description description description description description description"
        link="https://www.nytimes.com/2020/11/29/us/California-senate-seat-padilla-newsom.html"
      /> */}

      <FilteredArticles articles = {articles} query = {searchBar} />
    </div>
  );
}

export default App;
