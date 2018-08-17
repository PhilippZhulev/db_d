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



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theme : (localStorage['templ'] === "on") ? whiteTheme : darkTheme || "on",
            menu: " active",
            pos: localStorage['menuPosApp'] || "",
            category: 0,
            keyBindings: true,
            data: window.obj.dummyData,
            preloader: false,
            groups: Model.getGroups(window.obj.dummyData.drivers),
            scroll: true,
            table: Model.parseTable(window.obj.dummyData.table),
        };

        this.myTheme = createMuiTheme({
            palette: this.state.theme
        });

        console.log("Это логи блеать ===>");
        console.log(this.state.table);

        store.subscribe(() => {
            switch (change) {
                case "template" :
                    if(getState.value === "off") {
                        this.setState({theme: darkTheme});
                    }else {
                        this.setState({theme: whiteTheme});
                    }
                break;

                case "menu" :
                    if(getState.value === "right") {
                        this.setState({menu: " active"});
                    }else {
                        this.setState({menu: ""});
                    }
                break;

                case "slidersPos" :
                    if(getState.value === "left") {
                        localStorage['menuPosApp'] = " alternative";
                        this.setState({pos: " alternative"});
                    }else {
                        localStorage['menuPosApp'] = "";
                        this.setState({pos: ""});
                    }
                break;

                case "driver_result" :
                    this.setState({preloader:  true});
                    window.updateState(["return_driver_to_lumira", String(getState.value.id+","+getState.value.val)], () => {
                        this.setState({data:  window.obj.dummyData, preloader:  false, groups: Model.getGroups(window.obj.dummyData.drivers)});
                    });
                break;

                case "scroll_start" :
                    this.setState({scroll: false});
                break;

                case "scroll_stop" :
                    this.setState({scroll: true});
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

        let load = false;

        if(val === "default_values") {
            return window.updateState([val, val], () => {
                if(load === false) {
                    this.setState({
                        data:  window.obj.dummyData,
                        groups:  Model.getGroups(window.obj.dummyData.drivers),
                        preloader:  false
                    });

                    store.dispatch({
                        type: 'DEFAULT_DRIVER',
                        payload: "default"
                    });

                    load = true;
                }
            }, ev);
        }else if(val === "save_values") {
            return window.updateState([val, val], () => {
                if(load === false) {
                    this.setState({preloader:  false});
                    load = true;
                }
            }, ev);
        }
    };

    render() {
        return (
            <MuiThemeProvider theme={this.myTheme}>
                <div className={"app_output" + this.state.menu + this.state.pos} style={{background: this.state.theme.primary.tiles}}>
                    <Header templ={this.state.theme} data={this.state.data} groups={this.state.groups}/>
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
                            <ReactIScroll iScroll={iScroll} options={{
                                mouseWheel: false,
                                scrollbars: false,
                                freeScroll: true,
                                scrollX: false,
                                scrollY: true,
                                invertWheelDirection: true,
                                momentum: true,
                                click: true,
                                preventDefault: true,
                                disableMouse: this.state.scroll,
                                disablePointer: this.state.scroll,
                                disableTouch: this.state.scroll
                            }}>
                                <Drivers data={this.state.data} routerValue={this.state.category} groups={this.state.groups} />
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
