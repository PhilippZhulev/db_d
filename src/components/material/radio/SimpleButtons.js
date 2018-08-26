import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import store, {getState, change} from '../../../reduser';

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

    constructor(props){
        super(props);
        this.state = {
            CIR: this.props.table.defaultSel.CIR,
            COR: this.props.table.defaultSel.COR,
            CAGR: this.props.table.defaultSel.CAGR,
            NIM: this.props.table.defaultSel.NIM,
        };
        store.subscribe(() => {
            if(change === "buttons_reassign") {
                this.setState(
                    {
                        CIR: getState.states.CIR,
                        COR: getState.states.COR,
                        CAGR: getState.states.CAGR,
                        NIM: getState.states.NIM,
                    }
                );
            }
        });
    };

    handleChangeNIM = event => {
        this.setState({ NIM: event.target.value });

        store.dispatch({
            type: "CHANGE_TABLE_SELECT",
            payload: {CIR: this.state.CIR, COR: this.state.COR, CAGR: this.state.CAGR, NIM: event.target.value}
        });
    };
    handleChangeCIR = event => {
        this.setState({ CIR: event.target.value });
        store.dispatch({
            type: "CHANGE_TABLE_SELECT",
            payload: {CIR: event.target.value, COR: this.state.COR, CAGR: this.state.CAGR, NIM: this.state.NIM}
        });
    };
    handleChangeCAGR = event => {
        this.setState({ CAGR: event.target.value });
        store.dispatch({
            type: "CHANGE_TABLE_SELECT",
            payload: {CIR: this.state.CIR, COR: this.state.COR, CAGR: event.target.value, NIM: this.state.NIM}
        });
    };
    handleChangeCOR = event => {
        this.setState({ COR: event.target.value });
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
                    <FormLabel component="legend" style={{color: "white",textDecorationLine: "underline"}}>NIM</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        className={classes.group}
                        value={this.state.NIM}
                        onChange={this.handleChangeNIM}
                    >
                        {this.props.table.oldNIM.map(
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
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" style={{color: "white",textDecorationLine: "underline"}}>CAGR</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        className={classes.group}
                        value={this.state.CAGR}
                        onChange={this.handleChangeCAGR}
                    >
                        {this.props.table.oldCAGR.map(
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
                <div className={"group"}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" style={{color: "white",textDecorationLine: "underline"}}>CIR</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        className={classes.group}
                        value={this.state.CIR}
                        onChange={this.handleChangeCIR}
                    >
                        {this.props.table.oldCIR.map(
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
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" style={{color: "white",textDecorationLine: "underline"}}>COR</FormLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name="gender1"
                        className={classes.group}
                        value={this.state.COR}
                        onChange={this.handleChangeCOR}
                    >
                        {this.props.table.oldCOR.map(
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

            </div>
        );
    }
}

RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);