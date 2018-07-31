import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import store from '../../../reduser';

const options = [
    {title:'Панель драйверов слева',val: "checkedA"},
    {title:'Альтернативная цветовая схема',val: "checkedC"}
];

const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
  state = {
    checkedA: false,
    checkedB: false,
    checkedC: false,
    anchorEl: null,
    temp: true,
    sliderPos: "right"
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  chngeList = (a, e, name) => {
      this.setState({ [name]: e.target.checked });

      if(a === 'checkedC') {
          let temp;

          if(this.state.temp === false) {
              temp = true;
          }else {
              temp = false;
          }

          this.setState({ temp: temp });

          store.dispatch({
              type: 'CHANGE_TEMPLATE',
              payload: temp
          })
      }

      if(a === 'checkedA') {
          let pos;

          if(this.state.sliderPos === "right") {
              pos = "left";
          }else {
              pos = "right";
          }

          this.setState({ sliderPos: pos });

          store.dispatch({
              type: 'CHANGE_SLIDERS_POS',
              payload: pos
          })
      }
  };

  triggerChange = (item) => {
      if(item === "checkedA") {
          return this.state.checkedA
      }else if(item === "checkedB") {
          return this.state.checkedB
      }else {
          return this.state.checkedC
      }
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          className="settings"
          onClick={this.handleClick}
          color="inherit"
        >
        <SettingsIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map(option => (
            <MenuItem key={option.title} selected={option.title === 'Pyxis'}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.triggerChange(option.val)}
                            onChange={(e) => this.chngeList(option.val, e, option.val)}
                            value={option.val}
                            color="secondary"
                        />
                    }
                    label={option.title}
                />
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default LongMenu;
