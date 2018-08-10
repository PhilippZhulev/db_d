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


import Drivers from "../../views/modules/drivers";
import store, {getState, change} from "../../reduser";
//import transliter from '../transliter';

const options = {
    mouseWheel: false,
    scrollbars: false,
    freeScroll: true,
    scrollX: false,
    scrollY: true,
    invertWheelDirection: true,
    momentum: true
};

let whiteTheme = {
    primary: {
        light: '#62727b',
        main: '#2f4050',
        dark: '#293846',
        tiles: "#fff",
        tilesText: "#2f4050",
        menu: "#2f4050",
        header: "#293846",
        textValueMain: "#757575",
        textValueNormal: "#757575",
        graphText: "#b4b4b4",
        selectColor: "#2f4050",
        indicatorColor: "#fff",
        separatorColor: "#757575",
        selected: "#293846"
    },
    secondary: {
        light: '#6effe8',
        main: '#1ab394',
        dark: '#00b686',
    }
};

let darkTheme = {
    primary: {
        light: '#62727b',
        main: '#2f4050',
        dark: '#293846',
        tiles: "#29353e",
        tilesText: "#fff",
        menu: "#1f272d",
        header: "#1f272d",
        textValueMain: "#a1abb8",
        textValueNormal: "#6d7b87",
        graphText: "#6d7b87",
        selectColor: "#fff",
        indicatorColor: "#29353e",
        separatorColor: "#757575",
        selected: "#fff"
    },
    secondary: {
        light: '#6effe8',
        main: '#1ab394',
        dark: '#00b686',
    }
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theme : whiteTheme,
            menu: " active",
            pos: "",
            dummyData: null,
            category: 0
        };

        this.state.dummyData = this.props.data.dummyData;

        this.myTheme = createMuiTheme({
            palette: this.state.theme
        });

        store.subscribe(() => {
            if(change === "template") {
                if(getState.value === true) {
                    this.setState({theme: whiteTheme});
                }else {
                    this.setState({theme: darkTheme});
                }
            }

            if(change === "menu") {
                if(getState.value === true) {
                    this.setState({menu: " active"});
                }else { 
                    this.setState({menu: ""});
                }
            }

            if(change === "slidersPos") {
                if(getState.value === "left") {
                    this.setState({pos: " alternative"});
                }else {
                    this.setState({pos: ""});
                }
            }

            if(change === "drivers_router") {
                this.setState({category: getState.states.value});
            }
        });

        let groups = {},
            drivers = this.props.data.dummyData.drivers,
            data = this.props.data.dummyData.data;


        for (let ind = 0; ind < drivers.length; ind++){

            let group = drivers[ind].group,
                driver = drivers[ind],
                newData = {},
                transGroup = group;

            if(!(group in groups)){
                groups[transGroup]=[];
            }

            for (let key in driver){
                if (key !== "group"){
                    if(driver.hasOwnProperty(key)) {
                        newData[key] = driver[key];
                    }
                }
            }

            groups[transGroup].push(newData);
        }

        store.dispatch({
            type: 'CHANGE_START',
            payload: {data:data, drivers:groups}
        });
    }

    render() {
        return (
            <MuiThemeProvider theme={this.myTheme}>
                <div className={"app_output" + this.state.menu + this.state.pos} style={{background: this.state.theme.primary.tiles}}>
                    <Header templ={this.state.theme} />
                    <span>{this.state.data}</span>
                    <Tabs templ={this.state.theme} settings={{
                        items: ["KPI - Группа", "OPEX - Группа","CIB","КБ","РБ"],
                        pages: [<Home templ={this.state.theme} />, <Opex templ={this.state.theme} />, <Cib templ={this.state.theme}/>, <Kb templ={this.state.theme}/>, <Rb templ={this.state.theme}/>]
                    }} />
                    <div className={"app_menu_output" + this.state.menu + this.state.pos} style={{background: this.state.theme.primary.menu}}>
                        <div style={{height: "82%", margin:"0 -15px", overflowY: "hidden", overflowX: "visible"}}>
                            <ReactIScroll
                                iScroll={iScroll}
                                options={options}
                            >
                                <Drivers routerValue={this.state.category} />


                            </ReactIScroll>
                        </div>
                        <div className="btns__panel">
                            <Btn
                                customClass="btn_save"
                                text="Сохранить"
                            />
                            <Btn
                                customClass="btn_default"
                                text="Сбросить"
                            />
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
