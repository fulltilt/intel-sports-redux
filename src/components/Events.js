import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePaginationActionsWrapped from "./ui/TablePaginationActionsWrapped";
import { getEvents } from "../apis";
import * as actions from "../actions";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14
  }
}))(TableCell);

class Events extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      league: props.league,
      rows: [],
      page: 0,
      rowsPerPage: 20
    };
  }

  componentDidMount() {
    getEvents(this.state.league).then(rows => this.setState({ rows }));
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  rowClicked = (evt, eventId) => {
    this.props.setTitle(`${this.props.title} - ${eventId}`);
    this.context.router.history.push(`/event/${eventId}`);
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Event ID</CustomTableCell>
                <CustomTableCell>League</CustomTableCell>
                <CustomTableCell>Event Type</CustomTableCell>
                <CustomTableCell>Date</CustomTableCell>
                <CustomTableCell>Home</CustomTableCell>
                <CustomTableCell>Away</CustomTableCell>
                <CustomTableCell>Venue</CustomTableCell>
                <CustomTableCell>City</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      hover
                      key={row.eventId}
                      onClick={evt => this.rowClicked(evt, row.eventId)}
                    >
                      <TableCell component="th" scope="row">
                        {row.eventId}
                      </TableCell>
                      <TableCell>{row.league}</TableCell>
                      <TableCell>{row.eventType}</TableCell>
                      <TableCell>
                        {new Date(row.date).toLocaleDateString("en-US")}
                      </TableCell>
                      <TableCell>{row.homeTeam.name}</TableCell>
                      <TableCell>{row.awayTeam.name}</TableCell>
                      <TableCell>{row.venue.name}</TableCell>
                      <TableCell>{row.venue.city}</TableCell>
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
        </div>
      </Paper>
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
  )(Events)
);
