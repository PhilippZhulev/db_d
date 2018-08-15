import React, { Component } from 'react';
import Slider from "../../components/material/slider/SimpleSlider";
import store, {getState, change} from "../../reduser";

let drivers = {},
    groups = [],
    curr_group = "";

class Drivers extends Component {

    constructor(props) {
        super(props);
    }

    addDrivers = (target) => {
        return this.props.data.drivers.map((value, index) => {
            if(value.group === target) {
                console.log(value.id);
                return (
                    <Slider
                        key={value.id}
                        driverId={value.id}
                        driverInd={index}
                        labelText={value.name}
                        min={+(value.min)}
                        max={+(value.max)}
                        value={+(value.value)}
                        step={+(value.step)}
                        baseValue={+(value.baseValue)}
                    />
                )
            } else{
                return (
                    <div key={value.id} />
                )
            }
        })
    };

    route = (val) => {
        curr_group = this.props.groups[val];

        return this.props.groups[val];
    };

    render() {
        return (
            <div className={"slider_wrapper"}>
                {this.addDrivers(this.route(this.props.routerValue))} 
            </div>
        );
    }
}

export default Drivers;
