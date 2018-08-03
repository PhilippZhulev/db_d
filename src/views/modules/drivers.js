import React, { Component } from 'react';
import Slider from "../../components/material/slider/SimpleSlider";
import driverBank from "../../secret/driver_bank.js";

class Drivers extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        const drivers = ["CHISL_OPER_FUNC", "OPEX_CAPEX_FUNC", "DORAB_LEGACY", "INVEST_V_PLATF", "DOLYA_VEND"];
        let res = drivers.map((value, index)=>{
            return (
                <Slider key={index} driverId={value} labelText={driverBank[value].labelText} min={driverBank[value].min} max={driverBank[value].max} value={driverBank[value].value} step={0.1}/>
            )
    });
        return(
            <div className={"slider_wrapper"}>
                {res}
            </div>
        );

    }
}

export default Drivers;
