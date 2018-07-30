import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import store from '../../../reduser';

const options = [
  'Панель драйверов слева',
  'Вертикальная tab-panel',
  'Альтернативная цветовая схема'
];

const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
  state = {
    anchorEl: null,
    temp: true
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  themeChange = (a) => {
      if(a === 'Альтернативная цветовая схема') {
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
            <MenuItem key={option} selected={option === 'Pyxis'}>
                <FormControlLabel
                    control={
                        <Switch
                            onChange={(e) => this.themeChange(option)}
                            value="checkedB"
                            color="secondary"
                        />
                    }
                    label={option}
                />
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default LongMenu;
