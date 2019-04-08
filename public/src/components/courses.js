import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, {Component} from "react";
import CourseCard from "./CourseCards";

class Courses extends Component {
  render() {
    return (
        <div>
          <Typography variant="h4" gutterBottom component="h2">
            Courses
          </Typography>
          <Grid container spacing={24}>
            <Grid item md={3}>
              <CourseCard />
            </Grid>
            <Grid item md={3}>
              <CourseCard />
            </Grid>
            <Grid item md={3}>
              <CourseCard />
            </Grid>
          </Grid>
        </div>
    );
  }
}

export default Courses;
