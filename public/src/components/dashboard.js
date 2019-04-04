import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import {createMuiTheme, MuiThemeProvider, withStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import {HashRouter, Route} from "react-router-dom";
import AssignGradesView from "./assignGradesView";
import CIMRequestView from "./cimRequestView";
import ContentItemView from "./contentItemView";
import {DeepLinkOptions} from "./deepLinkOptions";
import DeepLinkView from "./deepLinkView";
import LaunchEndpoint from "./home";
import {mainListItems, settings} from "./listItems";
import LtiAdvView from "./ltiAdvView";
import NamesRolesView from "./namesRolesView";
import PollSetup from "./pollSetup";
import Setup from "./setupView";
import SetupView from "./setupView";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    //type: "dark",
    primary: {
      main: "#616161"
    },
    secondary: {
      main: "#90caf9"
    }
  }
});

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  }
});

class Dashboard extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <HashRouter>
            <CssBaseline />
            <AppBar
              position="absolute"
              className={classNames(
                classes.appBar,
                this.state.open && classes.appBarShift
              )}>
              <Toolbar
                disableGutters={!this.state.open}
                className={classes.toolbar}>
                <IconButton
                  color="secondary"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    this.state.open && classes.menuButtonHidden
                  )}>
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="secondary"
                  noWrap
                  className={classes.title}>
                  LTI Polling Tool
                </Typography>
                <IconButton color="secondary">
                  <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !this.state.open && classes.drawerPaperClose
                )
              }}
              open={this.state.open}>
              <div className={classes.toolbarIcon}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>{mainListItems}</List>
              <Divider />
              <List>{settings}</List>
            </Drawer>

            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Route exact path="/" component={LaunchEndpoint} />
              <Route path="/setup" component={Setup} />
              <Route path="/home" component={LaunchEndpoint} />
              <Route path="/content_item" component={ContentItemView} />
              <Route path="/cim_request" component={CIMRequestView} />
              <Route path="/lti_adv_view" component={LtiAdvView} />
              <Route path="/setup_page" component={SetupView} />
              <Route path="/deep_link" component={DeepLinkView} />
              <Route path="/deep_link_options" component={DeepLinkOptions} />
              <Route path="/names_roles_view" component={NamesRolesView} />
              <Route path="/assign_grades_view" component={AssignGradesView} />
              <Route path={"/pollSetup"} component={PollSetup} />
            </main>
          </HashRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
