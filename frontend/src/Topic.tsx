import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';



type Props = {
  readonly name: string;
  readonly fav: boolean;
  readonly callback: any
};

const Topic = ({name, fav, callback}: Props) => {

  return (
    <div style={{display:"inline", width: "auto", height: "auto", margin: "0px 10px"}}>
      <Button variant="contained" color={fav? "primary" : "default"} onClick = {() => {callback(name)}}>
        {name}
  </Button>
    </div>

  )
}
export default Topic;