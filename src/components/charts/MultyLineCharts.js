import React, { Component } from 'react';
import 'amcharts3';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';
import 'amcharts3/amcharts/plugins/export/export.min.js';
import 'amcharts3/amcharts/plugins/export/export.css';
import AmCharts from '@amcharts/amcharts3-react';
import Legend from './legend';
import store from "../../reduser";

class MultiLine extends Component {
    constructor(props){
        super(props);
        this.state = {data: obj.data.data, all_values: {}};
        store.subscribe(() => {
            const change = store.getState().change,
                getState = store.getState();

            /*if(change === "driver") {
                if(typeof store.getState().sapType !== "undefined") {

                    const objState = [JSON.stringify(store.getState().value.id), JSON.stringify(store.getState().value.val)];

                    updateState([store.getState().sapType, objState], () => {
                        this.setState({data: obj.data.data});
                    });
                }
            } else */if(change === "data"){
                this.setState({data: getState});
                console.log("State now is: ");
                console.log(this.state);
            }
            if (change === "all_drivers") {
                console.log("ALL_DRIVERS_HERE!");
                this.setState({all_values:getState.value});
            }
        });
    }
    render() {
        console.log("In render func:");
        console.log(this.state);
        console.log("gr id:");
        console.log(this.props.grInd);
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
        let data = [];
        let grNum = this.props.options.colors.length;
        for (var i = 0;i<grNum;i++){
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
                    "labelText": (this.props.options.colors[i] != "#b4b4b4") ? "[[value]]" : "",
                    "lineThickness": this.props.options.thickness,
                    "title": "graph "+i,
                    "valueField": "val"+i,
                    "type": this.props.options.type,
                    "labelPosition": this.props.options.labelPosition[i],
                    "visibleInLegend": false
                }


            );
        }
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Multiline Render<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        console.log(this.props.page);
        let catNum = this.props.options.categories.length;
        for (var i = 0;i<catNum;i++){
            var dataCurr = {};
            dataCurr["category"]=this.props.options.categories[i];
            for (var j = 0; j<grNum; j++){
                dataCurr["val"+j]=this.props.options.data[j][i];
                if(this.props.grInd === 0 && this.state.data !== undefined && this.props.page!=="opex"){
                    console.log("FTP data");
                    console.log(this.state.data.value);
                    let dataFtp = JSON.parse("["+this.state.data.value+"]");
                    let vals = ["strategy", "base", "model"];
                    dataCurr["category"]=dataFtp[i]["category"];
                    dataCurr["val"+j]=dataFtp[i][vals[j]];
                    console.log("dataCurr: ");
                    console.log(dataCurr);
                }
                console.log("First if passed");
                console.log("grId = "+this.props.grInd);
                console.log("page = "+this.props.page);
                console.log("i = "+i);
                console.log("j = "+j);
                if (this.props.grInd===0 && this.props.page==="opex" && i>0 && j===grNum-1) {
                    console.log("OPEX!");
                    console.log(">>>>>>>>>>>>>>>>>>front calc<<<<<<<<<<<<<<<<");
                    //console.log(this.state);
                    dataCurr["val"+j]=(this.props.options.data[j-1][i]*this.state.all_values["CHISL_OPER_FUNC"]).toFixed(2);
                    /*console.log("value was: "+this.props.options.data[j-1][i]);
                    console.log("multiplied by: "+this.state.all_values["CHISL_OPER_FUNC"]);
                    console.log("result: "+dataCurr["val"+j]);
                    console.log((1091.0*1.6));*/
                }
                
            }
            data.push(dataCurr);
        }
        amchartsSettings.dataProvider = data;
        //console.log(amchartsSettings);
        let out = [];
        out.push(<AmCharts.React key={0} className="chart" style={{width:this.props.options.geometry.width,height: this.props.options.geometry.height}}
                                 options={amchartsSettings}
        />);
        if(this.props.options.legend){
            out.push(<Legend key={1} templ={this.props.templ} options={this.props.options}/>);
        }
        const bigClass = (this.props.options.isBig) ? "_big" : "";

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
