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
    height: 0,
    paddingTop: '5%',
    float: "right",
    width: "30%"  
  },
  // img: {
  //   // height: "auto",
  //   objectFit: "contain",
  //   // maxHeight: "100%", 
  //   marginLeft: "auto", 
  //   marginRight: "auto",
  //   display: "block",
  // }
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
              <Box fontWeight="fontWeightBold" >
                {headline}
              </Box>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        </div>

        <CardMedia className={classes.cover} image={source}  title={source}  />
      </Link>
    </Card>
  );
};

export default Article;
