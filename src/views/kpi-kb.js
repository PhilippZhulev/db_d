import React, { Component } from 'react';
import Tile from './modules/tile';
import Fade from "@material-ui/core/Fade";

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import store, {getState, change} from "../reduser";

let styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        //margin: theme.spacing.unit * 3,
        color: "white",
        height: "70px",
        width: "250px"
    },
    group_wrapper: {

    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
        color: "white",
        display: "-webkit-box",
        //display: "inline",
        webkitBoxOrient: "vertical"
    },
    radio: {color: "white"},
    label: {color: "white", "& span:last-child": {color:"white"}}
});

class Kb extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.fluxData,
            funcs: ["PI","INC","OPEX","CIR","KOM","COR","CHIS"],
            templ: this.props.templ,
            date: this.props.date
        };
    }

    tiles = () => {
        return this.state.funcs.map((value,index)=>{
            const isSmall = (index !== 0);
            return (
                <Tile
                    addSubscr = "КБ"
                    key = {index}
                    tileNum = {index + 1}
                    page = "CB"
                    isSmall = {isSmall}
                    func={value}
                    templ = {this.props.templ}
                    data = {this.props.fluxData.data}
                    date = {this.state.date}
                />
            )
        });
    };

    handleChangeDate = event => {
        this.setState({ date: event.target.value });
        store.dispatch({
            type: "CHANGE_DATE",
            payload: event.target.value
        });
    };

    buttons = () => {
        const { classes } = this.props;
        const years = ["2019", "2020", "2021"];
        return (
            <div className={classes.root}>
                <div className={classes.group_wrapper}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                            aria-label="Gender"
                            name="gender1"
                            className={classes.group}
                            value={this.state.date}
                            onChange={this.handleChangeDate}
                        >
                            {years.map(
                                (value,index)=>{
                                    return(
                                        <FormControlLabel
                                            className={classes.label}
                                            key={index}
                                            value={String(index)}
                                            control={<Radio className={classes.radio}/>}
                                            label={value}
                                        />
                                    )
                                }
                            )}
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>)
    };

    render() {
        const { classes } = this.props;

        return (
            <Fade in={true} timeout={{enter: 300, exit:300}}>

                <div className="tiles_container" style={{position: "relative"}}>
                    <div className={"buttons_container"} style={{position: "absolute", zIndex: 999, right:"0px", top:"-21px", width:"250px", height:"70px"}}>
                        {this.buttons(this.state)}
                    </div>
                    {this.tiles(this.state)}
                </div>

            </Fade>
        )
    }
}

Kb.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Kb);
