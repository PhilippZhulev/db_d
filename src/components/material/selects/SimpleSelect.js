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
    }
});

class SimpleSelect extends React.Component {
  constructor(props) {
      super(props);

      store.subscribe(() => {
          if(change === "change_tab") {
              switch (getState.states) {
                  case 0: this.driverActive("driver_router", this.props.categorys.indexOf(this.state.selected)); this.setState({seletDisable: false}); break;

                  case 1: this.driverActive("driver_router", this.props.categorys.indexOf(this.state.selected)); this.setState({seletDisable: false}); break;

                  case 2: this.driverActive("driver_router_group", 3, 3); this.setState({seletDisable: true}); break;

                  case 3: this.driverActive("driver_router_group", 4, 4); this.setState({seletDisable: true}); break;

                  case 4: this.driverActive("driver_router_group", 2, 2); this.setState({seletDisable: true}); break;

                  case 5: this.setState({seletDisable: true}); break;

                  default: this.setState({seletDisable: true});
              }
          }
      });
  }

  state = {
    age: '',
    name: 'hai',
    type: "category",
    selected: this.props.categorys[0],
    seletDisable: (localStorage["dumpTab"] === 5 || localStorage["dumpTab"] === 0  || localStorage["dumpTab"] === 1)
  };

  driverActive = (name, val, stat) => {

    let value = val;

    if(typeof stat === "undefined") {
        this.setState({[name]: val});
        this.setState({selected: this.props.categorys[val]});
        localStorage['thisDriversTab'] = this.props.categorys[val];
    }else {
        localStorage['thisDriversTab'] = this.props.groups[val];
        value = stat;
    }

    store.dispatch({
        type: 'CHANGE_DRIVER_ROUTER',
        payload: {
            name: name,
            value: value
        }
    });
  };

  handleChange = event => {
    this.driverActive(event.target.name, event.target.value);
  };

  getMenuItem = (item, i) => {
      if(this.state.selected !== item) {
          return <MenuItem key={i} value={i}>{item}</MenuItem>
      }
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
                    classes={{root: "root_select", selectMenu: "i_select"}}
                    className="sup_select"
                    name="driver_router"
                >
                    <MenuItem disabled value="">{this.state.selected}</MenuItem>
                    {this.props.categorys.map((item,i) => this.getMenuItem(item, i))}
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
