import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, {Component} from "react";
import PollCard from "./PollCards";

class Polls extends Component {
  render() {
    return(
        <div>
          <Typography variant="h4" gutterBottom component="h2">
            Polls
          </Typography>
          <Grid container spacing={24}>
            <Grid item md={3}>
              <PollCard />
            </Grid>
            <Grid item md={3}>
              <PollCard />
            </Grid>
            <Grid item md={3}>
              <PollCard />
            </Grid>
          </Grid>
        </div>);
  }
}

export default Polls;
