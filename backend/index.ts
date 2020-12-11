import express, {Request, Response} from 'express';
// import axios from 'axios';

const app = express()

const apiKey = "&apiKey=910452c99f54428bb487e74cdb976f0f";

const base = "https://newsapi.org/v2/"
// https://newsapi.org/v2/top-headlines?country=us&apiKey=910452c99f54428bb487e74cdb976f0f

// categories: 

// http://newsapi.org/v2/top-headlines?country=us&category=politics&apiKey=910452c99f54428bb487e74cdb976f0f
/**
 * get today's news according to params
 * 
 * params can have: 
 * - country REQUIRED
 * - categories (multiple)
 * - 
 * 
 * should return: 
 */

 
app.get('/newsToday', function (req,res) {

//   var url = 'http://newsapi.org/v2/top-headlines?' +
//   'country=us&' +
//   'apiKey=910452c99f54428bb487e74cdb976f0f';
// var req = new Request(url);
// fetch(req)
// .then(function(response) {
// console.log(response.json());
// })

    // app.get('/book/:userid', function(req,res){
    //     res.send(req.params.userid + " is really cool!");
    // });
    console.log(req.query)

    const country = req.query.country;
    const categories = req.query.categories ? req.query.categories : []
    console.log(categories)

    const url = base + "top-headlines?" + "country=" + country;

    let news:any=[]; 
    console.log(categories.length === 0)

    const setNews = (n:any) => {
        news = n;
    }

    const fetchNews = () =>{
        fetch((url+apiKey))
          .then(res => res.json())
          .then(json => setNews(json));
    }

    if (categories.length === 0){
        console.log(url+apiKey)

        fetchNews()
        
        // fetch((url+apiKey)){}
        //   .then(res => res.json())
        //   .then(json => news = json.articles);

    }

    res.send(news);
})

app.get('/', function (req,res) {
    res.send(req.body);
})



app.listen(8080, function () {
    console.log('server started');
  });