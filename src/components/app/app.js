import React, { Component } from 'react';
//import store from '../../model';
import Header from '../material/app-bar/DenseAppBar';
import Tabs from '../material/tabs/ScrollableTabsButtonAuto';
import Slider from '../material/slider/SimpleSlider';
import Btn from '../material/buttons/ContainedButtons';
import Home from '../../views/homepage';
import Opex from '../../views/opexpage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Cib from '../../views/kpi-cib';
import Kb from '../../views/kpi-kb';
import Rb from '../../views/kpi-rb';
//import { Provider } from "react-redux";

import store from '../../reduser';

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
}

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
            pos: ""
        }
    }

    render() {

        store.subscribe(() => {
            const change = store.getState().change,
                  getState = store.getState();

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
            console.log(getState.value);
            if(change === "slidersPos") {
                if(getState.value === "left") {
                    this.setState({pos: " alternative"});
                }else {
                    this.setState({pos: ""});
                }
            }
        });

        const myTheme = createMuiTheme({
            palette: this.state.theme
        });

        return (
            <MuiThemeProvider theme={myTheme}>
                <div className={"app_output" + this.state.menu + this.state.pos} style={{background: this.state.theme.primary.tiles}}>
                    <Header templ={this.state.theme} />
                    <Tabs templ={this.state.theme} settings={{
                        items: ["KPI - Группа", "OPEX - Группа","CIB","КБ","РБ"],
                        pages: [<Home templ={this.state.theme} />, <Opex templ={this.state.theme} />, <Cib templ={this.state.theme}/>, <Kb templ={this.state.theme}/>, <Rb templ={this.state.theme}/>]
                    }} />
                    <div className={"app_menu_output" + this.state.menu + this.state.pos} style={{background: this.state.theme.primary.menu}}>
                        <Slider labelText="Числ-ть опер. функции, чел." min={1} max={5} value={2}/>
                        <Slider labelText="OPEX/CAPEX по IT, %" min={2} max={3} value={2.7}/>
                        <Slider labelText="Доработка legacy, млрд.руб." min={1.5} max={2.5} value={1.6}/>
                        <Slider labelText="Инвестиции в платф., млрд.руб." min={6.5} max={6.9} value={6.5}/>
                        <Slider labelText="Доля вендоров, %" min={-5} max={-3} value={-3}/>
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
