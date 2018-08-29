import React, { Component } from 'react';
import Tile from './modules/tile';
import Fade from "@material-ui/core/Fade";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

let styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
        color: "white",
        height: "166px"
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
        color: "white",
        display: "-webkit-box",
        webkitBoxOrient: "vertical"
    },
    radio: {color: "white"},
    label: {color: "white", "& span:last-child": {color:"white"}}
});

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.fluxData,
            funcs: ["PI","TIER","OPEX","CIR","ROE","COR","CHIS"],
            templ: this.props.templ,
            date: 2
        };
    }

    tiles = () => {
        return this.state.funcs.map((value,index)=>{
            const isSmall = (index !== 0);
            return (
                <Tile
                    key = {index}
                    tileNum = {index + 1}
                    page = "ALL"
                    isSmall = {isSmall}
                    func={value}
                    templ = {this.props.templ}
                    data = {this.props.fluxData.data}
                />
            )
        });
    };

    changeDate = () => {

    };

    buttons = () => {
        const { classes } = this.props;
        const years = ["2019", "2020", "2021"];
        return (
        <div className={classes.root}>
            <div className={"group"}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" style={{color: "white",textDecoration: "underline"}}>Укажите год</FormLabel>
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
                                        value={index}
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
        return (
            <Fade in={true} timeout={{enter: 300, exit:300}}>
                <div className="tiles_container">
                    {this.tiles(this.state)}
                </div>
            </Fade>
        )
    }
}

export default Home;
