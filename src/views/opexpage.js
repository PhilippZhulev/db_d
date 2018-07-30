import React, { Component } from 'react';
import MultiLine from '../components/charts/MultyLineCharts';

class Opex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tiles_container">
                <div className="tile_item_1">
                    <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                        <div className="tile_item__title" style={{color: this.props.templ.primary.textValueMain}}>
                            OPEX, млрд. руб
                        </div>
                        <div className="tile_item__value">
                            160,999
                        </div>
                        <div className="tile_item__litle-value">
                            89%
                        </div>
                        <MultiLine
                            options={{
                                grId:"line",
                                titles:["Стратегия 2020", "Базовая версия", "Моделирование"],
                                geometry: {width:"80'\%'", height:"90'\%'"},
                                colors: ["#b4b4b4", "#f8ac59","#1ab394"],
                                legend: true,
                                categories: ["2018", "2019", "2020", "2021"],
                                data: [[840,1160, 1010], [760, 900, 1060, 1091], [820,840,1320,1056]],
                                type: "smoothedLine",
                                labelPosition:["top", "bottom"]
                            }}
                            templ={this.props.templ}
                        />
                    </div>
                </div>
                <div className="tile_item_2">
                    <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                        <div className="tile_item__title_small" style={{color: this.props.templ.primary.textValueMain}}>
                           Персонал
                        </div>
                        <div className="tile_item__value_small" style={{color: this.props.templ.primary.textValueMain}}>
                            34,000
                        </div>
                        <MultiLine
                            options={{
                                grId:"line",
                                geometry: {width:"80'\%'", height:"90'\%'"},
                                titles:["graph 1", "graph 2"],
                                legend: false,
                                categories: ["2018", "2019", "2020", "2021"],
                                data: [[17, 4, 20, 15], [6,7,18,5]],
                                type: "line",
                                labelPosition:["top", "bottom"]
                            }}
                            templ={this.props.templ}
                        />
                    </div>
                </div>
                <div className="tile_item_3">
                    <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                        <div className="tile_item__title_small" style={{color: this.props.templ.primary.textValueMain}}>
                            IT
                        </div>
                        <div className="tile_item__value_small" style={{color: this.props.templ.primary.textValueMain}}>
                            12,600
                        </div>
                        <MultiLine
                            options={{
                                grId:"line",
                                geometry: {width:"80'\%'", height:"90'\%'"},
                                colors: ["#1ab394","#727CF5"],
                                legend: false,
                                titles:["graph 1", "graph 2"],
                                categories: ["2018", "2019", "2020", "2021"],
                                data: [[30, 40, 65, 50], [70,60,30,20]],
                                type: "line",
                                labelPosition:["top", "bottom"]
                            }}
                            templ={this.props.templ}
                        />
                    </div>
                </div>
                <div className="tile_item_4">
                    <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                        <div className="tile_item__title_small" style={{color: this.props.templ.primary.textValueMain}}>
                            Недвижимость
                        </div>
                        <div className="tile_item__value_small" style={{color: this.props.templ.primary.textValueMain}}>
                            77,100
                        </div>
                        <MultiLine
                            options={{
                                grId:"line",
                                geometry: {width:"80'\%'", height:"90'\%'"},
                                colors: ["#1ab394","#727CF5"],
                                legend: false,
                                titles:["graph 1", "graph 2"],
                                categories: ["2018", "2019", "2020", "2021"],
                                data: [[35, 35, 40, 50], [20,40,60,80]],
                                type: "line",
                                labelPosition:["top", "bottom"]
                            }}
                            templ={this.props.templ}
                        />
                    </div>
                </div>
                <div className="tile_item_5">
                    <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                        <div className="tile_item__title_small" style={{color: this.props.templ.primary.textValueMain}}>
                            Бизнес-расходы
                        </div>
                        <div className="tile_item__value_small" style={{color: this.props.templ.primary.textValueMain}}>
                            34,998
                        </div>
                        <MultiLine
                            options={{
                                grId:"line",
                                geometry: {width:"80'\%'", height:"90'\%'"},
                                colors: ["#1ab394","#727CF5"],
                                legend: false,
                                titles:["graph 1", "graph 2"],
                                categories: ["2018", "2019", "2020", "2021"],
                                data: [[110, 90, 70, 65], [30,70,70,80]],
                                type: "line",
                                labelPosition:["top", "bottom"]
                            }}
                            templ={this.props.templ}
                        />
                    </div>
                </div>
                <div className="tile_item_6">
                    <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                        <div className="tile_item__title_small" style={{color: this.props.templ.primary.textValueMain}}>
                            Маркетинг
                        </div>
                        <div className="tile_item__value_small" style={{color: this.props.templ.primary.textValueMain}}>
                            45,760
                        </div>
                        <MultiLine
                            options={{
                                grId:"line",
                                geometry: {width:"80'\%'", height:"90'\%'"},
                                colors: ["#1ab394","#727CF5"],
                                legend: false,
                                titles:["graph 1", "graph 2"],
                                categories: ["2018", "2019", "2020", "2021"],
                                data: [[10, 20, 25, 20], [50,45,45,30]],
                                type: "line",
                                labelPosition:["top", "bottom"]
                            }}
                            templ={this.props.templ}
                        />
                    </div>
                </div>
                <div className="tile_item_7">
                    <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                        <div className="tile_item__title_small" style={{color: this.props.templ.primary.textValueMain}}>
                            Прочие расходы
                        </div>
                        <div className="tile_item__value_small" style={{color: this.props.templ.primary.textValueMain}}>
                            88,000
                        </div>
                        <MultiLine
                            options={{
                                grId:"line",
                                geometry: {width:"80'\%'", height:"90'\%'"},
                                colors: ["#1ab394","#727CF5"],
                                legend: false,
                                titles:["graph 1", "graph 2"],
                                categories: ["2018", "2019", "2020", "2021"],
                                data: [[10, 6, 11, 17], [9,7,12,11]],
                                type: "line",
                                labelPosition:["top", "bottom"]
                            }}
                            templ={this.props.templ}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Opex;
