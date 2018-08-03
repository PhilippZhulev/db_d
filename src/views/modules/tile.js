import React, { Component } from 'react';
import MultiLine from '../../components/charts/MultyLineCharts';
import dataBank from '../../secret/data_bank';


class Tile extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        const postfix = (this.props.isSmall) ? "_small" : "";
        let subscribtion = "1";
        let color = "rgba(0,0,0,0)";
        const func = this.props.func;
        let values = [];
        if(!(this.props.page=="home"||this.props.page=="opex")){
            color = this.props.templ.primary.textValueNormal;
            subscribtion = "total";
            values.push(
                <div key={1} className={"tile_item__value"+postfix+" value_flex"} style={{color: this.props.templ.primary.textValueMain}}>
                    <div>
                        {dataBank[func]["value"+this.props.page]}
                    </div>
                    <div>
                        <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>{this.props.addSubscr}</span>
                        <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank[func]["smallValue"+this.props.page]}</span>
                    </div>
                </div>
            );
            values.push(<div key={2} className={"vLine"+postfix}></div>);
        }
        const val = (this.props.page=="opex") ? this.props.opexVal : dataBank[func].value;
        values.push(
            <div key={0} className={"tile_item__value"+postfix+" value_flex"} style={{color: this.props.templ.primary.textValueMain}}>
                <div>
                    {val}
                </div>
                <div>
                    <span className="subscribe" style={{color: color}}>{subscribtion}</span>
                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank[func].smallValue}</span>
                </div>
            </div>
        );
        const comma = (dataBank[func].mera=="") ? "" : ", ";
        return(
            <div className={"tile_item_"+this.props.tileNum}>
                <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                    <div className={"tile_item__title"+postfix} style={{color: this.props.templ.primary.textValueMain}}>
                        {dataBank[func].title}<span style={{color: "#aab3b3"}}>{comma+dataBank[func].mera}</span>
                    </div>
                    <div className="values_wrapper main_tile">
                        {values}
                    </div>
                    <MultiLine
                        options={dataBank[func].options}
                        templ={this.props.templ}
                    />
                </div>
            </div>
        )
    }
}

export default Tile;
