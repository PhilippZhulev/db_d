import React, { Component } from 'react';
import Slider from "../../components/material/slider/SimpleSlider";
import store from "../../reduser";
import RadioButtonsGroup from "../../components/material/radio/SimpleButtons";

class Drivers extends Component {

    addDrivers = (target) => {
        if(this.props.index === 5) {
            return (
                <div className="radioPanel">
                    <div className={"radioTitle"} style={{color: "#fff"}}>Матрица эластичности<br/><br/>Прибыль Группы в 2020 году<span style={{color: "#6d7b87"}}>, млрд. руб</span></div>
                    <RadioButtonsGroup
                        table={this.props.table}
                    />
                </div>
            )
        } else {
            return this.props.data.drivers.map((value, index) => {

                let type = value.category;

                if(this.props.groupsType === "category") {
                    type = value.category
                }else {
                    type = value.group
                }

                if (type === target && target !== "Не присвоено") {
                    //console.log(value.id);
                    return (
                        <Slider
                            key={this.props.index*10000+value.id}
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

    route = (val, staticVal) => {

        let type,
            dataType;

        if(this.props.groupsType === "category") {
            type = this.props.categorys[val];
            dataType = val;
        }else {
            type = this.props.groups[staticVal];
            dataType = staticVal;
        }

        store.dispatch({
            type: 'CHANGE_TAB_DRIVERS',
            payload: dataType
        });

        return type;
    };

    render() {
        if (this.props.tab === 5){
            return (
                this.addDrivers(this.route(this.props.routerValue))
            );
        } else {
            return (
                <div className={"slider_wrapper"}>
                    {this.addDrivers(this.route(this.props.routerValue, this.props.staticRouterValue))}
                </div>
            );
        }
    }
}

export default Drivers;
