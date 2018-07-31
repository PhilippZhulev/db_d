import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import DisabledSlider from '@material-ui/lab/Slider';

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
    state = {
        value: this.props.value,
        random: "slider_thumb" + String(Math.random()).split(".")[1]
    };

    handleChange = (event, value) => {
        this.setState({ value });

    };

    constructor(props){
        super(props);
        this.disabled_value = this.props.value;
    }

    render(disabled_value) {
        const { classes } = this.props;
        const { value } = this.state;

        let min = (this.props.min) ? this.props.min : 0;
        let max = (this.props.max) ? this.props.max : 100;

        const defaultValue = this.disabled_value;

        return (
            <div className={classes.root}>
                <Typography className="label_1">{this.props.labelText}</Typography>
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
                        trackBefore: "slider_beffore",
                        trackAfter: "slider_after",
                        thumb: "slider_thumb_disabled",
                        root: "slider_root",
                        activated: "active_slider"
                    }}
                    className={classes.disabled}
                    value={defaultValue}
                    aria-labelledby="label"
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
