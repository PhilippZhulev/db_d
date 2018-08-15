import React, { Component } from 'react';
import Slider from "../../components/material/slider/SimpleSlider";
import store, {getState, change} from "../../reduser";

let drivers = {},
    groups = [],
    curr_group = "";

store.subscribe(() => {

    if(change === "first_include") {
        drivers = getState.data.drivers;

        for (let key in drivers){
            if(drivers.hasOwnProperty(key)) {
                groups.push(key);
            }
        }
    }

    if (change === "driver") {

        drivers[curr_group][getState.value.ind].value = "" + getState.value.val;

        store.dispatch({
            type: 'CHANGE_ALL_DRIVERS',
            payload: getState.value
        })
    }
});

class Drivers extends Component {

    constructor(props) {
        super(props);

        this.state = {routerValue: this.props.routerValue, all_drivers:drivers};
    }

    addDrivers = (target) => {

        return this.state.all_drivers[target].map((value, index) => {
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
        })
    };

    route = (val) => {

        curr_group = groups[val];

        return groups[val];
    };

    render() {
        return (
            <div className={"slider_wrapper"}>
                {this.addDrivers(this.route(this.state.routerValue))}
            </div>
        );
    }
}

export default Drivers;
