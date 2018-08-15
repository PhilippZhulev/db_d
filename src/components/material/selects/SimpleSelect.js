import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import store, {getState, change} from "../../../reduser";


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

let groups = [];

store.subscribe(() => {

    if (change === "first_include") {
        let drivers = getState.data.drivers;

        for (let key in drivers) {
            if(drivers.hasOwnProperty(key)) {
                groups.push(key);
            }
        }
    }
});

const items = groups;

class SimpleSelect extends React.Component {
  state = {
    age: '',
    name: 'hai',
    selected: groups[0]
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ selected: items[event.target.value] });

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
                    <MenuItem disabled value="">{this.state.selected}</MenuItem>
                    {
                        items.map((item,i) => {
                            if(this.state.selected !== item) {
                                return <MenuItem key={i} value={i}>{item}</MenuItem>
                            }
                        })
                    }
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
