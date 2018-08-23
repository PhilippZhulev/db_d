import React, { Component } from 'react';
import Slider from "../../components/material/slider/SimpleSlider";
import store from "../../reduser";
import RadioButtonsGroup from "../../components/material/radio/SimpleButtons";

class Drivers extends Component {

    addDrivers = (target) => {
        if(this.props.table === 5) {
            // store.dispatch({
            //     type: 'SCROLL_START',
            //     payload: "default"
            // });
            return (
                <div className="radioPanel">
                    <div className={"radioTitle"} style={{color: "#fff"}}>Матрица эластичности</div>
                    <RadioButtonsGroup />
                </div>
            )
        } else {
            return this.props.data.drivers.map((value, index) => {
                if (value.group === target) {
                    // store.dispatch({
                    //     type: 'SCROLL_STOP',
                    //     payload: "default"
                    // });
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
                } else {
                    // store.dispatch({
                    //     type: 'SCROLL_START',
                    //     payload: "default"
                    // });
                    return (
                        <div key={index}/>
                    )
                }
            })
        }
    };

    route = (val) => {

        store.dispatch({
            type: 'CHANGE_TAB_DRIVERS',
            payload: val
        });

        return localStorage['thisDriversTab'] || this.props.groups[val];
    };

    render() {
        if (this.props.tab === 5){
            console.log("HF<JNFQ!!!!");
            return (

                this.addDrivers(this.route(this.props.routerValue))

            );
        } else {
            return (
                <div className={"slider_wrapper"}>
                    {this.addDrivers(this.route(this.props.routerValue))}
                </div>
            );
        }
    }
}

export default Drivers;
