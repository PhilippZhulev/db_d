import React, { Component } from 'react';
import Fade from "@material-ui/core/Fade";
import Switch from '@material-ui/core/Switch';
import store, {getState, change} from "../reduser";


class TablePage extends Component {

    handleChange = () => {
        this.setState({gilad: !(this.state.gilad)});
    };

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.fluxData,
            funcs: ["PI","INC","OPEX","CIR","KOM","COR","CHIS"],
            templ: this.props.templ,
            table: this.props.table,
            opts: {
                CIR: "32%",
                COR: "1,5%",
                CAGR: "13,0%",
                NIM: "4,5%"
            }
        };

        store.subscribe(() => {
            if(change === "change_table_select") {
               this.setState({opts:getState.states});
            }
        });
    }

    tableConstructor = () => {
        let table = [];

        const bottom_line = {borderBottom: "1px solid "+this.props.templ.primary.textValueMain};
        const right_line = {borderRight: "1px solid "+this.props.templ.primary.textValueMain};
        for (let i=0; i<this.state.table.COR.length; i++){
            let row = [];

            let obj1 = {};
            obj1 = Object.assign(obj1, bottom_line);
            obj1 = Object.assign(obj1, right_line);

            for (let j=0; j<this.state.table.CAGR.length;j++){
                let stl = {};
                let scale = "";
                if ((i===0)&&(j===0)){
                    let first_header = 0;
                    let second_header = 0;

                    first_header = this.state.table.NIM.map((value,index)=>{
                        const color = (index % (this.state.table.CAGR.length / this.state.table.oldNIM.length) === 0) ? {color: "inherit"} : {color: "rgba(0,0,0,0)"};
                        return(<div className={"top_header first column"} key={index+2} style={((index < this.state.table.NIM.length - 1)&&(this.state.table.NIM[index] !== this.state.table.NIM[index + 1])) ? Object.assign(color,right_line) : color}>{value}</div>)
                    });
                    first_header.unshift(<div className={"top_header first hidden column"} key={Math.random()} style={right_line}>NIM</div>);
                    first_header.unshift(<div className={"top_header first hidden column"} key={Math.random()} style={{color:"rgba(0,0,0,0)"}}>1</div>);
                    table.push(<div key={Math.random()} className={"row"}>{first_header}</div>);

                    second_header = this.state.table.CAGR.map((value,index)=>{
                        return(<div className={"top_header second column"} key={index+2} style={((index < this.state.table.NIM.length - 1)&&(this.state.table.NIM[index] !== this.state.table.NIM[index + 1])) ? obj1 : bottom_line}>{value}</div>)
                    });
                    second_header.unshift(<div className={"top_header second hidden column"} key={Math.random()} style={obj1}>COR CAGR</div>);
                    second_header.unshift(<div className={"top_header second hidden column"} key={Math.random()} style={bottom_line}>CIR</div>);

                    table.push(<div key={Math.random()} className={"row"}>{second_header}</div>);
                }
                if(j===0){
                    const color = (i % (this.state.table.COR.length / this.state.table.oldCIR.length) === 2) ? {color: "inherit"} : {color: "rgba(0,0,0,0)"};
                    row.push(<div className={"left_header first column"} key={Math.random()} style={((i < this.state.table.CIR.length - 1)&&(this.state.table.CIR[i] !== this.state.table.CIR[i + 1])) ? Object.assign(color,bottom_line) : color}>{this.state.table.CIR[i]}</div>);
                    row.push(<div className={"left_header second column"} key={Math.random()} style={((i < this.state.table.CIR.length - 1)&&(this.state.table.CIR[i] !== this.state.table.CIR[i + 1])) ? obj1 : right_line}>{this.state.table.COR[i]}</div>);
                }
                if ((this.state.table.data[i*this.state.table.CAGR.length+j].NIM === this.state.opts.NIM)&&(this.state.table.data[i*this.state.table.CAGR.length+j].CIR === this.state.opts.CIR)&&(this.state.table.data[i*this.state.table.CAGR.length+j].COR === this.state.opts.COR)&&(this.state.table.data[i*this.state.table.CAGR.length+j].CAGR === this.state.opts.CAGR)) {
                    stl = {
                        color: ((this.state.opts.NIM === "4,5%")&&(this.state.opts.CAGR === "13,0%")&&(this.state.opts.CIR === "32%")&&(this.state.opts.COR === "1,5%")) ? "#1ab394" : "#727CF5",
                        backgroundColor: this.props.templ.primary.tableSelection,
                    };
                    scale = "selVal";
                    console.log(this.state.opts);

                // } else if (((this.state.table.data[i*this.state.table.CAGR.length+j].NIM === this.state.opts.NIM)&&(this.state.table.data[i*this.state.table.CAGR.length+j].CIR === this.state.opts.CIR))||((this.state.table.data[i*this.state.table.CAGR.length+j].COR === this.state.opts.COR)&&(this.state.table.data[i*this.state.table.CAGR.length+j].CAGR === this.state.opts.CAGR))){
                } else if (((this.state.table.data[i*this.state.table.CAGR.length+j].NIM === this.state.opts.NIM)&&(this.state.table.data[i*this.state.table.CAGR.length+j].CAGR === this.state.opts.CAGR))||((this.state.table.data[i*this.state.table.CAGR.length+j].COR === this.state.opts.COR)&&(this.state.table.data[i*this.state.table.CAGR.length+j].CIR === this.state.opts.CIR))){
                    stl = {backgroundColor:this.props.templ.primary.tableSelection};
                }
                if ((i < this.state.table.CIR.length - 1)&&(this.state.table.CIR[i] !== this.state.table.CIR[i + 1])){
                    stl = Object.assign(stl, bottom_line);
                }
                if ((j < this.state.table.NIM.length - 1)&&(this.state.table.NIM[j] !== this.state.table.NIM[j + 1])){
                    stl = Object.assign(stl, right_line);
                }
                row.push(<div className={"column"} style={stl} key={i*this.state.table.CAGR.length+j}>
                    <div className={scale}>{this.state.table.data[i*this.state.table.CAGR.length+j].value}</div>
                </div>)
            }
            table.push(<div className={"row"} key={i}>{row}</div>)
        }
        return table
    };


    render() {
        return (
            <Fade in={true} timeout={{enter: 300, exit:300}}>
                <div className={"table"} style={{color: this.props.templ.primary.textValueMain,   position: "relative", width: "100%",   height: "96%"}}>{this.tableConstructor()}</div>
            </Fade>
        )
    }
}

export default TablePage;
