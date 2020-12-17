// import express from "express";
import axios from "axios";
import admin from "firebase-admin";
import bodyParser from "body-parser";
import type { Request, Response } from "express";

// Path to wherever you put your service-account.json
const serviceAccount = require("./service-account.json");
const key = require("./apikey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://news-app-6ca40.firebaseio.com",
});

const express = require("express");
const app = express();

const db = admin.firestore();
const port = 8080;
app.use(bodyParser.json());

const apiKey = "&apiKey=" + key.key;
const base = "https://newsapi.org/v2/";

type Article = {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  date: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

type CleanArticle = {
  source: string;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
};

type CleanArticleWithCategory = CleanArticle & {
  topic: string;
};

type ArticleWithCategory = Article & {
  topic: string;
};

/*
 TO DO:
 - make a refresh method that refreshes the 2 sets of articles 
    - 1) all articles, not separated by topic (top-headlines from newsAPI)
    - 2) articles with topics (get each category and combine)
 - modify /newsToday so that if there are no categories, return 1). 
    If categories=true, return 2) 
 */

const clean = (a: ArticleWithCategory) => {
  const cleaned: CleanArticleWithCategory = {
    source: a.source.name,
    author: a.author,
    title: a.title,
    topic: a.topic,
    description: a.description,
    url: a.url,
    urlToImage: a.urlToImage,
  };
  return cleaned;
};
function compare(a: Article, b: Article) {
  // "2020-12-11T18:11:00Z", "2020-12-11T17:05:00Z"
  //            0123456789
  const indA = a.publishedAt.indexOf("T");
  const indB = b.publishedAt.indexOf("T");
  const timeA = a.publishedAt.substring(indA + 1);
  const timeB = b.publishedAt.substring(indA + 1);
  if (timeA > timeB) return -1;
  if (timeA < timeB) return 1;
  return 0;
}

// endpoints: https://newsapi.org/v2/everything?apiKey=910452c99f54428bb487e74cdb976f0f
//

/** query params: country
 *  categories = true or categories = false
 */

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

type returnedArticles = {
  articles: CleanArticleWithCategory[]
}

// query param: country
app.get("/newsToday", async function (req: Request, res: Response) {
  const country = req.query.country ? req.query.country as string: "us";

  const doc = await articlesCollection.doc(country).get();
  let articles = doc.data() as returnedArticles;
  res.send(articles.articles);
});

// articlesCollection stores articles for each country
// country will store categorized articles (compile them from each category)  (ex: us)
const articlesCollection = db.collection("articles");

/**
 * query param: a country
 * updates that country's news
 * - categorized articles (compile them from each category)
 */
app.post("/refreshNews", async function (req: Request, res: Response) {
  const country = req.query.country ? req.query.country as string: "us";
  let url = base + "top-headlines?" + "country=" + country;
  

  let all_articles:ArticleWithCategory[] = [];
  for (let i: number = 0; i < categories.length; i++) {
    const category: string = categories[i];
    try {
    const posts = await axios.get(url + "&category=" + category + apiKey);
    let articles: Article[] = posts.data.articles;
    
    let categorized = articles.map((a) => {
      (a as any).topic = category;
      return a as ArticleWithCategory;
    });


    all_articles = all_articles.concat(categorized);
    } catch {
      console.error("Failure!");
    }
  }
  all_articles = all_articles.sort((a, b) => compare(a, b));
  let cleaned = all_articles.map((a) => clean(a));
  console.log(all_articles)

  await articlesCollection.doc(country).set({"articles": cleaned});
  res.send(cleaned)
});


/*
app.get("/newsToday", async function (req: Request, res: Response) {
  const country = req.query.country ? req.query.country : "us";
  let categories: string[] = req.query.categories
    ? (req.query.categories as string[])
    : [];
  if (typeof req.query.categories === "string")
    categories = [req.query.categories];
  // console.log("categories", categories);
  let url = base + "top-headlines?" + "country=" + country;

  let news: CleanArticle[] = [];

  // if categories are not specified, return all articles in country
  if (categories.length === 0) {
    // console.log(url + apiKey);
    const posts = await axios.get(url + apiKey);
    const articles: Article[] = posts.data.articles;
    news = articles.map((a) => clean(a));

    // console.log("news", news);
  }

  // if categories are specified, get articles in each category and merge into one list (should we sort by time?)
  else {
    let all_articles: Article[] = [];
    url = url + "&category=";

    for (let i: number = 0; i < categories.length; i++) {
      const category: string = categories[i];
      // console.log("category in loop", category);
      // console.log(url + category + apiKey);
      try {
        const posts = await axios.get(url + category + apiKey);
        const articles: Article[] = posts.data.articles;
        // console.log(articles)
        all_articles = all_articles.concat(articles);
        // console.log("here1");
        // console.log(all_articles);
        // console.log("Success!");
      } catch (e) {
        console.error("Failure!");
      }
    }
    // console.log("here2");
    // console.log("all_articles", all_articles);
    all_articles = all_articles.sort((a, b) => compare(a, b));

    news = all_articles.map((a) => clean(a));
    console.log(all_articles);
  }
  // http://localhost:57964/newsToday?country=us&categories=business&categories=health

  res.send(news);
});
*/

/**
 * store for each user:
 * categories they like
 * country
 */

// Define a type for our Post document stored in Firebase
type UserPref = {
  categories: string[];
  country: string;
};

// Add id field to our Post type
type UserPrefWithID = UserPref & {
  email: string;
};

const postsCollection = db.collection("userprefs");

// create a post
app.post("/UserPref/:email", async function (req: Request, res: Response) {
  const email = req.params.email;
  const userpref: UserPref = req.body;
  //potentially check email with firebase

  //if email is free, create. else, update instead
  await postsCollection.doc(email).set(userpref);
  res.send(userpref);
});

// read posts by name
app.get("/UserPref/:email", async function (req: Request, res: Response) {
  const doc = await postsCollection.doc(req.params.email).get();
  let post: UserPrefWithID = doc.data() as UserPrefWithID;
  res.send(post);
});

// tell express to listen for requests on port 8080
app.listen(8080, function () {
  console.log("Backend started");
});
