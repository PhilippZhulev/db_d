import React, { Component } from 'react';
import Slider from "../../components/material/slider/SimpleSlider";
import driverBank from "../../secret/driver_bank.js";
import store from "../../reduser";

class Drivers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const drivers = ["CHISL_OPER_FUNC", "OPEX_CAPEX_FUNC", "DORAB_LEGACY", "INVEST_V_PLATF", "DOLYA_VEND"];
        let values = {};
        let res = drivers.map((value, index) => {

            values[value] = driverBank[value].value;
            return (
                <Slider key={index} driverId={value} labelText={driverBank[value].labelText} min={driverBank[value].min}
                        max={driverBank[value].max} value={driverBank[value].value} step={0.1}/>
            )
        });
        store.subscribe(() => {
            const change = store.getState().change,
                getState = store.getState();

            if (change === "driver") {
                for (let key in getState.value){
                    values[key] = getState.value[key];
                }
                store.dispatch({
                    type: 'CHANGE_ALL_DRIVERS',
                    payload: values
                })
            }
        });
            return (
                <div className={"slider_wrapper"}>
                    {res}
                </div>
            );

    }
}

export default Drivers;
