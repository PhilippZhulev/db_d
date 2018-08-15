import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsMenu from '../menus/LongMenu';
import Select from '../selects/SimpleSelect';
import store from '../../../reduser';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
};

let menuValue = true;

function changeMenu(value) {
    switch(value) {
        case true : value = false;
        break;
        case false : value = true;
    }

    store.dispatch({
        type: "CHANGE_MENU",
        payload: value
    });

    menuValue = value
}

function DenseAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar className="header" style={{background: props.templ.primary.header}} position="static">
        <Toolbar variant="dense">
          <IconButton onClick={(e) => changeMenu(menuValue)} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" className={"header_title"} color="inherit">
            Драйверы бизнес-плана
          </Typography>
          <Select templ={props.templ}  classes={{select: "super_select", root: "root_select", selectMenu: "i_select"}} groups={props.groups}/>
          <SettingsMenu/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DenseAppBar);
