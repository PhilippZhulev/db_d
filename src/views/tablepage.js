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


    // tableConstructor = () => {
    //     let tableFill = [];
    //     for (let i=0; i<this.state.table.COR.length; i++){
    //         let column = [];
    //         for (let j=0; j<this.state.table.CAGR.length;j++){
    //             // console.log(this.state.table.data[i*this.state.table.CAGR.length+j]);
    //             // console.log(i*this.state.table.CAGR.length+j);
    //             let stl = {};
    //             if ((i===5)&&(j===5)){
    //                 stl = {color:"#727CF5", fontSize:"27px"};
    //             }
    //             column.push(<div className={"row"} style={stl} key={i*this.state.table.CAGR.length+j}>{this.state.table.data[i*this.state.table.CAGR.length+j].value}</div>)
    //         }
    //         tableFill.push(<div className={"column"} key={i}>{column}</div>)
    //     }
    //
    //     let NIMHeader = this.state.table.NIM.map((value,index)=>{
    //         return (<div key={index} className={"item"}>{value}</div>);
    //     });
    //     let CIRHeader = this.state.table.CIR.map((value,index)=>{
    //         return (<div key={index} className={"item"}>{value}</div>);
    //     });
    //     let CAGRHeader = this.state.table.CAGR.map((value,index)=>{
    //         return (<div key={index} className={"item"}>{value}</div>);
    //     });
    //     let CORHeader = this.state.table.COR.map((value,index)=>{
    //         return (<div key={index} className={"item"}>{value}</div>);
    //     });
    //
    //     let table = [];
    //
    //     let hor_filling = [];
    //
    //     hor_filling.push(<div className={"left_header first"}>{CIRHeader}</div>);
    //     hor_filling.push(<div className={"left_header second"}>{CORHeader}</div>);
    //     hor_filling.push(<div className={"table"}>{tableFill}</div>);
    //
    //     table.push(<div className={"top_header first"}>{NIMHeader}</div>);
    //     table.push(<div className={"top_header second"}>{CAGRHeader}</div>);
    //     table.push(<div className={"table_hor_wrapper"}>{hor_filling}</div>);
    //
    //
    //     return table
    // };

    tableConstructor = () => {
        let table = [];
        for (let i=0; i<this.state.table.COR.length; i++){
                    let row = [];
                    for (let j=0; j<this.state.table.CAGR.length;j++){
                        let stl = {};
                        if ((i===0)&&(j===0)){
                            let first_header = 0;
                            let second_header = 0;

                            first_header = this.state.table.NIM.map((value,index)=>{
                                return(<div className={"top_header first"} key={index+2}>{value}</div>)
                            });
                            first_header.unshift(<div className={"top_header first hidden column"} key={1} style={{color:"rgba(0,0,0,0)"}}>1</div>);
                            first_header.unshift(<div className={"top_header first hidden column"} key={0} style={{color:"rgba(0,0,0,0)"}}>1</div>);
                            table.push(<div className={row}>{first_header}</div>);

                            second_header = this.state.table.CAGR.map((value,index)=>{
                                return(<div className={"top_header second"} key={index}>{value}</div>)
                            });
                            second_header.unshift(<div className={"top_header second hidden column"} key={1}></div>);
                            second_header.unshift(<div className={"top_header second hidden column"} key={0}></div>);

                            table.push(<div className={row}>{second_header}</div>);
}
                        if(j===0){
                            row.push(<div className={"left_header first"} key={1}>{this.state.table.CIR[i]}</div>);
                            row.push(<div className={"left_header second"} key={0}>{this.state.table.COR[i]}</div>);
                        }
                        if ((i===5)&&(j===5)){
                            stl = {color:"#727CF5", fontSize:"27px"};
                        }
                        row.push(<div className={"column"} style={stl} key={i*this.state.table.CAGR.length+j}>{this.state.table.data[i*this.state.table.CAGR.length+j].value}</div>)
                    }
                    table.push(<div className={"row"} key={i}>{row}</div>)
                }
                return table
    };

    // lineConstructor = (str) => {
    //     let arr = this.state.table[str].map((value,index)=>{
    //         return <div className={"item"} key={index} style={(str === "NIM") ? {left: ""+(83+index*226)+"px"} : {top: ""+(41+index*136)+"px"}}/>
    //     });
    //     return arr
    // };

    render() {
        return (
            <Fade in={true} timeout={{enter: 300, exit:300}}>
                <div className={"table"}>{this.tableConstructor()}</div>
            </Fade>
        )
    }
}

export default TablePage;
