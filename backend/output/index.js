"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
const axios_1 = __importDefault(require("axios"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const body_parser_1 = __importDefault(require("body-parser"));
require("firebase/app");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// Path to wherever you put your service-account.json
const serviceAccount = require("./service-account.json");
const key = require("./apikey.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://news-app-6ca40.firebaseio.com",
// });
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: "https://newsapp2-70958.firebaseio.com",
});
const express = require("express");
const app = express();
app.use(cors_1.default());
app.use(express.static(path_1.default.join(__dirname, "../frontend/build")));
const db = firebase_admin_1.default.firestore();
const port = 8080;
app.use(body_parser_1.default.json());
const apiKey = "&apiKey=" + key.key;
const base = "https://newsapi.org/v2/";
/*
 TO DO:
 - make a refresh method that refreshes the 2 sets of articles
    - 1) all articles, not separated by topic (top-headlines from newsAPI)
    - 2) articles with topics (get each category and combine)
 - modify /newsToday so that if there are no categories, return 1).
    If categories=true, return 2)
 */
const clean = (a) => {
    const cleaned = {
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
function compare(a, b) {
    // "2020-12-11T18:11:00Z", "2020-12-11T17:05:00Z"
    //            0123456789
    const indA = a.publishedAt.indexOf("T");
    const indB = b.publishedAt.indexOf("T");
    const timeA = a.publishedAt.substring(indA + 1);
    const timeB = b.publishedAt.substring(indA + 1);
    if (timeA > timeB)
        return -1;
    if (timeA < timeB)
        return 1;
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
// query param: country
// note: user does not have to be logged in for this
app.get("/newsToday", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const country = req.query.country ? req.query.country : "us";
        const doc = yield articlesCollection.doc(country).get();
        let articles = doc.data();
        res.send(articles.articles);
    });
});
// articlesCollection stores articles for each country
// country will store categorized articles (compile them from each category)  (ex: us)
const articlesCollection = db.collection("articles");
/**
 * query param: a country
 * updates that country's news
 * - categorized articles (compile them from each category)
 */
app.post("/refreshNews", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const country = req.query.country ? req.query.country : "us";
        let url = base + "top-headlines?" + "country=" + country;
        let all_articles = [];
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            try {
                const posts = yield axios_1.default.get(url + "&category=" + category + apiKey);
                let articles = posts.data.articles;
                let categorized = articles.map((a) => {
                    a.topic = category;
                    return a;
                });
                all_articles = all_articles.concat(categorized);
            }
            catch (_a) {
                console.error("Failure!");
            }
        }
        all_articles = all_articles.sort((a, b) => compare(a, b));
        let cleaned = all_articles.map((a) => clean(a));
        console.log(all_articles);
        yield articlesCollection.doc(country).set({ articles: cleaned });
        res.send(cleaned);
    });
});
const inituserpref = {
    country: "us",
    categories: [
        {
            name: "Business",
            following: false,
        },
        {
            name: "Entertainment",
            following: false,
        },
        {
            name: "Health",
            following: false,
        },
        {
            name: "Science",
            following: false,
        },
        {
            name: "Sports",
            following: false,
        },
        {
            name: "Technology",
            following: false,
        },
    ],
};
const postsCollection = db.collection("userprefs");
// create a post
app.post("/UserPref/:email", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        firebase_admin_1.default
            .auth()
            .verifyIdToken(req.headers.idtoken)
            .then(() => __awaiter(this, void 0, void 0, function* () {
            const email = req.params.email;
            const userpref = req.body;
            //potentially check email with firebase
            //if email is free, create. else, update instead
            yield postsCollection.doc(email).set(userpref);
            res.send(userpref);
        }))
            .catch(() => {
            console.log("auth error");
        });
    });
});
// read posts by name
app.get("/UserPref/:email", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.params.email;
        firebase_admin_1.default
            .auth()
            .verifyIdToken(req.headers.idtoken)
            .then(() => __awaiter(this, void 0, void 0, function* () {
            // const doc = await postsCollection.doc(email).get();
            // let post: UserPrefWithID = doc.data() as UserPrefWithID;
            // res.send(post);
            console.log(email);
            postsCollection.doc(email).onSnapshot(function (snapshot) {
                return __awaiter(this, void 0, void 0, function* () {
                    const id = snapshot.id;
                    if (snapshot.exists) {
                        console.log("here1-1");
                        const doc = yield postsCollection.doc(email).get();
                        let post = doc.data();
                        res.send(post);
                        console.log("here1-2");
                    }
                    else {
                        console.log("here2-1");
                        yield postsCollection.doc(email).set(inituserpref);
                        res.send(inituserpref);
                        console.log("here2-2");
                    }
                });
            });
        }))
            .catch(() => {
            console.log("auth error2");
        });
    });
});
// tell express to listen for requests on port 8080
app.listen(process.env.PORT || 8080, () => console.log("backend started"));
