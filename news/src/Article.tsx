import React from 'react';
import "./Border.css"

type Props = {
  readonly headline : string
  readonly source : string
  readonly description: string
  readonly link: string
}
const Article = ({headline, source, description, link}: Props) => {
    
    
    return (
        <div className="Border">
          <h1> {headline}</h1>       
            <p> {description} </p>
            <a href={link}>article link</a>
        

        </div>
      

    );
}


export default Article;
