import React from "react";
import Article from "./Article";

type AProps = {
  readonly source: string;
  readonly author: string;
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly urlToImage: string;
};
type info = { articles: AProps[]; query: string };

const FilteredArticles = (props: info) => {
  const filtered: AProps[] = props.articles.filter(
    (s) =>
      s.description.toLowerCase().indexOf(props.query.toLowerCase()) !== -1 ||
      s.title.toLowerCase().indexOf(props.query.toLowerCase()) !== -1
  );

  return filtered.length < 1 ? (
    <h3 style={{marginLeft: "20px"}}> No articles found </h3> 
  ) : (
    <div>
      {filtered.map((article) => (
        <Article key = {article.title}
          source = {article.source}
          author = {article.author}
          title = {article.title}
          description = {article.description}
          url = {article.url}
          urlToImage = {article.urlToImage}
        />
      ))}
    </div>
  );
};

export default FilteredArticles;
