import React, { Component } from 'react';
import MultiLine from '../../components/charts/MultyLineCharts';

const tilesBind = {
    PI: {
        title: "Чистая прибыль",
        mera: "млрд. руб.",
    },
    INC:{
        title: "Чистые опер. доходы",
        mera: "млрд. руб.",
    },
    OPEX:{
        title: "OPEX",
        mera: "млрд. руб.",
    },
    CIR:{
        title: "CIR",
        mera: "%",
    },
    KOM:{
        title: "Комиссии / OPEX",
        mera: "%",
    },
    COR:{
        title: "COR",
        mera: "%",
    },
    CHIS:{
        title: "Численность ПАО",
        mera: "тыс.чел.",
    },
    OPEX_op:{
        title: "OPEX",
        mera: "млрд. руб.",
    },
    PERS_op:{
        title: "Персонал",
        mera: "",
    },
    IT_op:{
        title: "IT",
        mera: "",
    },
    NEDV_op:{
        title: "Недвижимость",
        mera: "",
    },
    BIS_op:{
        title: "Бизнес-расходы",
        mera: "",
    },
    MAR_op:{
        title: "Маркетинг",
        mera: "",
    },
    PROC_op:{
        title: "Прочие расходы",
        mera: "",
    }
};

class Tile extends Component {
    constructor(props) {
        super(props);

        this.options = {
            grId:"line",
            titles:["Стратегия 2020", "Базовая версия", "Моделирование"],
            geometry: {width:"80%", height:"90%"},
            colors: ["#f8ac59","#727CF5","#1ab394"],
            legend: (!this.props.isSmall),
            type: "smoothedLine",
            labelPosition:["bottom", "top"],
            thickness: 2,
            isBig: (!this.props.isSmall)
        };

        this.func = this.props.func;
        this.page = this.props.page;
    }
    render(){
        return(
            <div className={"tile_item_"+this.props.tileNum}>
                <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                    <h2>{this.props.data.ALL.PI[1].model}</h2>
                    <MultiLine
                        options={this.options}
                        templ={this.props.templ}
                        page={this.props.page}
                        grId={this.props.grId}
                        data={this.props.data[this.page][this.func]}
                    />
                </div>
            </div>
        )
    }
}

export default Tile;
