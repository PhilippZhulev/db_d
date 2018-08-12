import React, { Component } from 'react';
import 'amcharts3';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';
import 'amcharts3/amcharts/plugins/export/export.min.js';
import 'amcharts3/amcharts/plugins/export/export.css';
import AmCharts from '@amcharts/amcharts3-react';
import Legend from './legend';

import store, {getState, change} from '../../reduser';

let koeff = 1;

store.subscribe(() => {

    if (change === "driver") {
        koeff = getState.value.val;
        console.log("driver written to koeff");
        console.log(koeff);
    }
});

class MultiLine extends Component {
    constructor(props){
        super(props);
        let data = this.props.data;
        this.state={koeff: 1, data:data};
        this.setState({koeff:koeff});
        const graphs = ["strategy","base", "model"];
        const grNum = 3;
        for (let i=0;i<data.length;i++){
            for (let key in data[i]){
                if(data[i].hasOwnProperty(key)) {
                    if (data[i][key] === "0") {
                        data[i][key] = "No data";
                    }
                }
            }
        }
        if(this.props.page === "OPEX" && this.props.options.isBig){
            console.log("this is opex big");
            console.log(this.state.koeff);
            for (let i = 0; i < data.length; i++){
                data[i][graphs[grNum-1]]=data[i][graphs[grNum-2]]*this.state.koeff;
            }
        }
        //this.state={koeff: 1, data:data};
        //this.setState({data:data});
        console.log("koeff is:");
        console.log(koeff);
        this.state={koeff:koeff,data:data};
    }
    render() {
        const data = this.props.data;
        const bigClass = (this.props.options.isBig) ? "_big" : "";

        let amchartsSettings =
            {

                "type": "serial",
                "fontFamily": "'Open Sans', sans-serif",
                "categoryField": "category",
                "zoomOutButtonRollOverAlpha": 0,
                "colors": this.props.options.colors,
                "sequencedAnimation": false,
                "startDuration": 0,
                "color": this.props.templ.primary.graphText,
                "fontSize": 12,
                "categoryAxis": {
                    "labelOffset": -10,
                    "fontSize": 12,
                    "gridPosition": "start",
                    "axisColor": this.props.templ.primary.graphText,
                    "color": this.props.templ.primary.graphText,
                    "axisThickness": 0.4,
                    "gridAlpha": 0,
                    "gridColor": "#E5E5E5",
                    "gridCount": 0,
                    "gridThickness": 0,
                    "titleColor": "#FFFFFF"
                },
                "trendLines": [],
                "graphs": [],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "precision": 0,
                        "axisAlpha": 0.0,
                        "axisColor": "#E5E5E5",
                        "gridAlpha": 0,
                        "gridThickness": 0,
                        "gridColor": "#E5E5E5",
                        "labelsEnabled": false,
                        "title": "",
                        "titleColor": "#E5E5E5"
                    }
                ],
                "allLabels": [],
                "titles": [],
                "dataProvider": []

            };
        let graphs = [];
        for (let key in data[0]){
            if(data[0].hasOwnProperty(key)) {
                if (key !== "category") {
                    graphs.push(key);
                }
            }
        }
        let dataProvider = [];
        let grNum = graphs.length;
        for (let i = 0;i<grNum;i++){
            amchartsSettings.graphs.push(
                {
                    "balloonText": "[[category]]: [[value]]%",
                    "bullet": "round",
                    "bulletBorderAlpha": 0,
                    "bulletBorderColor": this.props.options.colors[i],
                    "bulletColor": this.props.options.colors[i],
                    "bulletSize": 3,
                    "bulletBorderThickness": 0,
                    "showBalloon": false,
                    "color": this.props.templ.primary.graphText,
                    "id": "AmGraph-"+i,
                    "fontSize": 12,
                    "showAllValueLabels": true,
                    "labelText": (this.props.options.colors[i] !== "#727CF5") ? "[[value]]" : "",
                    "lineThickness": this.props.options.thickness,
                    "title": "graph "+i,
                    "valueField": graphs[i],//"val"+i,
                    "type": this.props.options.type,
                    "labelPosition": this.props.options.labelPosition[i],
                    "visibleInLegend": false
                }


            );
        }
        // dataProvider = data;
        // for (let i=0;i<dataProvider.length;i++){
        //     for (let key in dataProvider[i]){
        //         if(dataProvider[i].hasOwnProperty(key)) {
        //             if (dataProvider[i][key] === "0") {
        //                 dataProvider[i][key] = "No data";
        //             }
        //         }
        //     }
        // }
        // if(this.props.page === "OPEX" && this.props.options.isBig){
        //     console.log("this is opex big");
        //     console.log(this.state.koeff);
        //     for (let i = 0; i < data.length; i++){
        //         dataProvider[i][graphs[grNum-1]]=dataProvider[i][graphs[grNum-2]]*this.state.koeff;
        //     }
        // }
        // let catNum = this.props.options.categories.length;
        // for (let i = 0; i<catNum; i++){
        //     let dataCurr = {};
        //     dataCurr["category"]=this.props.options.categories[i];
        //     for (let j = 0; j<grNum; j++){
        //         dataCurr["val"+j]=this.props.options.data[j][i];
        //         if (this.props.grId===0 && this.props.page==="opex" && i>0 && j===grNum-1) {
        //             //console.log("OPEX!");
        //             //console.log(this.state);
        //             dataCurr["val"+j]=(this.props.options.data[j-1][i]*this.state.all_values["CHISL_OPER_FUNC"]).toFixed(2);
        //             /*console.log("value was: "+this.props.options.data[j-1][i]);
        //             console.log("multiplied by: "+this.state.all_values["CHISL_OPER_FUNC"]);
        //             console.log("result: "+dataCurr["val"+j]);
        //             console.log((1091.0*1.6));*/
        //         }
        //         //console.log(this.props.grId+" "+flag+" "+this.props.page+" "+j)
        //
        //     }
        //     data.push(dataCurr);
        // }
        amchartsSettings.dataProvider = this.state.data;//dataProvider;

        let out =[];
        out.push(<AmCharts.React key={0} className="chart" style={{width:this.props.options.geometry.width,height: this.props.options.geometry.height}}
                                 options={amchartsSettings}
        />);
        if(this.props.options.legend){
            out.push(<Legend key={1} templ={this.props.templ} options={this.props.options}/>);
        }

        console.log("Data provider for page "+this.props.page);
        console.log(dataProvider);

        return (
            <div
                className={"multiline_wrapper__item"+bigClass}
                style={(typeof this.props.options.wrapperStyles !== "undefined") ? this.props.options.wrapperStyles : {}}>
                {out}
            </div>
        );
    }
}

export default MultiLine;
