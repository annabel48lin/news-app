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

- The Home page displays articles in your country. In the list of articles that we fetch, there are 7 topics: General, Business, Entertainment, Health, Science, Sports, and Technology. We found that articles in the General category are essentially a compilation of articles from the other 6 categories, so we decided to implement the Home page so that if users haven't filtered on any of the 6 topics, we filter on the general topic instead. 

- The Following page displays articles in your country with topics that you are following. 

- The Settings page allows you to change your country and followed topics. When in doubt, press the refresh button :') 


 
Group Members: Annabel Lin (all273), Justin Hsu (jah574)

Github: https://github.com/annabel48lin/news-app

Deployed Link: http://news-stop.herokuapp.com/ 
