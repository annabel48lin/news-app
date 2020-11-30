import React from "react";
import Article from "./Article";

type AProps = {
  readonly headline: string;
  readonly source: string;
  readonly description: string;
  readonly link: string;
};
type info = { articles: AProps[]; query: string };

const FilteredArticles = (props: info) => {
  const filtered: AProps[] = props.articles.filter(
    (s) =>
      s.description.toLowerCase().indexOf(props.query.toLowerCase()) !== -1 ||
      s.headline.toLowerCase().indexOf(props.query.toLowerCase()) !== -1
  );

  return filtered.length < 1 ? (
    <div>No articles found</div>
  ) : (
    <div>
      {filtered.map((article) => (
        <Article key = {article.headline}
          headline={article.headline}
          source={article.source}
          description={article.description}
          link={article.link}
        />
      ))}
    </div>
  );
};

export default FilteredArticles;
