import React, { Component } from 'react';
import MultiLine from '../../components/charts/MultyLineCharts';
import Model from '../../models/model.js';

const tilesBind = Model.tilesBind();

class Tile extends Component {
    constructor(props) {
        super(props);
    }

    setValue = (postfix, subscribtion, color) => {
        let values = [],
            tileCalc = Model.tileCalc(this.props.func, this.props.page, this.props.data);

        if(!(this.props.page==="ALL"||this.props.page==="OPEX")){
            color = this.props.templ.primary.textValueNormal;
            values.push(<div key={1} className={"vLine"+postfix} />);
            values.push(
                <div key={2} className={"tile_item__value"+postfix+" value_flex"} style={{color: this.props.templ.primary.textValueMain}}>
                    <div>
                        {tileCalc.mainValAll}
                    </div>
                    <div>
                        <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>{"Группа"}</span>
                        <span style={{color: this.props.templ.primary.textValueNormal}}>{tileCalc.smallValAll}</span>
                    </div>
                </div>
            );
        }
        values.unshift(
            <div key={0} className={"tile_item__value"+postfix+" value_flex"} style={{color: this.props.templ.primary.textValueMain}}>
                <div>
                    {tileCalc.mainVal}
                </div>
                <div>
                    <span className="subscribe" style={{color: color}}>{(this.props.addSubscr !== undefined ? this.props.addSubscr : "1")}</span>
                    <span style={{color: this.props.templ.primary.textValueNormal}}>
                        {tileCalc.smallVal}
                    </span>
                </div>
            </div>
        );

        return values;
    };

    render(){
        const postfix = (this.props.isSmall) ? "_small" : "";
        let subscribtion = "1";
        let color = "rgba(0,0,0,0)";

        return(
            <div className={"tile_item_"+this.props.tileNum}>
                <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                    <div className={"tile_item__title"+postfix} style={{color: this.props.templ.primary.textValueMain}}>
                        {tilesBind[this.props.func].title}<span style={{color: "#aab3b3"}}>{((tilesBind[this.props.func].mera === "") ? "" : ", ")+tilesBind[this.props.func].mera}</span>
                    </div>
                    <div className="values_wrapper main_tile">
                        {this.setValue(postfix, subscribtion, color)}
                    </div>
                    <MultiLine
                        options={{
                            grId:"line",
                            titles:["Стратегия 2020", "Базовая версия", "Моделирование"],
                            geometry: {width:"88%", height:"90%"},
                            colors: (this.props.isSmall) ? ["#1ab394","#727CF5"] : ["#f8ac59","#1ab394","#727CF5"],
                            legend: (!this.props.isSmall),
                            type: "smoothedLine",
                            labelPosition:["bottom", "top"],
                            thickness: (this.props.isSmall) ? 1 : 2,
                            isBig: (!this.props.isSmall)
                        }}
                        templ={this.props.templ}
                        page={this.props.page}
                        grId={this.props.grId}
                        data={this.props.data[this.props.page][this.props.func]}
                    />
                </div>
            </div>
        )
    }
}

export default Tile;