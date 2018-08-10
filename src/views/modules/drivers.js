import React, { Component } from 'react';
import Slider from "../../components/material/slider/SimpleSlider";
import driverBank from "../../secret/driver_bank.js";
import store, {getState, change} from "../../reduser";

const values = {};

let drivers = {};

let groups = [];

let curr_group = "";

store.subscribe(() => {

    if(change === "first_include") {
        drivers = getState.data.drivers;


        for (let key in drivers){
            groups.push(key);
        }
    }

    if (change === "driver") {

        // for (let key in getState.value){
        //     if(getState.value.hasOwnProperty(key)) {
        //         values[key] = getState.value[key];
        //     }
        // }
        console.log("Before:");
        console.log(drivers);

        drivers[curr_group][getState.value.ind].value = ""+getState.value.val;

        console.log("After:");
        console.log(drivers);

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
        console.log("Target value is:");
        console.log(target);
        return this.state.all_drivers[target].map((value, index) => {

            //values[value] = driverBank[value].value;

            return (
                <Slider
                    key={index} driverId={index}
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
        // switch (val) {
        //     case 1 :
        //         return ["CHISL_OPER_FUNC", "OPEX_CAPEX_FUNC"];
        //     case 2 :
        //         return ["CHISL_OPER_FUNC", "OPEX_CAPEX_FUNC", "DORAB_LEGACY"];
        //     case 3 :
        //         return ["CHISL_OPER_FUNC"];
        //     default :
        //         return ["CHISL_OPER_FUNC", "OPEX_CAPEX_FUNC", "DORAB_LEGACY", "INVEST_V_PLATF", "DOLYA_VEND"];
        // }
        console.log("func route returned:");
        console.log(groups[val]);
        curr_group = groups[val];
        return groups[val];
    };

    render() {
        console.log("router value:");
        console.log(this.props.routerValue);
        return (
            <div className={"slider_wrapper"}>
                {this.addDrivers(this.route(this.props.routerValue))} 
            </div>
        );
    }
}

export default Drivers;
