import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import store, {change} from '../../../reduser';

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
        color: "white"
    },
    radio: {color: "white"},
    label: {color: "white", "& span:last-child": {color:"white"}}
});

class RadioButtonsGroup extends React.Component {
    // state = {
    //    CIR: "0",
    //     COR: "0",
    //     CAGR: "0",
    //     NIM: "0"
    // };

    constructor(props){
        super(props);
        this.state = {
            CIR: "32%",
            COR: "1,5%",
            CAGR: "13,0%",
            NIM: "4,5%"
        };
    };

    handleChangeNIM = event => {
        this.setState({ NIM: event.target.value });
        //this.state.NIM = event.target.value;
        console.log("Clicked radio");
        console.log(this.state);
        console.log("value:");
        console.log(event.target.value);
        store.dispatch({
            type: "CHANGE_TABLE_SELECT",
            payload: {CIR: this.state.CIR, COR: this.state.COR, CAGR: this.state.CAGR, NIM: event.target.value}
        });
    };
    handleChangeCIR = event => {
        this.setState({ CIR: event.target.value });
        console.log("Clicked radio");
        console.log(this.state);
        console.log("value:");
        console.log(event.target.value);
        store.dispatch({
            type: "CHANGE_TABLE_SELECT",
            payload: {CIR: event.target.value, COR: this.state.COR, CAGR: this.state.CAGR, NIM: this.state.NIM}
        });
    };
    handleChangeCAGR = event => {
        this.setState({ CAGR: event.target.value });
        console.log("Clicked radio");
        console.log(this.state);
        console.log("value:");
        console.log(event.target.value);
        store.dispatch({
            type: "CHANGE_TABLE_SELECT",
            payload: {CIR: this.state.CIR, COR: this.state.COR, CAGR: event.target.value, NIM: this.state.NIM}
        });
    };
    handleChangeCOR = event => {
        this.setState({ COR: event.target.value });
        console.log("Clicked radio");
        console.log(this.state);
        console.log("value:");
        console.log(event.target.value);
        store.dispatch({
            type: "CHANGE_TABLE_SELECT",
            payload: {CIR: this.state.CIR, COR: event.target.value, CAGR: this.state.CAGR, NIM: this.state.NIM}
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={"group"}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" style={{color: "white"}}>NIM</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        className={classes.group}
                        value={this.state.NIM}
                        onChange={this.handleChangeNIM}
                    >
                        <FormControlLabel className={classes.label} value="4,25%" control={<Radio className={classes.radio}/>} label="4,25%" />
                        <FormControlLabel className={classes.label} value="4,5%" control={<Radio className={classes.radio}/>} label="4,5%" />
                        <FormControlLabel className={classes.label} value="4,75%" control={<Radio className={classes.radio}/>} label="4,75%" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" style={{color: "white"}}>CAGR</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        className={classes.group}
                        value={this.state.CAGR}
                        onChange={this.handleChangeCAGR}
                    >
                        <FormControlLabel className={classes.label} value="12,0%" control={<Radio className={classes.radio}/>} label="12,0%" />
                        <FormControlLabel className={classes.label} value="13,0%" control={<Radio className={classes.radio}/>} label="13,0%" />
                        <FormControlLabel className={classes.label} value="10,2%" control={<Radio className={classes.radio}/>} label="10,2%" />
                        <FormControlLabel className={classes.label} value="16,0%" control={<Radio className={classes.radio}/>} label="16,0%" />
                    </RadioGroup>
                </FormControl>
                </div>
                <div className={"group"}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" style={{color: "white"}}>CIR</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        className={classes.group}
                        value={this.state.CIR}
                        onChange={this.handleChangeCIR}
                    >
                        <FormControlLabel className={classes.label} value="31%" control={<Radio className={classes.radio}/>} label="31%" />
                        <FormControlLabel className={classes.label} value="32%" control={<Radio className={classes.radio}/>} label="32%" />
                        <FormControlLabel className={classes.label} value="33%" control={<Radio className={classes.radio}/>} label="33%" />
                        <FormControlLabel className={classes.label} value="34%" control={<Radio className={classes.radio}/>} label="34%" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" style={{color: "white"}}>COR</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        className={classes.group}
                        value={this.state.COR}
                        onChange={this.handleChangeCOR}
                    >
                        <FormControlLabel className={classes.label} value="1,9%" control={<Radio className={classes.radio}/>} label="1,9%" />
                        <FormControlLabel className={classes.label} value="1,7%" control={<Radio className={classes.radio}/>} label="1,7%" />
                        <FormControlLabel className={classes.label} value="1,5%" control={<Radio className={classes.radio}/>} label="1,5%" />
                        <FormControlLabel className={classes.label} value="1,0%" control={<Radio className={classes.radio}/>} label="1,0%" />
                        <FormControlLabel className={classes.label} value="1,2%" control={<Radio className={classes.radio}/>} label="1,2%" />
                    </RadioGroup>
                </FormControl>
                </div>

            </div>
        );
    }
}

RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);