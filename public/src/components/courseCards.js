import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import {withStyles} from "@material-ui/core/styles";
import ToolTip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import BarChartIcon from "@material-ui/icons/BarChart";
import Faker from "faker";
import PropTypes from "prop-types";
import React from "react";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

function CourseCard(props) {
  let randomImage = Faker.random.image();
  const { classes } = props;
  return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
              className={classes.media}
              image={randomImage}
              title="Random Image"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Course Name
            </Typography>
            <Typography component="p">
              Course Id:
            </Typography>
            <Typography variant={"caption"}>
              Instructor's Name
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <ToolTip title="Polls">
            <IconButton size="small" color="secondary">
              <BarChartIcon />
            </IconButton>
          </ToolTip>
        </CardActions>
      </Card>
  );
}

CourseCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CourseCard);
