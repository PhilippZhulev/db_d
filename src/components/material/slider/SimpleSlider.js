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
import Model from '../../../models/model';


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


        const specialDrivers = [2,14,27,28,29,32,36,40,42,44,48,52,53,55,60,71,72,82,83,84,86,87,88,90];
        const specialDriversData = {
            dr2:["55","57","59","61","63","65"],
            dr14:["3 года", "5 лет"],
            dr27:["4.88","4.98","5.08","5.18","5.28"],
            dr28:["13.0","15.0","17.0","19.0","21.0"],
            dr29:["40","45","50","55","60%"],
            dr32:["127","134","141","148","155"],
            dr36:["50","60","70","80"],
            dr40:["0.75 млн.(45%)","1.00 млн.(45%)","1.00 млн.(53%)","1.12 млн.(53%)","1.25 млн.(53%)"],
            dr42:["8.0","8.6","9.2","9.8","10.4"],
            dr44:["без изм.","+0.5","+1.0","+1.5","+2.0"],
            dr48:["0","2","4","6","8"],
            dr52:["1","1.325","1.65","1.975","2.3"],
            dr53:["1кв. 2021г.","2020г."],
            dr55:["0","-1","-2","-3","-4","-5"],
            dr60:["Нет","c 2020","c 2021"],
            dr71:["0","4","8","12","16"],
            dr72:["36","37","38","40","45"],
            dr82:["MUST","Разв.бизнеса","AS IS"],
            dr83:["800","900","1000","1100","1200"],
            dr84:["-10","-5","Базовая версия","5","10"],
            dr86:["70%/33%","60%/33%","50%/27%","(+)50%/33%","50%/40%"],
            dr87:["201","271","341"],
            dr88:["381","461","541"],
            dr90:["0.15","0.20"]
        };

        //const flag = Boolean(this.props.type);

        // вставить значение стратегии для ползунка, когда оно будет в бэке

        //console.log(this.props.driverId);

        if (specialDrivers.indexOf(+(this.props.driverId)) !== -1) {
            // console.log("Драйвер с опцияеми");
            // console.log(this.props.driverId);
            return (
                <div className={classes.root}>

                    {/*<Dialog*/}
                        {/*open={this.state.open}*/}
                        {/*onClose={this.handleClose}*/}
                        {/*aria-labelledby="form-dialog-title"*/}
                    {/*>*/}
                        {/*<DialogTitle id="form-dialog-title">{this.props.labelText}</DialogTitle>*/}
                        {/*<DialogContent>*/}
                            {/*<DialogContentText>{Model.changeDescription(this.props.description)}</DialogContentText>*/}
                            {/*/!*<DialogContentText>Введите значение драйвера от {this.props.min} до {this.props.max}.</DialogContentText>*!/*/}
                            {/*<TextField*/}
                                {/*margin="dense"*/}
                                {/*name="value"*/}
                                {/*label=""*/}
                                {/*type="number"*/}
                                {/*fullWidth*/}
                                {/*inputProps={{min: this.props.min, max: this.props.max, step: this.props.step}}*/}
                                {/*onChange={this.handleFieldChange}*/}
                                {/*error={this.state.inputError}*/}
                            {/*/>*/}
                        {/*</DialogContent>*/}
                        {/*<DialogActions>*/}
                            {/*<Button onClick={this.handleClose} color="primary">*/}
                                {/*Отмена*/}
                            {/*</Button>*/}
                            {/*<Button onClick={this.handleApply} color="primary">*/}
                                {/*Применить*/}
                            {/*</Button>*/}
                        {/*</DialogActions>*/}
                    {/*</Dialog>*/}

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">{this.props.labelText}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>{Model.changeDescription(this.props.description)}</DialogContentText>
                            {/*<DialogContentText>Введите значение драйвера от {this.props.min} до {this.props.max}.</DialogContentText>*/}
                            {/*<TextField*/}
                            {/*margin="dense"*/}
                            {/*name="value"*/}
                            {/*label=""*/}
                            {/*type="number"*/}
                            {/*fullWidth*/}
                            {/*inputProps={{min: this.props.min, max: this.props.max, step: this.props.step}}*/}
                            {/*onChange={this.handleFieldChange}*/}
                            {/*error={this.state.inputError}*/}
                            {/*/>*/}
                        </DialogContent>
                        <DialogActions>
                            {/*<Button onClick={this.handleClose} color="primary">*/}
                            {/*Отмена*/}
                            {/*</Button>*/}
                            {/*<Button onClick={this.handleApply} color="primary">*/}
                            {/*Применить*/}
                            {/*</Button>*/}
                            <Button onClick={this.handleClose} color="primary">
                                Ок
                            </Button>
                        </DialogActions>
                    </Dialog>


                    {/*<Typography onClick={this.handleClickOpen} className="label_1">{this.props.labelText}</Typography>*/}
                    <Typography className="label_1" onClick={this.handleClickOpen}>{this.props.labelText}</Typography>
                    <style>
                        {/*"." + this.state.random + ":before { content: '" + specialDriversData["dr"+this.props.driverId][this.state.value.toFixed(1)-1] + "', margin-"+(value < 0.5) ? "left" : "right"+":"+((value!==0.5)&&(specialDriversData["dr"+this.props.driverId][this.state.value.toFixed(1)-1].length > 5)) ? "5" : "0"+"px}"*/}
                        {"." + this.state.random + ":before { content: '" + specialDriversData["dr"+this.props.driverId][this.state.value.toFixed(1)-1] + "' }"}
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
                            <DialogContentText>{Model.changeDescription(this.props.description)}</DialogContentText>
                            {/*<DialogContentText>Введите значение драйвера от {this.props.min} до {this.props.max}.</DialogContentText>*/}
                            {/*<TextField*/}
                                {/*margin="dense"*/}
                                {/*name="value"*/}
                                {/*label=""*/}
                                {/*type="number"*/}
                                {/*fullWidth*/}
                                {/*inputProps={{min: this.props.min, max: this.props.max, step: this.props.step}}*/}
                                {/*onChange={this.handleFieldChange}*/}
                                {/*error={this.state.inputError}*/}
                            {/*/>*/}
                        </DialogContent>
                        <DialogActions>
                            {/*<Button onClick={this.handleClose} color="primary">*/}
                                {/*Отмена*/}
                            {/*</Button>*/}
                            {/*<Button onClick={this.handleApply} color="primary">*/}
                                {/*Применить*/}
                            {/*</Button>*/}
                            <Button onClick={this.handleClose} color="primary">
                                Ок
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
