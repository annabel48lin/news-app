import React from "react";
import Link from "@material-ui/core/Link";
import "./Border.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
  Box,
} from "@material-ui/core";

type Props = {
  readonly headline: string;
  readonly source: string;
  readonly description: string;
  readonly link: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // height: "200px",
    margin: "25px",
    border: "2px solid black",
    borderRadius: "25px",
    boxSizing: "border-box",
    padding: "30px",
    backgroundColor: "azure",
  },
  details: {
    // display: "flex",
    // flexDirection: "column",
    width: "70%",
    float: "left",
    verticalAlign: "top",
    marginTop: "0px",
  },
  content: {
    flex: "1 0 auto",
    padding: "0px",
  },
  cover: {
    display: "flex",
    height: "auto",
    // paddingTop: '5%',
    float: "right",
    width: "30%",
    maxHeight: "50%",
    // alignText: "right",
    // alignItems: "right",
    // alignSelf: "right"
  },
  img: {
    height: "auto",
    width: "100%",
    maxHeight: "75px",
    objectFit: "contain",
    // maxHeight: "100%",
    margin: "0px",
    // display: "block",
    objectPosition: "100% 0%"
  },
}));

const Article = ({ headline, source, description, link }: Props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    // <div className="Border">

    <Card className={classes.root}>
      <Link href={link} target="_blank" color="inherit">
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              <Box fontWeight="fontWeightBold">{headline}</Box>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        </div>

        <div className={classes.cover}>
          
          <img className={classes.img} src={source}></img>
    
        </div>
        {/* <CardMedia className={classes.cover} image={source}  title={source}  /> */}
      </Link>
    </Card>
  );
};

export default Article;
