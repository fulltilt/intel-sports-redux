import React, { Component } from "react";
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

const routes = [
  {
    title: "NBA",
    league: "nba",
    path: "/events/nba",
    main: Events
  },
  {
    title: "NFL",
    league: "nfl",
    path: "/events/nfl",
    main: Events
  }
];

class Home extends Component {
  state = {
    title: ""
  };

  render() {
    const { classes } = this.props;
    const { title } = this.state;
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
                {`${title} Events`}
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
              {routes.map((route, index) => {
                return (
                  <ListItem
                    button
                    key={index}
                    component={Link}
                    to={route.path}
                    onClick={() => this.setState({ title: route.title })}
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
              {routes.map((route, index) => {
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

export default withStyles(styles)(Home);
