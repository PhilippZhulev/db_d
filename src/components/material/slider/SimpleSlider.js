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
    }
};

class SimpleSlider extends React.Component {
    constructor(props){
        super(props);
        this.disabled_value = this.props.value;
    }

    state = {
        value: this.props.value,
        open: false,//от диалога
        random: "slider_thumb" + String(Math.random()).split(".")[1]
    };

    handleChange = (event, value) => {
        this.setState({ value });

    };


    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = (value) => {
        this.setState({ open: false });
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
                        <DialogContentText>
                            Введите значение драйвера от {min} до {max}.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="value"
                            label=""
                            type="number"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
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
                />
            <Slider
                    classes={{
                        thumb: "slider_thumb_disabled",
                        root: "slider_root",
                    }}
                    className={classes.disabled}
                    value={this.disabled_value}
                    min={min}
                    max={max}
                    disabled
                />
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
