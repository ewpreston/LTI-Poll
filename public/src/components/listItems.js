import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PollIcon from '@material-ui/icons/Ballot';
import SettingsIcon from '@material-ui/icons/Settings';
import {
  HashRouter,
  Link
} from "react-router-dom";
import PropTypes from 'prop-types';

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
  to: PropTypes.string.isRequired,
};

export const mainListItems = (
    <div>
      <HashRouter>
        <ListItemLink to="/home" primary="Home" icon={<DashboardIcon />}/>
        <ListItemLink to="/polls" primary="Polls" icon={<PollIcon />}/>
      </HashRouter>
    </div>
);

export const settings = (
    <div>
      <HashRouter>
        <ListItemLink to="/setup" primary="LTI Settings" icon={<SettingsIcon />}/>
      </HashRouter>
    </div>
);
