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

class SimpleSelect extends React.Component {
  constructor(props) {
      super(props);

      store.subscribe(() => {
          switch (change) {
              case "change_tab" :
                  if(getState.states === 5) {
                      this.setState({seletDisable: true})
                  }else {
                      this.setState({seletDisable: false})
                  }
                  break;
          }
      });
  }

  state = {
    age: '',
    name: 'hai',
    selected: localStorage['dumpDriversTab'] || this.props.groups[0],
    seletDisable: (localStorage["dumpTab"] === 5)
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ selected: this.props.groups[event.target.value] });
    localStorage['thisDriversTab'] = this.props.groups[event.target.value];

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
        <form className={classes.root + " morda_select" + ((this.state.seletDisable === true) ? " disabled" : "")} autoComplete="off">
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
                        this.props.groups.map((item,i) => {
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
