import React, { Component } from 'react';
import 'amcharts3';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';
import 'amcharts3/amcharts/plugins/export/export.min.js';
import 'amcharts3/amcharts/plugins/export/export.css';
import AmCharts from '@amcharts/amcharts3-react';
import Legend from './legend';

class MultiLine extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let amchartsSettings =
            {

                "type": "serial",
                "fontFamily": "'Open Sans', sans-serif",
                "categoryField": "category",
                "zoomOutButtonRollOverAlpha": 0,
                "colors": this.props.options.colors,
                "sequencedAnimation": false,
                "startDuration": 0,
                "color": "#a1abb8",
                "fontSize": 12,
                "categoryAxis": {
                    "labelOffset": -10,
                    "fontSize": 12,
                    "gridPosition": "start",
                    "axisColor": "#a0aab7",
                    "color": "#A0AAB7",
                    "axisThickness": 0.4,
                    "gridAlpha": 0,
                    "gridColor": "#E5E5E5",
                    "gridCount": 0,
                    "gridThickness": 0,
                    "titleColor": "#FFFFFF",
                    "fontSize": 12
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

            }
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
                    "color": "#AAB3B3",
                    "id": "AmGraph-"+i,
                    "fontSize": 12,
                    "labelText": (this.props.options.colors[i]!="#b4b4b4") ? "[[value]]" : "",
                    "lineThickness": this.props.options.thickness,
                    "title": "graph "+i,
                    "valueField": "val"+i,
                    "type": this.props.options.type,
                    "labelPosition": this.props.options.labelPosition[i],
                    "visibleInLegend": false
                }


            );
        }
        let catNum = this.props.options.categories.length;
        for (var i = 0;i<catNum;i++){
            var dataCurr = {};
            dataCurr["category"]=this.props.options.categories[i];
            for (var j = 0; j<grNum; j++){
                dataCurr["val"+j]=this.props.options.data[j][i];
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
            out.push(<Legend key={1} options={this.props.options}
            />);
        }

        return (
            <div
                className="multiline_wrapper__item"
                style={(typeof this.props.options.wrapperStyles !== "undefined") ? this.props.options.wrapperStyles : {}}>
                {out}
            </div>
        );
    }
}

export default MultiLine;
