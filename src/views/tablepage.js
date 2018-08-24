import React, { Component } from 'react';
import Fade from "@material-ui/core/Fade";
// import Switch from '@material-ui/core/Switch';
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
                CIR: this.props.table.defaultSel.CIR,
                COR: this.props.table.defaultSel.COR,
                CAGR: this.props.table.defaultSel.CAGR,
                NIM: this.props.table.defaultSel.NIM,
            }
        };

        store.subscribe(() => {
            if(change === "change_table_select") {
               this.setState({opts:getState.states});
            }
        });
    }

    elInd = (i, j, str)=>{
        return String(this.props.table["old"+str].indexOf(this.state.table.data[i*this.state.table.CAGR.length+j][str]))
    };

    handleTouch = (i,j) => {
        const val = {
            CIR: this.elInd(i,j,"CIR"),
            COR: this.elInd(i,j,"COR"),
            CAGR: this.elInd(i,j,"CAGR"),
            NIM: this.elInd(i,j,"NIM"),
        };
        this.setState({opts:val});
        store.dispatch({
            type: "BUTTONS_REASSIGN",
            payload:val
        });
    };

    tableConstructor = () => {
        let table = [];

        const bottom_line = {borderBottom: "1px solid "+this.props.templ.primary.textValueNormal};
        const right_line = {borderRight: "1px solid "+this.props.templ.primary.textValueNormal};
        for (let i=0; i<this.state.table.COR.length; i++){
            let row = [];

            let obj1 = {};
            obj1 = Object.assign(obj1, bottom_line);
            obj1 = Object.assign(obj1, right_line);

            for (let j=0; j<this.state.table.CAGR.length;j++){
                let stl = {};
                let scale = "";
                let selVal = {i: +(this.state.opts.CIR)*this.props.table.oldCOR.length + +(this.state.opts.COR), j: +(this.state.opts.NIM)*this.props.table.oldCAGR.length + +(this.state.opts.CAGR)};
                const selValBase = {i: +(this.props.table.defaultSel.CIR)*this.props.table.oldCOR.length + +(this.props.table.defaultSel.COR), j: +(this.props.table.defaultSel.NIM)*this.props.table.oldCAGR.length + +(this.props.table.defaultSel.CAGR)};

                //console.log(selVal);

                if ((i===0)&&(j===0)){
                    let first_header = 0;
                    let second_header = 0;

                    first_header = this.state.table.NIM.map((value,index)=>{
                        const color = (index % (this.state.table.CAGR.length / this.state.table.oldNIM.length) === 1) ? {color: this.props.templ.primary.textValueMain} : {color: "rgba(0,0,0,0)"};
                        return(<div className={"top_header first column"} key={index+2} style={((index < this.state.table.NIM.length - 1)&&(this.state.table.NIM[index] !== this.state.table.NIM[index + 1])) ? Object.assign(color,right_line) : color}>{value}</div>)
                    });
                    first_header.unshift(<div className={"top_header first hidden column"} key={Math.random()} style={Object.assign({color: this.props.templ.primary.textValueMain},right_line)}>NIM</div>);
                    first_header.unshift(<div className={"top_header first hidden column"} key={Math.random()} style={{color:"rgba(0,0,0,0)"}}>1</div>);
                    table.push(<div key={Math.random()} className={"row"}>{first_header}</div>);

                    second_header = this.state.table.CAGR.map((value,index)=>{
                        return(<div className={"top_header second column"} key={index+2} style={((index < this.state.table.NIM.length - 1)&&(this.state.table.NIM[index] !== this.state.table.NIM[index + 1])) ? Object.assign({color:this.props.templ.primary.textValueMain}, obj1) : Object.assign({color:this.props.templ.primary.textValueMain}, bottom_line)}>{value}</div>)
                    });
                    second_header.unshift(<div className={"top_header second hidden column"} key={Math.random()} style={Object.assign({color: this.props.templ.primary.textValueMain, lineHeight:"99%", fontSize:"0.875rem"}, obj1)}>COR<br/>CAGR</div>);
                    second_header.unshift(<div className={"top_header second hidden column"} key={Math.random()} style={Object.assign({color: this.props.templ.primary.textValueMain},bottom_line)}>CIR</div>);

                    table.push(<div key={Math.random()} className={"row"}>{second_header}</div>);
                }
                if(j===0){
                    const color = (i % (this.state.table.COR.length / this.state.table.oldCIR.length) === 2) ? {color: this.props.templ.primary.textValueMain} : {color: "rgba(0,0,0,0)"};
                    row.push(<div className={"left_header first column"} key={Math.random()} style={((i < this.state.table.CIR.length - 1)&&(this.state.table.CIR[i] !== this.state.table.CIR[i + 1])) ? Object.assign(color,bottom_line) : color}>{this.state.table.CIR[i]}</div>);
                    row.push(<div className={"left_header second column"} key={Math.random()} style={((i < this.state.table.CIR.length - 1)&&(this.state.table.CIR[i] !== this.state.table.CIR[i + 1])) ? Object.assign({color:this.props.templ.primary.textValueMain}, obj1) : Object.assign({color:this.props.templ.primary.textValueMain},right_line)}>{this.state.table.COR[i]}</div>);
                }
                //if ((this.elInd(i,j,"NIM") === +(this.state.opts.NIM))&&(this.elInd(i,j,"CIR") === +(this.state.opts.CIR))&&(this.elInd(i,j,"COR") === +(this.state.opts.COR))&&(this.elInd(i,j,"CAGR") === +(this.state.opts.CAGR))) {
                if ((i === selVal.i)&&(j === selVal.j)) {
                    stl = {
                        color: "#727CF5",
                        backgroundColor: this.props.templ.primary.tableSelection,
                    };
                    scale = "selVal";
                    console.log(this.state.opts);

                    //} else if (((this.elInd(i,j,"NIM") === +(this.state.opts.NIM))&&(this.elInd(i,j,"CAGR") === +(this.state.opts.CAGR))&&(this.elInd(i,j,"COR") <= +(this.state.opts.COR)))||((this.elInd(i,j,"COR") === +(this.state.opts.COR))&&(this.elInd(i,j,"CIR") === +(this.state.opts.CIR)))&&(this.elInd(i,j,"CAGR") <= +(this.state.opts.CAGR))){
                } else if (((i <= selVal.i)&&(j === selVal.j))||((i === selVal.i)&&(j <= selVal.j))){
                    stl = {backgroundColor:this.props.templ.primary.tableSelection};
                }
                if ((i < this.state.table.CIR.length - 1)&&(this.state.table.CIR[i] !== this.state.table.CIR[i + 1])){
                    stl = Object.assign(stl, bottom_line);
                }
                if ((j < this.state.table.NIM.length - 1)&&(this.state.table.NIM[j] !== this.state.table.NIM[j + 1])){
                    stl = Object.assign(stl, right_line);
                }
                if ((i === +(selValBase.i))&&(j === +(selValBase.j))){
                    stl.color = "#1ab394";
                    scale = "selVal";
                }
                row.push(<div className={"column"} style={stl} key={i*this.state.table.CAGR.length+j}>
                    <div className={scale} onTouchStart={() => this.handleTouch(i,j)}>{this.state.table.data[i*this.state.table.CAGR.length+j].value}</div>
                </div>)
            }
            table.push(<div className={"row"} key={i}>{row}</div>)
        }
        return table
    };


    render() {
        return (
            <Fade in={true} timeout={{enter: 300, exit:300}}>
                <div className={"table"} style={{color: this.props.templ.primary.textValueNormal,   position: "relative", width: "100%",   height: "96%"}}>{this.tableConstructor()}</div>
            </Fade>
        )
    }
}

export default TablePage;
