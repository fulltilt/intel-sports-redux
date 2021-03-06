import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Events from "./Events";
import Event from "./Event";
import * as actions from "../actions";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

const sidebarRoutes = [
  {
    title: "NBA",
    league: "nba",
    path: "/events/nba"
  },
  {
    title: "NFL",
    league: "nfl",
    path: "/events/nfl"
  }
];

class Home extends Component {
  render() {
    const { classes, title } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                style={{ margin: "0 auto" }}
              >
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
            anchor="left"
          >
            <div className={classes.toolbar} />
            <Divider />
            <List>
              {sidebarRoutes.map((route, index) => {
                return (
                  <ListItem
                    button
                    key={index}
                    component={Link}
                    to={route.path}
                    onClick={() => this.props.setTitle(`${route.title} Events`)}
                  >
                    <ListItemText primary={route.title} />
                  </ListItem>
                );
              })}
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              {sidebarRoutes.map((route, index) => {
                return (
                  // Render more <Route>s with the same paths as
                  // above, but different components this time.
                  <Route
                    key={index}
                    path={route.path}
                    render={props => (
                      <Events {...props} league={route.league} />
                    )}
                  />
                );
              })}
              <Route path="/event/:id" render={props => <Event {...props} />} />
              <Redirect from="*" to="/events/nba" />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return { title: state.events.title };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actions
  )(Home)
);
