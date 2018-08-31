import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import store, {change} from '../../../reduser';


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
        top: "53%",
        zIndex: 1,
        backgroundColor: "#1ab394",
        width: 2,
        height: 7,
    },
    strat_dot: {
        position: "absolute",
        top: "53%",
        zIndex: 1,
        backgroundColor: "#727CF5",//f8ac59
        width: 2,
        height: 7,
    }
};

class SimpleSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            open: false,
            random: "slider_thumb" + String(Math.random()).split(".")[1],
            inputError: false,
            inputValue: ""
        };

        store.subscribe(() => {
            if(change === "default_drivers") {
                this.handleChange({}, this.props.baseValue)
            }
        });
    }

    reposition = (val) => {
        const min = (this.props.min) ? this.props.min : 0,
              max = (this.props.max) ? this.props.max : 100,
              magic_margin = 0.3; // подобранный коэффициент для центрирования "риски"

        let correctVal = val;

        if (val < min){
            correctVal = min;
        }

        if (val > max){
            correctVal = max;
        }

        return String(((correctVal - min) / (max - min) * 100 - magic_margin)+"%")
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false, inputValue: "", inputError: false });
    };

    handleDragStart = () =>{
        store.dispatch({
            type: 'SCROLL_STOP',
            payload: "default"
        });
    };

    handleDragEnd = () =>{
        const obj_1 = {};
        obj_1.ind = this.props.driverInd;
        obj_1.id = this.props.driverId;
        obj_1.val = this.state.value;
        store.dispatch({
            type: 'SCROLL_START',
            payload: "default"
        });
        store.dispatch({
            type: 'CHANGE_DRIVER',
            payload: obj_1
        });
        store.dispatch({
            type: 'CHANGE_DRIVER_RESULT',
            payload: {
                id: obj_1.id,
                val: obj_1.val
            }
        });
    };

    handleFieldChange = (event) =>{
        let value = event.target.value;

        if ((String(value)!=="") && ((+(value) < this.props.min) || (+(value) > this.props.max) || (!(Math.abs(+(value) % this.props.step) < 0.000000001)))){
            this.setState({ inputValue:value, inputError: true });
        } else{
            this.setState({inputError: false, inputValue: value});
        }
    };

    handleApply = (value) =>{
        if (!this.state.inputError) {
            let val = this.state.inputValue;
            this.setState({value: +(val)});
        }
        this.handleClose(value);
    };

    render() {

        const { classes } = this.props;
        const { value } = this.state;

         const flag = ((+(this.props.min) === 1) && (+(this.props.max) === 2) && (+(this.props.step) === 1));

         //const specialDrivers = [2,14,27,52,53,60,82,83];
        const specialDrivers = [2,14,27,52,53,60,82,83,31,32,33,36,40,42,44,48,51,71,72,84,85];
         // const specialDriversData = {
         //     dr2:["55","57","59","61","63","65"],
         //     dr14:["3 года", "5 лет"],
         //     dr27:["4.75%","4.85%","5.14%","5.2%","5.25%"],
         //     dr52:["Базовый", "1.325","1.65","1.975","2."],
         //     dr53:["Своевременно","Задержка 1 год"],
         //     dr60:["Нет", "Вывод с 2020", "Вывод с 2021"],
         //     dr82:["MUST","Желательный","AS IS","Прочие +"],
         //     dr83:["500","750","1000","1250","1500"]
         // };

        const specialDriversData = {
            dr2:["55","57","59","61","63","65"],
            dr14:["3 года", "5 лет"],
            dr27:["4.75%","4.85%","5.14%","5.2%","5.25%"],
            dr52:["Базовый", "1.325","1.65","1.975","2."],
            dr53:["Своевр-но","Задерж. 1 г."],
            dr60:["Нет","c 2020","c 2021"],
            dr82:["MUST","Желательный","AS IS","Прочие +"],
            dr83:["500","750","1000","1250","1500"],
            dr31:["55.4%","55.5%","55.6%(баз)","55.7%","55.8%"],
            dr32:["127(-10%)","134(-5%)","141(баз)","148(+5%)","155(+10%)"],
            dr33:["49(-10%)","51(-5%)","54(баз)","57(+5%)","60(+10%)"],
            dr36:["45%","55%","60% (без изм.)","65%","70%"],
            dr40:["100%","107%","113% (без изм.)","119%","130%"],
            dr42:["8.0%","8.6%","9.2% (без изм.)","9.8%","10.4%"],
            dr44:["без изм.","+0.5%","+1.0%","+1.5%","+2.0%"],
            dr48:["0%","2%","4%","6%","8%"],
            dr51:["7.83%","8.3%","8.8%","9.3%","10%"],
            dr71:["0%","4%","8% (без изм.)","12%","16%"],
            dr72:["36%","37%","38% (без изм.)","40%","45%"],
            dr84:["-10%","-5%","Базовая версия","5%","10%"],
            dr85:["-10%","-5%","Базовая версия","5%","10%"]
        };

        //const flag = Boolean(this.props.type);

        // вставить значение стратегии для ползунка, когда оно будет в бэке

        console.log(this.props.driverId);

        if (specialDrivers.indexOf(+(this.props.driverId)) !== -1) {
            console.log("О нет, этот драйвер с особенностями!");
            console.log(this.props.driverId);
            return (
                <div className={classes.root}>

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">{this.props.labelText}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>{this.props.description}</DialogContentText>
                            {/*<DialogContentText>Введите значение драйвера от {this.props.min} до {this.props.max}.</DialogContentText>*/}
                            <TextField
                                margin="dense"
                                name="value"
                                label=""
                                type="number"
                                fullWidth
                                inputProps={{min: this.props.min, max: this.props.max, step: this.props.step}}
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


                    {/*<Typography onClick={this.handleClickOpen} className="label_1">{this.props.labelText}</Typography>*/}
                    <Typography className="label_1">{this.props.labelText}</Typography>
                    <style>
                        {"." + this.state.random + ":before { content: '" + specialDriversData["dr"+this.props.driverId][this.state.value.toFixed(1)-1] + "'}"}
                    </style>
                    <div className={"dot_wrapper"} style={{position: "relative"}}>
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
                            disabled={this.props.load !== false}
                            aria-labelledby="label"
                            min={this.props.min}
                            max={this.props.max}
                            onChange={this.handleChange}
                            onDragEnd={this.handleDragEnd}
                            onDragStart={this.handleDragStart}
                            step={this.props.step}
                        />

                        <div className={classes.default_dot} style={{left: this.reposition(this.props.baseValue)}}/>
                        {/*<div className={classes.strat_dot} style={{left: this.reposition(this.props.max)}}/>*/}


                        <div className={"slider_min"}>{specialDriversData["dr"+this.props.driverId][+(this.props.min)-1]}</div>
                        <div className={"slider_max"}>{specialDriversData["dr"+this.props.driverId][+(this.props.max)-1]}</div>
                    </div>
                </div>
            );
        } else{
            return (
                <div className={classes.root}>

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">{this.props.labelText}</DialogTitle>
                        <DialogContent>
                            {/*<DialogContentText>{this.props.description}</DialogContentText>*/}
                            <DialogContentText>Введите значение драйвера от {this.props.min} до {this.props.max}.</DialogContentText>
                            <TextField
                                margin="dense"
                                name="value"
                                label=""
                                type="number"
                                fullWidth
                                inputProps={{min: this.props.min, max: this.props.max, step: this.props.step}}
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
                        {(flag) ? "" : "." + this.state.random + ":before { content: '" + this.state.value.toFixed(1) + "'}"}
                    </style>
                    <div className={"dot_wrapper"} style={{position: "relative"}}>
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
                            disabled={this.props.load !== false}
                            aria-labelledby="label"
                            min={this.props.min}
                            max={this.props.max}
                            onChange={this.handleChange}
                            onDragEnd={this.handleDragEnd}
                            onDragStart={this.handleDragStart}
                            step={this.props.step}
                        />

                        <div className={classes.default_dot} style={{left: this.reposition(this.props.baseValue)}}/>
                        {/*<div className={classes.strat_dot} style={{left: this.reposition(this.props.max)}}/>*/}


                        <div className={"slider_min"}>{(flag) ? "нет" : this.props.min}</div>
                        <div className={"slider_max"}>{(flag) ? "да" : this.props.max}</div>
                    </div>
                </div>
            );
        }
    }
}

SimpleSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);
