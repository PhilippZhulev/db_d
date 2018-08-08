import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import store from "../../../reduser";


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    }
});

class SimpleSelect extends React.Component {
  state = {
    age: '',
    name: 'hai',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

    store.dispatch({
      type: 'CHANGE_DRIVER_ROUTER',
      payload: {
          name: event.target.name,
          value: event.target.value
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
        <form className={classes.root + " morda_select"} autoComplete="off">
            <style>
                {"div.i_select {background: " + this.props.templ.primary.header + "!important}"}
            </style>
            <FormControl className={classes.formControl}>
                <Select
                    value={this.state.age}
                    onChange={this.handleChange}
                    displayEmpty
                    classes={this.props.classes}
                    className="sup_select"
                    name="driver_router"

                >
                    <MenuItem value="">ТОП-10</MenuItem>
                    <MenuItem value={2}>Персонал</MenuItem>
                    <MenuItem value={3}>Сервисы</MenuItem>
                    <MenuItem value={4}>IT</MenuItem>
                    <MenuItem value={5}>Прочие</MenuItem>
                    <MenuItem value={6}>Доходы / Риски</MenuItem>
                </Select>
            </FormControl>

        </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSelect);
