import React, { Component } from 'react';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe";
import Header from '../material/app-bar/DenseAppBar';
import Tabs from '../material/tabs/ScrollableTabsButtonAuto';
import Btn from '../material/buttons/ContainedButtons';
import Home from '../../views/homepage';
import Opex from '../../views/opexpage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Cib from '../../views/kpi-cib';
import Kb from '../../views/kpi-kb';
import Rb from '../../views/kpi-rb';
import Model from '../../models/model.js';
import {whiteTheme, darkTheme} from '../../template.js';

import Drivers from "../../views/modules/drivers";
import store, {getState, change} from "../../reduser";
import Preloader from "../preloader";

const options = {
    mouseWheel: false,
    scrollbars: false,
    freeScroll: true,
    scrollX: false,
    scrollY: true,
    invertWheelDirection: true,
    momentum: true,
    click: true,
    preventDefault: true
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theme : darkTheme,
            menu: " active",
            pos: "",
            category: 0,
            keyBindings: true,
            data: window.obj.dummyData,
            preloader: false
        };

        this.myTheme = createMuiTheme({
            palette: this.state.theme
        });


        store.subscribe(() => {
            switch (change) {
                case "template" :
                    if(getState.value === true) {
                        this.setState({theme: darkTheme});
                    }else {
                        this.setState({theme: whiteTheme});
                    }
                break;

                case "menu" :
                    if(getState.value === true) {
                        this.setState({menu: " active"});
                    }else {
                        this.setState({menu: ""});
                    }
                break;

                case "slidersPos" :
                    if(getState.value === "left") {
                        this.setState({pos: " alternative"});
                    }else {
                        this.setState({pos: ""});
                    }
                break;

                case "driver_result" :
                    this.setState({preloader:  true});
                    window.updateState(["return_driver_to_lumira", String(getState.value.id+","+getState.value.val)], () => {
                        this.setState({data:  window.obj.dummyData, preloader:  false});
                    });
                break;

                case "drivers_router" :
                    this.setState({category: getState.states.value});
                break;

                default :
                    return null;
            }
        });

        let groups = Model.main(this.state.data.drivers);

        store.dispatch({
            type: 'CHANGE_START',
            payload: {data : this.state.data, drivers : groups}
        });
    };

    onControlBtnChange = (val, ev) => {

        this.setState({preloader:  true});

        if(val === "default_values") {
            window.updateState([val, val], () => {
                this.setState({data:  window.obj.dummyData, preloader:  false});
            }, ev);
        }else if(val === "save_values") {
            window.updateState([val, val], () => {
                this.setState({preloader:  false});
            }, ev);
        }
    };

    render() {
        return (
            <MuiThemeProvider theme={this.myTheme}>
                <div className={"app_output" + this.state.menu + this.state.pos} style={{background: this.state.theme.primary.tiles}}>
                    <Header templ={this.state.theme} />
                    <Tabs
                          templ={this.state.theme}
                          settings={{
                              items: ["KPI - Группа", "OPEX - Группа","CIB","КБ","РБ"],
                              pages: [
                                  <Home fluxData={this.state.data} templ={this.state.theme} />,
                                  <Opex fluxData={this.state.data} templ={this.state.theme} />,
                                  <Cib fluxData={this.state.data} templ={this.state.theme}/>,
                                  <Kb fluxData={this.state.data} templ={this.state.theme}/>,
                                  <Rb fluxData={this.state.data} templ={this.state.theme}/>
                              ]
                          }}
                    />
                    <Preloader bool={this.state.preloader} />
                    <div className={"app_menu_output" + this.state.menu + this.state.pos} style={{background: this.state.theme.primary.menu}}>
                        <div style={{height: "82%", margin:"0 -15px", overflowY: "hidden", overflowX: "visible"}}>
                            <ReactIScroll iScroll={iScroll} options={options}>
                                <Drivers data={this.state.data} routerValue={this.state.category} />
                            </ReactIScroll>
                        </div>
                        <div className="btns__panel">
                            <Btn
                                customClass="btn_save"
                                text="Сохранить"
                                onClick={() => {this.onControlBtnChange("save_values", "tech2")}}
                            />
                            <Btn
                                customClass="btn_default"
                                text="Сбросить"
                                onClick={() => {this.onControlBtnChange("default_values","tech3")}}
                            />
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
