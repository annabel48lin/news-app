import React, { useState } from "react";
import Topic  from "./Topic";
import Authenticated from "./Authenticated";
// Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());


const Settings = () => {

    const topicsInit = [
    {
        name: "US",
        following: false
    },
    {
        name: "World",
        following: false
    },
    {
        name: "Politics",
        following: false
    },
    {
        name: "Business",
        following: false
    },
    {
        name: "Tech",
        following: false
    },
    {
        name: "Entertainment",
        following: false
    },
    ]
    const [topics, setTopics] = useState(topicsInit);
    const updateTopics = (name: string) => {
        // find where in topics that the name occurs, and then set fav
        const newArr = topics.map((topic) => topic.name === name ? {name : name, following : !topic.following} : topic)
        setTopics(newArr)
      }

    console.log(topics)

    return (
        
        <div style={{marginLeft: "20px"}}>
            <h1>Sign In </h1>
            <Authenticated>
            <text>(Will implement later after Firebase is set up)</text>
            </Authenticated>
            <h1>Followed Topics: </h1>
            <div style={{marginLeft: "20px"}}>
            {topics.map((topic)=>(
            
            <Topic key = {topic.name} name={topic.name} fav={topic.following} callback={updateTopics}/>
    
            ))}
        </div>
      </div>
      
    )

}
export default Settings;
