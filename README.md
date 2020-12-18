# news-app

A news aggregation app that uses [newsAPI](https://newsapi.org/), where each user is able to adjust their preferences (country, categories of interest). 

# Frontend: 
Displays news from various sources and allows the user to search for keywords, filter by topic, and set favorite topics. When a user signs in, they will be able to set their following feeds and country.
# Backend: 
    POST /refreshNews - ex) http://localhost:8080/refreshNews?country=us
        takes in country (only one) and updates the news for that country in the database
        
    GET /newsToday - ex) http://localhost:8080/newsToday?country=us
        takes in country (only one) and returns the news in the database
       
    POST /UserPref/:email - ex) http://localhost:8080/UserPref/all273@cornell.edu
        takes in an email and a json of categories and country creates or updates database. Requires authentication. 
        
    GET /UserPref/:email - ex) http://localhost:8080/UserPref/abc123@cornell.edu
        takes in an email and returns the preferences associated with that email. Requires authentication. 

# Using the app
Go to the settings tab and sign in. Then, click refresh and choose your country and categories. To update your articles, press refresh again (or maybe a few times). Go to Home and Following and enjoy!
 
Group Members: Annabel Lin (all273), Justin Hsu (jah574)

Github: https://github.com/annabel48lin/news-app

Deployed Link: http://news-stop.herokuapp.com/ 
