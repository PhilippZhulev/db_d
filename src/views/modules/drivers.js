import React, { Component } from 'react';
import Slider from "../../components/material/slider/SimpleSlider";
import store, {change, getState} from "../../reduser";

class Drivers extends Component {

    addDrivers = (target) => {
        if(this.props.table === 5) {
            return (
                <div className="radioPanel">
                    <h3 style={{color: "#fff"}}>Тут огурчики!</h3>
                </div>
            )
        } else {
            return this.props.data.drivers.map((value, index) => {
                if (value.group === target) {
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
        return (
            <div className={"slider_wrapper"}>
                {this.addDrivers(this.route(this.props.routerValue))}
            </div>
        );
    }
}

export default Drivers;
