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
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import LinkIcon from "@material-ui/icons/Link";
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

function PollCard(props) {
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
            Pool Poll
          </Typography>
          <Typography component="p">
            What kind of pools do people like?
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ToolTip title="Results">
          <IconButton size="small" color="secondary">
            <BarChartIcon />
          </IconButton>
        </ToolTip>
        <ToolTip title="Edit">
          <IconButton size="small" color="secondary">
            <EditIcon />
          </IconButton>
        </ToolTip>
        <ToolTip title="Delete">
          <IconButton size="small" color="secondary">
            <DeleteIcon />
          </IconButton>
        </ToolTip>
        <ToolTip title="LTI Link">
          <IconButton size="small" color="secondary">
            <LinkIcon />
          </IconButton>
        </ToolTip>
      </CardActions>
    </Card>
  );
}

PollCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PollCard);
