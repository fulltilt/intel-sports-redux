import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TablePaginationActionsWrapped from "./ui/TablePaginationActionsWrapped";
import Button from "@material-ui/core/Button";

import AddContentDialog from "./ui/AddContentDialog";
import Toastr from "./ui/Toastr";
import * as actions from "../actions";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  button: {
    margin: theme.spacing.unit
  }
});

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14
  }
}))(TableCell);

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      rows: [],
      page: 0,
      rowsPerPage: 5,
      newEventId: "",
      isFeatured: false,
      contentType: "",
      category: "",
      tags: "",
      message: "",
      error: "",
      dialogOpen: false,
      snackbarOpen: false,
      snackbarError: false
    };
  }

  componentDidMount() {
    this.props.fetchEvent(this.state.id);
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChange = evt => {
    let { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false, snackbarError: false });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    console.log("submitContent needs to be implemented in Redux way");
    // submitContent(this.state)
    //   .then(res => {
    //     console.log(res);
    //     this.setState({
    //       message: res.message,
    //       dialogOpen: false,
    //       snackbarOpen: true
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({
    //       message: err,
    //       dialogOpen: false,
    //       snackbarOpen: true,
    //       snackbarError: true
    //     });
    //   });
  };

  render() {
    const { classes, currentEvent } = this.props;
    if (!currentEvent) return null;

    let {
      rowsPerPage,
      page,
      dialogOpen,
      isFeatured,
      snackbarOpen,
      snackbarError
    } = this.state;

    const rows = currentEvent.eventClips;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Tags</CustomTableCell>
                    <CustomTableCell>Category</CustomTableCell>
                    <CustomTableCell>Featured</CustomTableCell>
                    <CustomTableCell>Content Type</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      return (
                        <TableRow hover key={row.metadataId}>
                          <TableCell>
                            {row.tags ? row.tags.join(", ") : ""}
                          </TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell>{row.isFeatured ? "Yes" : "No"}</TableCell>
                          <TableCell>{row.contentType}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={3}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActionsWrapped}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleClickOpen}
            >
              NEW
            </Button>
            <Button variant="contained" className={classes.button}>
              <Link
                to="/"
                style={{ textDecoration: "none" }}
                onClick={() =>
                  this.props.setTitle(this.props.title.split(" ")[0])
                }
              >
                Back
              </Link>
            </Button>
          </Grid>
        </Grid>
        <AddContentDialog
          open={dialogOpen}
          isFeatured={isFeatured}
          handleChange={this.handleChange}
          handleClose={this.handleClose}
          handleSubmit={this.handleSubmit}
        />
        <Toastr
          open={snackbarOpen}
          handleClose={this.handleSnackbarClose}
          error={snackbarError}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    title: state.events.title,
    currentEvent: state.events.currentEvent
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    actions
  )(Event)
);
