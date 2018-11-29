import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

const AddContentDialog = props => (
  <Dialog
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">Add New Content</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To subscribe to this website, please enter your email address here. We
        will send updates occasionally.
      </DialogContentText>
      <FormControl className={props.classes.formControl}>
        <TextField
          autoFocus
          margin="dense"
          id="category"
          label="Category"
          name="category"
          type="text"
          onChange={props.handleChange}
        />
      </FormControl>
      <br />
      <FormControl className={props.classes.formControl}>
        <InputLabel shrink htmlFor="age-label-placeholder">
          Featured
        </InputLabel>
        <Select
          value={props.isFeatured}
          label="Featured"
          name="isFeatured"
          onChange={props.handleChange}
          // input={<Input name="age" id="age-helper" />}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl className={props.classes.formControl}>
        <TextField
          margin="dense"
          id="type"
          name="contentType"
          label="Content Type"
          type="text"
          onChange={props.handleChange}
        />
      </FormControl>
      <br />
      <FormControl className={props.classes.formControl}>
        <TextField
          margin="dense"
          id="tags"
          name="tags"
          label="Tags"
          type="text"
          onChange={props.handleChange}
        />
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={props.handleSubmit} variant="contained" color="primary">
        SAVE
      </Button>
    </DialogActions>
  </Dialog>
);

export default withStyles(styles)(AddContentDialog);
