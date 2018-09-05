import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import store, {change} from '../../../reduser';
import Checkbox from '@material-ui/core/Checkbox';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
//******************************************************************
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Model from '../../../models/model';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const options = [
    {title:'Панель драйверов слева',val: "checkedA"},
    {title:'Альтернативная цветовая схема',val: "checkedC"},
];


class LongMenu extends React.Component {
  constructor(props) {
      super(props);

      store.subscribe(() => {
          if(change === "change_tab" || change === "change_tab_drivers") {
              if ((localStorage['dumpTab'] !== localStorage['thisTab']) || (localStorage['dumpDriversTab'] !== localStorage['thisDriversTab'])) {
                  this.setState({checkedB: false});
              }else {
                  this.setState({checkedB: true});
              }
          }
      });
  }

  state = {
    checkedA: (localStorage['menuPos'] === "left"),
    checkedB: ((localStorage['dumpTab'] || 0) === (localStorage['thisTab']  || 1)),
    checkedC: (localStorage['templ'] === "on"),
    anchorEl: null,
    temp: localStorage['templ'] || "on",
    sliderPos: localStorage['menuPos'] || "right",
    dialogopen: false,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

    handleDialogOpen = () => {
        this.setState({ dialogopen: true });
    };

    handleDialogClose = () => {
        this.setState({ dialogopen: false});
    };

  chngeList = (a, e, name) => {
      this.setState({ [name]: e.target.checked });

      if(a === 'checkedC') {
          let temp;

          if(this.state.temp === "off") {
              temp = "on"
          }else {
              temp = "off"
          }

          this.setState({ temp: temp });

          if(localStorage['templ'] === "on") {
              localStorage['templ'] = "off";
          }else {
              localStorage['templ'] = "on";
          }

          store.dispatch({
              type: 'CHANGE_TEMPLATE',
              payload: temp
          });
      }

      if(a === 'checkedB') {
            if(localStorage['dumpTab'] !== localStorage['thisTab'] || localStorage['thisDriversTab'] !== localStorage['dumpDriversTab']) {
                localStorage['dumpTab'] = localStorage['thisTab'];
                localStorage['dumpDriversTab'] = localStorage['thisDriversTab'];
            }else {
                localStorage.removeItem('dumpTab');
                localStorage['dumpDriversTab'] = "Персонал";
            }
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
          });

          localStorage['menuPos'] = pos;
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

    const listitem = this.props.bookmark.map((title,index)=>
        <div key={index}>
        <ListItem>
            <ListItemText primary="" secondary={this.props.bookmark[index]} />
        </ListItem>
        <Divider/>
        </div>);
    return (
      <div>
         <IconButton
              aria-label="More"
              aria-owns={anchorEl ? 'long-menu' : null}
              aria-haspopup="true"
              className="settings"
              onTouchStart={this.handleClick}
              color="inherit"
          >
        <SettingsIcon />
        </IconButton>

        <IconButton
          onClick={this.handleDialogOpen}
          className="info"
          color="inherit"
        >
        <InfoIcon />
        </IconButton>
          <Dialog
              open={this.state.dialogopen}
              onClose={this.handleDialogClose}
              aria-labelledby="form-dialog-title"
          >
              <DialogTitle id="form-dialog-title">Журнал изменений</DialogTitle>
              <DialogContent>
                  <List>
                      {listitem}
                  </List>
              </DialogContent>
              <DialogActions>
                  <Button onClick={this.handleDialogClose} color="primary">
                      Ок
                  </Button>
              </DialogActions>
          </Dialog>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {/*<MenuItem>*/}
            {/*<FormControlLabel*/}
                {/*control={*/}
                    {/*<Checkbox checked={this.triggerChange("checkedB")} onChange={(e) => this.chngeList("checkedB", e, "checkedB")} icon={<StarBorder />} checkedIcon={<Star />} value="checkedB" />*/}
                {/*}*/}
                {/*label={"Запомнить расположение"}*/}
            {/*/>*/}
          {/*</MenuItem>*/}
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
