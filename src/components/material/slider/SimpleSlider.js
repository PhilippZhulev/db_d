import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import DisabledSlider from '@material-ui/lab/Slider';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import store from '../../../reduser';

const styles = {
    root: {
        width: "auto",
        position: "relative"
    },
    disabled: {
        position: "absolute",
        top: "42%",
        "& div": {
            "& div": {
                visibility: "hidden"
            },
            "& button": {
                zIndex: 1
            }
        }
    },
    enabled: {
        "& div": {
            "& button": {
                zIndex: 2
            }
        }
    },
    default_dot: {
        position: "absolute",
        top: "73%",
        zIndex: 1,
        backgroundColor: "#b4b4b4",
        width: 2,
        height: 7,
    },
    strat_dot: {
        position: "absolute",
        top: "73%",
        zIndex: 1,
        backgroundColor: "#f8ac59",
        width: 2,
        height: 7,
    }
};

class SimpleSlider extends React.Component {
    constructor(props) {
        super(props);
        this.disabled_value = this.props.value;
        let min = (this.props.min) ? this.props.min : 0;
        let max = (this.props.max) ? this.props.max : 100;
        this.dot_left = ((this.disabled_value - min)/(max-min)*100-0.3)+"%";
        this.strat_left = (Math.random()*100-0.3)+"%";
    }

    state = {
        value: this.props.value,
        open: false,//от диалога
        random: "slider_thumb" + String(Math.random()).split(".")[1],
        inputError: false,
        inputValue: ""
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = (value) => {
        this.setState({ open: false, inputValue: "", inputError: false });
    };

    handleDragEnd = () =>{
        const obj_1 = {};

        obj_1[this.props.driverId]= this.state.value;
        store.dispatch({
            type: 'CHANGE_DRIVER',
            payload: obj_1
        })
    };

    handleFieldChange = (event) =>{
        let value = event.target.value;

        if (value==="-"){
            this.setState({inputError: false,inputValue:value});
        } else if (value===""){
            this.setState({inputError: false,inputValue:value});
        }else if (+(value) < this.props.min || +(value) > this.props.max || (Math.abs(+(value) % this.props.step - this.props.step) > 0.000000001)){
            console.log("bad value");
            this.setState({ inputValue:value,inputError: true });
        } else{
            this.setState({inputError: false,inputValue:value});
        }
        console.log((Math.abs(+(value) % this.props.step - this.props.step)));
    };

    handleApply = (value) =>{
        if (!this.state.inputError) {
            let val = this.state.inputValue;
            this.setState({value: +(val)});
        }
        console.log(this.state);
        this.handleClose(value);
    };

    render() {

        const { classes } = this.props;
        const { value } = this.state;

        let min = (this.props.min) ? this.props.min : 0;
        let max = (this.props.max) ? this.props.max : 100;

        return (
            <div className={classes.root}>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{this.props.labelText}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Введите значение драйвера от {min} до {max}.</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="value"
                            label=""
                            type="number"
                            fullWidth
                            inputProps={{ min: min, max: max, step: "0.1"}}
                            onChange={this.handleFieldChange}
                            error={this.state.inputError}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={this.handleApply} color="primary">
                            Применить
                        </Button>
                    </DialogActions>
                </Dialog>


                <Typography onClick={this.handleClickOpen} className="label_1">{this.props.labelText}</Typography>
                <style>
                    {"." + this.state.random + ":before { content: '"+ this.state.value.toFixed(1) +"'}"}
                </style>
                <Slider
                    classes={{
                        trackBefore: "slider_beffore",
                        trackAfter: "slider_after",
                        thumb: "slider_thumb " + this.state.random,
                        root: "slider_root",
                        activated: "active_slider"
                    }}
                    className={classes.enabled}
                    value={value}
                    aria-labelledby="label"
                    min={min}
                    max={max}
                    onChange={this.handleChange}
                    onDragEnd={this.handleDragEnd}
                    step={this.props.step}
                />

                <div className={classes.default_dot} style={{left: this.dot_left}}/>
                <div className={classes.strat_dot} style={{left: this.strat_left}}/>


                <div className={"slider_min"}>{min}</div>
                <div className={"slider_max"}>{max}</div>
            </div>
        );
    }
}

SimpleSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);
