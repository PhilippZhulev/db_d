import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import store from "../../../reduser";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3, background: props.bg}}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    backgroundColor: "transparent",
  },
});


class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: Number(localStorage['dumpTab']) || 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });

    //localStorage['thisTab'] = value;

      store.dispatch({
          type: 'CHANGE_TAB',
          payload: value
      });
      console.log("tab click! "+value);
      if (value === 5){
        store.dispatch({
            type: 'SCROLL_STOP',
            payload: "default"
        });
      } else{
          store.dispatch({
              type: 'SCROLL_START',
              payload: "default"
          });
      }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root + " tabs_container"}>
        <style>
            {
                "button.tabs_item > span:first-child  {border-right: 1px solid " + this.props.templ.primary.separatorColor + "!important}" +
                "button.tabs_item[aria-selected=true] {color: "+ this.props.templ.primary.selected +"!important; font-weight: 600}"
            }
        </style>
        <AppBar className="tabs_bar" position="static" color="default" style={{background: this.props.templ.primary.tiles}} >
          <Tabs
            value={value}
            onChange={this.handleChange}
            textColor="primary"
            classes={{flexContainer: "flex_panel",indicator: classes.indicator}}
            scrollButtons="off"
            indicator="indicator"
          >
              {
                this.props.settings.items.map((item, i) => {
                    return <Tab key={i} className="tabs_item" style={{color: this.props.templ.primary.textValueNormal}} label={item} />
                })
              }
              {/*<Select classes={{select: "super_select", root: "root_select_1"}}/>*/}
          </Tabs>
        </AppBar>
          {
              this.props.settings.pages.map((item, i) => {
                  return value === i && <TabContainer  bg={this.props.templ.primary.tiles}  key={i}  >{item}</TabContainer>
              })
          }
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);
