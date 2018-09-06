import React, { Component } from 'react';
import 'amcharts3';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';
import 'amcharts3/amcharts/plugins/export/export.min.js';
import 'amcharts3/amcharts/plugins/export/export.css';
import AmCharts from '@amcharts/amcharts3-react';
import Legend from './legend';
import Model from '../../models/model.js';

class MultiLine extends Component {

    setLabelPosition = () => {
        let metr = 0;
        for(let i=1;i<this.props.data.length;i++){
            let koeff = (+(this.props.data[i].model) >= +(this.props.data[i].base)) ? 1 : -1;
            metr = metr + koeff;
        }
        return Model.chartsGraphs([], this.props.data).map((value, index)=>{
            switch (value) {
                case "strategy":
                    return (this.props.options.label) ? "top" : "bottom";
                case "model":
                    return (metr > 0) ? "top" : "bottom";
                default:
                    return (metr > 0) ? "bottom" : "top";
            }
        });
    };

    chartSettings = (out) => {

        // let prec = 1;
        //
        // switch(this.props.func) {
        //     case "COR":
        //         prec = 2;
        //         break;
        //     case "EPS":
        //         prec = 2;
        //         break;
        //     case "OPEX":
        //         prec = -1;
        //         break;
        //     case "CHIS":
        //         if (this.props.page === "ALL"){
        //             prec = -1;
        //         } else {
        //             prec = 1;
        //         }
        //         break;
        //     default:
        //         prec = 1;
        // }

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
                "thousandsSeparator": "",
                "fontSize": 12 + ((this.props.options.addFontSize === undefined) ? 0 : this.props.options.addFontSize),
                "categoryAxis": {
                    "labelOffset": -10,
                    "fontSize": 12 + ((this.props.options.addFontSize === undefined) ? 0 : this.props.options.addFontSize),
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
                        "minMaxMultiplier": 1.4,
                        "titleColor": "#E5E5E5",
                        "fontSize": 12 + ((this.props.options.addFontSize === undefined) ? 0 : this.props.options.addFontSize)
                    }
                ],
                "allLabels": [],
                "titles": [],
                "dataProvider": []

            };

        for (let i = 0; i < Model.chartsGraphs([], this.props.data).length; i++){
            amchartsSettings.graphs.push(
                {
                    "balloonText": "[[category]]: [[value]]",
                    "bullet": "round",
                    "bulletBorderAlpha": 0,
                    "bulletBorderColor": this.props.options.colors[i],
                    "bulletColor": this.props.options.colors[i],
                    "bulletSize": 3,
                    "bulletBorderThickness": 0,
                    "showBalloon": false,
                    "color": this.props.options.colors[i],
                    "id": "AmGraph-"+i,
                    "fontSize": 12 + ((this.props.options.addFontSize === undefined) ? 0 : this.props.options.addFontSize),
                    "showAllValueLabels": true,
                    "labelText": "[[value]]",//((Model.chartsGraphs([], this.props.data)[i]==="strategy")&&(!this.props.options.label))? "" : "[[value]]", чтобы на малых тайлах на стратегии не отображались значения
                    "precision": this.props.prec,
                    "lineThickness": this.props.options.thickness,
                    "title": "graph "+i,
                    "valueField": Model.chartsGraphs([], this.props.data)[i],
                    "type": this.props.options.type,
                    "labelPosition": this.setLabelPosition()[i],//this.props.options.labelPosition[i],
                    "visibleInLegend": false
                }
            );

        }

       amchartsSettings.dataProvider = Model.chartReInitZero(this.props.data);

        out.push(
            <AmCharts.React
                key={0}
                className="chart"
                style={{width:this.props.options.geometry.width, height: this.props.options.geometry.height}}
                options={amchartsSettings}
            />
        );

        if(this.props.options.legend){
            out.push(<Legend key={1} templ={this.props.templ} options={this.props.options} />);
        }

        return out
    };

    render() {
        return (
            <div
                className={"multiline_wrapper__item"+ ((this.props.options.isBig) ? "_big" : "")}
                style={(typeof this.props.options.wrapperStyles !== "undefined") ? this.props.options.wrapperStyles : {}}>
                {this.chartSettings([])}
            </div>
        );
    }
}

export default MultiLine;
