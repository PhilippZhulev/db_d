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

        let data = this.props.data;

        const func = this.props.func;
        const page = this.props.page;
        const lastCat = data[page][func].length;
        const mainVal = data[page][func][lastCat-1]["model"];
        const smallVal = "("+((+(data[page][func][lastCat-1]["model"])-(+(data[page][func][lastCat-1]["base"])))/(+(data[page][func][lastCat-1]["base"]))*100).toFixed(2)+"%)";
        let mainValAll = "";
        let smallValAll = "";
        if ((page !== "OPEX") && (page !== "ALL")){
            mainValAll = data["ALL"][func][lastCat-1]["model"];
            smallValAll = "("+((+(data["ALL"][func][lastCat-1]["model"])-(+(data["ALL"][func][lastCat-1]["base"])))/(+(data["ALL"][func][lastCat-1]["base"]))*100).toFixed(2)+"%)";
        }

        this.state={
            smallVal:smallVal,
            mainVal: mainVal,
            mainValAll: mainValAll,
            smallValAll: smallValAll,
            data: this.props.data,
            page: this.props.page,
            postfix: (this.props.isSmall) ? "_small" : "",
            func: this.props.func
        };

        this.setState({
                data: this.props.data,
                page: this.props.page,
                postfix: (this.props.isSmall) ? "_small" : "",
                func: this.props.func
        });
    }

    getValues = () => {

        let subscribtion = "1",
            color = "rgba(0,0,0,0)",
            values = [];

        if(!(this.props.page==="ALL" || this.props.page==="OPEX")){
            color = this.props.templ.primary.textValueNormal;
            subscribtion = "Группа";
            values.push(
                <div key={1} className={"tile_item__value"+this.state.postfix+" value_flex"} style={{color: this.props.templ.primary.textValueMain}}>
                    <div>
                        {this.state.mainValAll}
                    </div>
                    <div>
                        <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>{this.props.addSubscr}</span>
                        <span style={{color: this.props.templ.primary.textValueNormal}}>{this.state.smallValAll}</span>
                    </div>
                </div>
            );
            values.push(<div key={2} className={"vLine"+this.state.postfix} />);
        }

        values.push(
            <div key={0} className={"tile_item__value"+this.state.postfix+" value_flex"} style={{color: this.props.templ.primary.textValueMain}}>
                <div>
                    {this.state.mainVal}
                </div>
                <div>
                    <span className="subscribe" style={{color: color}}>{subscribtion}</span>
                    <span style={{color: this.props.templ.primary.textValueNormal}}>{this.state.smallVal}</span>
                </div>
            </div>
        );

        return  values;
    };

    render(){

        const options = {
            grId:
                "line",
                titles:["Стратегия 2020", "Базовая версия", "Моделирование"],
                geometry: {width:"80'\%'", height:"90'\%'"},
                colors: ["#f8ac59","#727CF5","#1ab394"],
                legend: (!this.props.isSmall),
                type: "smoothedLine",
                labelPosition:["bottom", "top"],
                thickness: 2,
                isBig: (!this.props.isSmall)
        };

        return(
            <div className={"tile_item_"+this.props.tileNum}>
                <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                    <div className={"tile_item__title"+this.state.postfix} style={{color: this.props.templ.primary.textValueMain}}>
                        {tilesBind[this.state.func].title}<span style={{color: "#aab3b3"}}>{((tilesBind[this.state.func].mera==="") ? "" : ", ") + tilesBind[this.state.func].mera}</span>
                    </div>

                    <div className="values_wrapper main_tile">
                        {this.getValues()}
                    </div>

                    <MultiLine
                        options={options}
                        templ={this.props.templ}
                        page={this.props.page}
                        grId={this.props.grId}
                        data={this.state.data[this.state.page][this.state.func]}
                    />
                </div>
            </div>
        )
    }
}

export default Tile;
