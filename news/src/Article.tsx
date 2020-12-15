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
  readonly source: string;
  readonly author: string;
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly urlToImage: string;
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
    marginBottom: "0px",
  },
  content: {
    flex: "1 0 auto",
    padding: "0px",
    paddingBottom: "0px",
  },
  cover: {
    display: "flex",
    height: "auto",
    // paddingTop: '5%',
    float: "right",
    width: "30%",
    maxHeight: "50%",
    padding: "0px",
    // alignText: "right",
    // alignItems: "right",
    // alignSelf: "right"
  },
  img: {
    height: "auto",
    width: "100%",
    // maxHeight: "75px",
    objectFit: "contain",
    // maxHeight: "100%",
    margin: "0px",
    // display: "block",
    objectPosition: "100% 0%",
  },
}));

const Article = ({
  source,
  author,
  title,
  description,
  url,
  urlToImage,
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    // <div className="Border">

    <Card className={classes.root}>
      <Link
        href={url}
        target="_blank"
        color="inherit"
        style={{ padding: "0px" }}
      >
        <div className={classes.details} style={{ padding: "0px" }}>
          <CardContent className={classes.content} style={{ padding: "0px" }}>
            <Typography component="h5" variant="h5">
              <Box fontWeight="fontWeightBold">{title}</Box>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {description}
            </Typography>

            <br />
            <Typography
              variant="subtitle2"
              color="textPrimary"
              style={{ display: "flex", padding: "0px" }}
            >
              {source + " "}
              {author == null || author == undefined || author === "" ? " " : " · " + author}
            </Typography>
          </CardContent>
        </div>

        <div className={classes.cover}>
          <img className={classes.img} src={urlToImage} alt={urlToImage}></img>
        </div>
        {/* <CardMedia className={classes.cover} image={source}  title={source}  /> */}
      </Link>
    </Card>
  );
};

export default Article;
