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
        let tableFill = [];
        for (let i=0; i<this.state.table.COR.length; i++){
            let column = [];
            for (let j=0; j<this.state.table.CAGR.length;j++){
                // console.log(this.state.table.data[i*this.state.table.CAGR.length+j]);
                // console.log(i*this.state.table.CAGR.length+j);
                column.push(<div className={"row"} key={i*this.state.table.CAGR.length+j}>{this.state.table.data[i*this.state.table.CAGR.length+j].value}</div>)
            }
            tableFill.push(<div className={"column"} key={i}>{column}</div>)
        }

        let NIMHeader = this.state.table.NIM.map((value,index)=>{
            return (<div key={index} className={"item"}>{value}</div>);
        });
        let CIRHeader = this.state.table.CIR.map((value,index)=>{
            return (<div key={index} className={"item"}>{value}</div>);
        });
        let CAGRHeader = this.state.table.CAGR.map((value,index)=>{
            return (<div key={index} className={"item"}>{value}</div>);
        });
        let CORHeader = this.state.table.COR.map((value,index)=>{
            return (<div key={index} className={"item"}>{value}</div>);
        });

        let table = [];

        let hor_filling = [];

        hor_filling.push(<div className={"left_header first"}>{CIRHeader}</div>);
        hor_filling.push(<div className={"left_header second"}>{CORHeader}</div>);
        hor_filling.push(<div className={"table"}>{tableFill}</div>);

        table.push(<div className={"top_header first"}>{NIMHeader}</div>);
        table.push(<div className={"top_header second"}>{CAGRHeader}</div>);
        table.push(<div className={"table_hor_wrapper"}>{hor_filling}</div>);


        return table
    }

    render() {
        return (
            <Fade in={true} timeout={{enter: 300, exit:300}}>
                <div className={"table_wrapper"}>
                    <div className="hlineTable" />
                    <div className="vlineTable" />
                    <div className={"table"}>{this.tableConstructor()}</div>
                </div>
            </Fade>
        )
    }
}

export default TablePage;
