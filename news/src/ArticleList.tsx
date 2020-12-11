import React, {useState, useEffect} from 'react';
import Article from './Article';

const ArticleList = () => {
  type Article = {
    topic: string
    id: string
  }
const [articles, setArticles] = useState<readonly Article[]>([]);
const fetchArticles = () => {
  fetch ('/getSongs')
  .then (res => res.json())
  .then (json => setArticles(json));
}
useEffect(() => fetchArticles(), []);
return (
  <div>
    {articles.map(article => <div> <Article key = {article.id} {...article} /> </div>)}
  </div>
  );
}

export default ArticleList