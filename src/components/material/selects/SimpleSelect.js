import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
                    name="age"
                >
                    <MenuItem value="">Персонал</MenuItem>
                    <MenuItem value={2}>Сервисы</MenuItem>
                    <MenuItem value={3}>IT</MenuItem>
                    <MenuItem value={4}>Прочие</MenuItem>
                    <MenuItem value={5}>OPEX</MenuItem>
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
