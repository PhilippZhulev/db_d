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
import TablePage from '../../views/tablepage';
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
            categoryStatic: 0,
            keyBindings: true,
            data: window.obj.dummyData,
            preloader: false,
            groupsType: "category",
            groups: Model.getGroups(window.obj.dummyData.drivers),
            categorys: Model.getCategory(window.obj.dummyData.drivers),
            scroll: false,
            table: Model.parseTable(window.obj.dummyData.table),
            changePage: false,
            tables: localStorage["dumpTab"] || 0
        };

        this.myTheme = createMuiTheme({
            palette: this.state.theme
        });

        console.log("ДАТА ВСЕОТЕЦ:");
        console.log(window.obj.dummyData);

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
                    if(this.state.menu === "") {
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

                        console.log("ДРАЙВЕРКИ");
                        console.log(String(getState.value.id));
                        console.log(getState.value.val);

                        for (let i = 0; i < window.obj.dummyData.drivers.length; i++){
                            if (window.obj.dummyData.drivers[i].id === getState.value.id) {
                                window.obj.dummyData.drivers[i].value = getState.value.val;
                                break
                            }
                        }

                        console.log("НОВЫЙ DATA");
                        console.log(window.obj.dummyData);

                        if(this.state.groupsType !== "groups") {
                            this.setState({data:  window.obj.dummyData, preloader:  false});//, categorys: Model.getCategory(window.obj.dummyData.drivers)});
                        }else {
                            this.setState({data:  window.obj.dummyData, preloader:  false});//, groups: Model.getGroups(window.obj.dummyData.drivers)});
                        }
                    });
                break;

                case "scroll_start" :
                    this.setState({scroll: false});
                break;

                case "scroll_stop" :
                    this.setState({scroll: true});
                break;

                case "drivers_router" :
                    if(getState.states.name !== "driver_router_group") {
                        this.setState({category: getState.states.value, groupsType: "category"});
                    }else {
                        this.setState({categoryStatic: getState.states.value, groupsType: "groups"});
                    }
                break;

                case "change_tab" :
                    this.setState({tables: getState.states});
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
        let bar = null;

        if(this.state.tables === 5){
            bar = (
                <Drivers
                    index={this.state.tables}
                    data={this.state.data}
                    routerValue={this.state.category}
                    staticRouterValue={this.state.categoryStatic}
                    groups={this.state.groups}
                    categorys={this.state.categorys}
                    groupsType={this.state.groupsType}
                    tab={this.state.tables}
                    table={this.state.table}
                />
            );
        } else{
            bar = (
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
                    <Drivers
                        index={this.state.tables}
                        data={this.state.data}
                        routerValue={this.state.category}
                        staticRouterValue={this.state.categoryStatic}
                        groups={this.state.groups}
                        categorys={this.state.categorys}
                        groupsType={this.state.groupsType}
                        tab={this.state.tables}
                    />
                </ReactIScroll>
            );
        }

        return (
            <MuiThemeProvider theme={this.myTheme}>
                <div className={"app_output" + this.state.menu + this.state.pos} style={{background: this.state.theme.primary.tiles}}>
                    <Header templ={this.state.theme} data={this.state.data} groups={this.state.groups}  categorys={this.state.categorys}/>
                    <Tabs
                          templ={this.state.theme}
                          settings={{
                              items: ["KPI - Группа", "OPEX - Группа","CIB","КБ","РБ","Матрица эл-ти"],
                              pages: [
                                  <Home fluxData={this.state.data} templ={this.state.theme} />,
                                  <Opex fluxData={this.state.data} templ={this.state.theme} />,
                                  <Cib fluxData={this.state.data} templ={this.state.theme}/>,
                                  <Kb fluxData={this.state.data} templ={this.state.theme}/>,
                                  <Rb fluxData={this.state.data} templ={this.state.theme}/>,
                                  <TablePage fluxData={this.state.table} templ={this.state.theme} table={this.state.table}/>
                              ]
                          }}
                    />
                        <Preloader bool={this.state.preloader} />
                    <div className={"app_menu_output" + this.state.menu + this.state.pos} style={{background: this.state.theme.primary.menu}}>
                        <div style={{height: "82%", margin:"0 -15px", overflowY: "hidden", overflowX: "visible"}}>
                            {bar}
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
