import React, { Component } from 'react';
//import store from '../../model';
import Header from '../material/app-bar/DenseAppBar';
import Tabs from '../material/tabs/ScrollableTabsButtonAuto';
import Slider from '../material/slider/SimpleSlider';
import Btn from '../material/buttons/ContainedButtons';
import Home from '../../views/homepage';
import Opex from '../../views/opexpage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
        selectColor: "#2f4050"
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
        selectColor: "#fff"
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
            theme : whiteTheme
        }
    }

    render() {

        store.subscribe(() => {
            if(store.getState().value === true) {
                this.setState({theme: whiteTheme});
            }else {
                this.setState({theme: darkTheme});
            }
        });

        const myTheme = createMuiTheme({
            palette: this.state.theme
        });

        return (
            <MuiThemeProvider theme={myTheme}>
                <div className="app_output" style={{background: this.state.theme.primary.tiles}}>
                    <Header templ={this.state.theme} />
                    <Tabs templ={this.state.theme} settings={{
                        items: ["KPI", "OPEX"],
                        pages: [<Home templ={this.state.theme} />, <Opex templ={this.state.theme} />]
                    }} />
                    <div className="app_menu_output" style={{background: this.state.theme.primary.menu}}>
                        <Slider labelText="Числ-ть опер. функции, чел." min={1} max={5} value={3}/>
                        <Slider labelText="OPEX/CAPEX по IT, %" min={2} max={3} value={2.5}/>
                        <Slider labelText="Доработка legacy, млрд.руб." min={1.5} max={2.5} value={2}/>
                        <Slider labelText="Инвестиции в платф., млрд.руб." min={6.5} max={6.9} value={6.7}/>
                        <Slider labelText="Доля вендоров, %" min={-5} max={-3} value={-4}/>
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