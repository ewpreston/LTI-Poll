import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BarChartIcon from "@material-ui/icons/BarChart";
import PollIcon from "@material-ui/icons/CheckBoxOutlined";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CourseIcon from "@material-ui/icons/GroupOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import PropTypes from "prop-types";
import React from "react";
import {HashRouter, Link} from "react-router-dom";

class ListItemLink extends React.Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;

  render() {
    const { icon, primary } = this.props;
    return (
      <li>
        <ListItem button component={this.renderLink}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }
}

ListItemLink.propTypes = {
  icon: PropTypes.node.isRequired,
  primary: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired
};

export const fullListItems = (
  <div>
    <HashRouter>
      <ListItemLink
          to="/home"
          primary="Home"
          icon={<DashboardIcon color={"secondary"}/>}
      />
      <ListItemLink
          to="/polls"
          primary="Polls"
          icon={<PollIcon color={"secondary"}/>}
      />
      <ListItemLink
        to={"/courses"}
        primary={"Courses"}
        icon={<CourseIcon color={"secondary"}/>}
      />
      <ListItemLink
        to={"/reports"}
        primary={"Reports"}
        icon={<BarChartIcon color={"secondary"}/>}
      />
      <Divider/>
      <ListItemLink
          to="/setup"
          primary="LTI Settings"
          icon={<SettingsIcon color={"secondary"} />}
      />
    </HashRouter>
  </div>
);

export const participantList = (
  <div>
    <HashRouter>
      <ListItemLink
          to="/home"
          primary="Home"
          icon={<DashboardIcon color={"secondary"}/>}
      />
      <ListItemLink
          to="/polls"
          primary="Polls"
          icon={<PollIcon color={"secondary"}/>}
      />
      <ListItemLink
          to={"/courses"}
          primary={"Courses"}
          icon={<CourseIcon color={"secondary"}/>}
      />
      <ListItemLink
          to={"/reports"}
          primary={"Reports"}
          icon={<BarChartIcon color={"secondary"}/>}
      />
    </HashRouter>
  </div>
);
