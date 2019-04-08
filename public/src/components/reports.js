import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {HashRouter} from "react-router-dom";
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';

class Overview extends Component {
  render() {
    const { classes } = this.props;
    return(
        <div>
          <HashRouter>
            <Typography variant="h4" gutterBottom component="h2">
              Votes
            </Typography>
            <Typography component="div" className={classes}>
              <SimpleLineChart />
            </Typography>
            <Typography variant="h4" gutterBottom component="h2">
              Courses
            </Typography>
            <div className={classes}>
              <SimpleTable />
            </div>
          </HashRouter>
        </div>
    );
  }
}

Overview.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default Overview;
