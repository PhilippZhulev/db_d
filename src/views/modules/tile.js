import React, { Component } from 'react';
import MultiLine from '../../components/charts/MultyLineCharts';
import Model from '../../models/model.js';

const tilesBind = Model.tilesBind();

class Tile extends Component {

    prec = 0;

    setValue = (postfix, subscribtion, color) => {
        // let values = [],
        //     tileCalc = Model.tileCalc(this.props.func, this.props.page, this.props.data, this.props.date, tilesBind[this.props.func].mera);
        //
        // let zeroedVal = null;
        // let zeroedSmallVal = null;
        //
        // if ((this.props.func === "EPS") || (this.props.func === "COR")) {
        //     zeroedVal = tileCalc.mainVal.split(".");
        //     if ((zeroedVal.length > 1) && (zeroedVal[1].length < 2)) {
        //         zeroedVal[1] = zeroedVal[1] + "0";
        //         zeroedVal = zeroedVal.join(".");
        //     } else if (zeroedVal.length === 1) {
        //         zeroedVal = [tileCalc.mainVal, "00"].join(".");
        //     } else if ((zeroedVal.length > 1) && (zeroedVal[1].length > 2)) {
        //         zeroedVal[1] = zeroedVal[1].substr(0, 2);
        //         zeroedVal = zeroedVal.join(".");
        //     } else{
        //         zeroedVal = null;
        //     }
        // } else if(((this.props.func === "OPEX")&&(this.props.page === "ALL"))||((this.props.func === "CHIS")&&(this.props.page === "ALL"))){
        //     let zeroedVal = null;
        // } else{
        //     zeroedVal = tileCalc.mainVal.split(".");
        //     if (zeroedVal.length === 1){
        //         zeroedVal = [tileCalc.mainVal,"0"].join(".");
        //     } else{
        //         zeroedVal = tileCalc.mainVal;
        //     }
        // }
        let values = [];
        let prec = 1;
        if ((this.props.func === "EPS") || (this.props.func === "COR")) {
            prec = 2;
        } else if(((this.props.func === "OPEX")&&(this.props.page === "ALL"))||((this.props.func === "CHIS")&&(this.props.page === "ALL"))){
            prec = 0;
        }else{
            prec = 1;
        }
        this.prec = prec;

        let graphcolor = ["#f8ac59","#1ab394"];
        if(((this.props.func === "CIR")&&(this.props.page === "ALL"))||((this.props.func === "CHIS")&&(this.props.page === "ALL"))){
             graphcolor = ["#727CF5","#f8ac59","#1ab394"]
        }
        this.graphcolor = graphcolor;


        //console.log(prec);

        let tileCalc = Model.tileCalc(this.props.func, this.props.page, this.props.data, this.props.date, tilesBind[this.props.func].mera, prec);

        values.unshift(
            <div key={0} className={"tile_item__value"+postfix+" value_flex"} style={{color: this.props.templ.primary.textValueMain}}>
                <div>
                    {/*{(zeroedVal === null) ? tileCalc.mainVal : zeroedVal}*/}
                    {tileCalc.mainVal}
                </div>
                <div>
                    <span className="subscribe" style={{color: color}}>{(this.props.addSubscr !== undefined ? this.props.addSubscr : "1")}</span>
                    <span style={{color:(tileCalc.smallVal === "(0.0%)" || tileCalc.smallVal === "(NaN%)" || tileCalc.smallVal === "(0%)" || tileCalc.smallVal === "(0.00%)" || tileCalc.smallVal === "(NaN)" || tileCalc.smallVal === "(0.0)" || tileCalc.smallVal === "(0)" || tileCalc.smallVal === "(0.00)") ? this.props.templ.primary.textValueNormal : this.props.templ.primary.textValuePerc}}>
                        {tileCalc.smallVal}
                    </span>
                </div>
            </div>
        );

        return values

    };

    render(){
        const postfix = (this.props.isSmall) ? "_small" : "";
        let subscribtion = "1";
        let color = "rgba(0,0,0,0)";

        Model.optionsReduser();

        return(
            <div className={"tile_item_"+this.props.tileNum}>
                <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                    <div className={"tile_item__title"+postfix} style={{color: this.props.templ.primary.textValueMain}}>
                        {tilesBind[this.props.func].title}<span style={{color: this.props.templ.primary.textValueNormal}}>{((tilesBind[this.props.func].mera === "") ? "" : ", ")+tilesBind[this.props.func].mera}</span>
                    </div>
                    <div className="values_wrapper main_tile">
                        {this.setValue(postfix, subscribtion, color)}
                    </div>
                    <MultiLine
                        options={{
                            grId:"line",
                            titles:["Стратегия 2020", "Моделирование", "Базовая версия"],
                            geometry: {width:"88%", height:"90%"},
                            //colors: (this.props.isSmall) ? ["#727CF5","#1ab394"] : ["#f8ac59","#727CF5","#1ab394"],
                            colors: (this.props.isSmall) ? this.graphcolor : ["#727CF5","#f8ac59","#1ab394"],
                            legend: (!this.props.isSmall),
                            type: "smoothedLine",
                            labelPosition:(this.props.isSmall) ? ["top","bottom"] : ["top","top", "bottom"],
                            thickness: (this.props.isSmall) ? 1 : 2,
                            isBig: (!this.props.isSmall)
                        }}
                        templ={this.props.templ}
                        func={this.props.func}
                        page={this.props.page}
                        grId={this.props.grId}
                        data={this.props.data[this.props.page][this.props.func]}
                        prec={this.prec}
                    />
                </div>
            </div>
        )
    }
}

export default Tile;