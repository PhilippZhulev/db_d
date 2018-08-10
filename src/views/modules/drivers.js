import React, { Component } from 'react';
import Slider from "../../components/material/slider/SimpleSlider";
import driverBank from "../../secret/driver_bank.js";
import store, {getState, change} from "../../reduser";

const values = {};

store.subscribe(() => {
    console.log(1);
    if(change === "first_include") {
        console.log(getState.data);
    }

    if (change === "driver") {

        for (let key in getState.value){
            if(getState.value.hasOwnProperty(key)) {
                values[key] = getState.value[key];
            }
        }

        store.dispatch({
            type: 'CHANGE_ALL_DRIVERS',
            payload: getState.value
        })
    }
});

class Drivers extends Component {

    constructor(props) {
        super(props);
        this.state = {routerValue: this.props.routerValue, all_drivers:{}};
    }

    addDrivers = (target) => {
        return target.map((value, index) => {

            values[value] = driverBank[value].value;

            return (
                <Slider
                    key={index} driverId={value}
                    labelText={driverBank[value].labelText}
                    min={driverBank[value].min}
                    max={driverBank[value].max}
                    value={driverBank[value].value}
                    step={0.1}
                />
            )
        })
    };

    route = (val) => {
        switch (val) {
            case 1 :
                return ["CHISL_OPER_FUNC", "OPEX_CAPEX_FUNC"];
            case 2 :
                return ["CHISL_OPER_FUNC", "OPEX_CAPEX_FUNC", "DORAB_LEGACY"];
            case 3 :
                return ["CHISL_OPER_FUNC"];
            default :
                return ["CHISL_OPER_FUNC", "OPEX_CAPEX_FUNC", "DORAB_LEGACY", "INVEST_V_PLATF", "DOLYA_VEND"];
        }
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
