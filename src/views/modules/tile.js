import React, { Component } from 'react';
import MultiLine from '../../components/charts/MultyLineCharts';
// import dataBank from '../../secret/data_bank';
import store, {getState, change} from "../../reduser";

let data = {};

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

store.subscribe(() => {

    if (change === "first_include") {
        console.log("from tile:");
        console.log(getState.data);
        data = getState.data.data;
        

    }
});


class Tile extends Component {
    constructor(props) {
        super(props);
        const func = this.props.func;
        const page = this.props.page;
        // const graphQuant = data[page][func][0].length-1;
        // const lastCat = dataBank[func].options.categories.length;
        // const smallVal = ((+(dataBank[func].options.data[graphQuant-1][lastCat-1])-(+(dataBank[func].options.data[graphQuant-2][lastCat-1])))/dataBank[func].options.data[graphQuant-2][lastCat-1]*100).toFixed(2);
        // const smallValStr="("+smallVal+"%)";
        const lastCat = data[page][func].length;
        const mainVal = data[page][func][lastCat-1]["model"];
        console.log("last category value for model is: "+data[page][func][lastCat-1]["base"]);
        const smallVal = "("+((+(data[page][func][lastCat-1]["model"])-(+(data[page][func][lastCat-1]["base"])))/(+(data[page][func][lastCat-1]["base"]))*100).toFixed(2)+"%)";
        let mainValAll = "";
        let smallValAll = "";
        if ((page !== "OPEX") && (page !== "ALL")){
            mainValAll = data["ALL"][func][lastCat-1]["model"];
            smallValAll = "("+((+(data["ALL"][func][lastCat-1]["model"])-(+(data["ALL"][func][lastCat-1]["base"])))/(+(data["ALL"][func][lastCat-1]["base"]))*100).toFixed(2)+"%)";
        }
        this.state={smallVal:smallVal, mainVal:mainVal, mainValAll:mainValAll, smallValAll:smallValAll, data:data};
    }
    render(){
        //const func = this.props.func;
        const page = this.props.page;
        const postfix = (this.props.isSmall) ? "_small" : "";
        let subscribtion = "1";
        let color = "rgba(0,0,0,0)";
        const func = this.props.func;
        let values = [];
        if(!(this.props.page==="ALL"||this.props.page==="OPEX")){
            color = this.props.templ.primary.textValueNormal;
            subscribtion = "Группа";
            values.push(
                <div key={1} className={"tile_item__value"+postfix+" value_flex"} style={{color: this.props.templ.primary.textValueMain}}>
                    <div>
                        {this.state.mainValAll}
                    </div>
                    <div>
                        <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>{this.props.addSubscr}</span>
                        <span style={{color: this.props.templ.primary.textValueNormal}}>{this.state.smallValAll}</span>
                    </div>
                </div>
            );
            values.push(<div key={2} className={"vLine"+postfix} />);
        }
        values.push(
            <div key={0} className={"tile_item__value"+postfix+" value_flex"} style={{color: this.props.templ.primary.textValueMain}}>
                <div>
                    {this.state.mainVal}
                </div>
                <div>
                    <span className="subscribe" style={{color: color}}>{subscribtion}</span>
                    <span style={{color: this.props.templ.primary.textValueNormal}}>{this.state.smallVal}</span>
                </div>
            </div>
        );
        const comma = (tilesBind[func].mera==="") ? "" : ", ";
        const options = {
            grId:"line",
                titles:["Стратегия 2020", "Базовая версия", "Моделирование"],
                geometry: {width:"80'\%'", height:"90'\%'"},
            colors: ["#f8ac59","#727CF5","#1ab394"],//(this.props.isSmall) ? ["#727CF5","#1ab394"] :["#f8ac59","#727CF5","#1ab394"],
                legend: (!this.props.isSmall),
                //categories: ["2018", "2019", "2020", "2021"],
                //data: [[825, 881, 1000], [840, 882, 1021, 1056], [840, 889, 1034, 1078]],
                type: "smoothedLine",
                labelPosition:["bottom", "top"],
                thickness: 2,
                isBig: (!this.props.isSmall)
        };
        return(
            <div className={"tile_item_"+this.props.tileNum}>
                <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                    <div className={"tile_item__title"+postfix} style={{color: this.props.templ.primary.textValueMain}}>
                        {tilesBind[func].title}<span style={{color: "#aab3b3"}}>{comma+tilesBind[func].mera}</span>
                    </div>
                    <div className="values_wrapper main_tile">
                        {values}
                    </div>
                    <MultiLine
                        options={options}
                        templ={this.props.templ}
                        page={this.props.page}
                        grId={this.props.grId}
                        data={this.state.data[page][func]}
                    />
                </div>
            </div>
        )
    }
}

export default Tile;
