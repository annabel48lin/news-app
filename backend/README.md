# webdev-final-project

Description: a news aggregator 

Backend (part 2): 
    GET /newsToday - ex) http://localhost:57964/newsToday?country=us&categories=business&categories=health
        takes in country (only one), and categories (multiple) and returns the news
    POST /newUserPref - ex) http://localhost:8080/newUserPref
        stores a user's preferences (includes country and categories) in database
    POST /UpdateUserPref/:id - ex) http://localhost:8080/UpdateUserPref/TDCsUKy1oVUnjD5Auao7
        updates a user's preferences 
    GET /UserPref/:id - ex) http://localhost:8080/post/TDCsUKy1oVUnjD5Auao7
        gets preferences for user w/ that id

    jsons should look like: 
    {
    "categories": ["science", "sports"],
    "country": "tw"
    }
 
Group Members: Annabel Lin (all273), Justin Hsu (jah574)

Github: https://github.coecis.cornell.edu/all273/webdev-final-project