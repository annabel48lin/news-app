import React from "react";
import Article from "./Article";

type AProps = {
  readonly source: string;
  readonly author: string;
  readonly title: string;
  readonly topic: string
  readonly description: string;
  readonly url: string;
  readonly urlToImage: string;
};
type info = { articles: AProps[]; query: string };


const FilteredArticles = (props: info) => {
  let query = props.query.toLowerCase();
  const filtered: AProps[] = props.articles.filter(
    (s) => 
      (s.description != null && s.description.toLowerCase().indexOf(query) !== -1) ||
      (s.title !=null && s.title.toLowerCase().indexOf(query) !== -1) ||
      (s.source !=null && s.source.toLowerCase().indexOf(query) !== -1) ||
      (s.author !=null && s.author.toLowerCase().indexOf(query) !== -1)
  );

  return filtered.length < 1 ? (
    <h3 style={{ marginLeft: "20px" }}> No articles found </h3>
  ) : (
    <div>
      {filtered.map((article) => (
        <Article
          key={article.topic + ":" + article.title}
          source={article.source}
          author={article.author}
          title={article.title}
          description={article.description}
          url={article.url}
          urlToImage={article.urlToImage}
        />
      ))}
    </div>
  );
};

export default FilteredArticles;
