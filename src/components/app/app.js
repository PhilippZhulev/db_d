import React, { Component } from 'react';
import store from '../../model';
import Header from '../material/app-bar/DenseAppBar';
import Tabs from '../material/tabs/ScrollableTabsButtonAuto';
import Slider from '../material/slider/SimpleSlider';
import Btn from '../material/buttons/ContainedButtons';
import Home from '../../views/homepage';
import Opex from '../../views/opexpage';
import Cib from '../../views/kpi-cib';
import Kb from '../../views/kpi-kb';
import Rb from '../../views/kpi-rb';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app_output">
                <Header />
                <Tabs settings={{
                    items: ["KPI", "OPEX","CIB","КБ","РБ"],
                    pages: [<Home />, <Opex />,<Cib/>,<Kb/>,<Rb/>] 
                }} />
                <div className="app_menu_output">
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
        );
    }
}

export default App;