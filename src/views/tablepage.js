import React, { Component } from 'react';
import Fade from "@material-ui/core/Fade";

class TablePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.fluxData,
            funcs: ["PI","INC","OPEX","CIR","KOM","COR","CHIS"],
            templ: this.props.templ,
            table: this.props.table
        };
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
                if ((i===5)&&(j===5)){
                    stl = {color:"#727CF5", fontSize:"27px", backgroundColor:this.props.templ.primary.textValueMain};
                } else if (((i<=5)&&(j===5))||((j<=5)&&(i===5))){
                    stl = {backgroundColor:this.props.templ.primary.textValueNormal};
                }
                if ((i < this.state.table.CIR.length - 1)&&(this.state.table.CIR[i] !== this.state.table.CIR[i + 1])){
                    stl = Object.assign(stl, bottom_line);
                }
                if ((j < this.state.table.NIM.length - 1)&&(this.state.table.NIM[j] !== this.state.table.NIM[j + 1])){
                    stl = Object.assign(stl, right_line);
                }
                row.push(<div className={"column"} style={stl} key={i*this.state.table.CAGR.length+j}>{this.state.table.data[i*this.state.table.CAGR.length+j].value}</div>)
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
