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
        for (let i=0; i<this.state.table.CIR.length; i++){
            let column = [];
            for (let j=0; j<this.state.table.NIM.length;j++){
                // console.log(this.state.table.data[i*this.state.table.NIM.length+j]);
                // console.log(i*this.state.table.NIM.length+j);
                column.push(<div className={"row"} key={i*this.state.table.NIM.length+j}>{this.state.table.data[i*this.state.table.NIM.length+j].value}</div>)
            }
            table.push(<div className={"column"} key={i}>{column}</div>)
        }
        return table
    }

    render() {
        return (
            <Fade in={true} timeout={{enter: 300, exit:300}}>
                <div className={"table"}>{this.tableConstructor()}</div>
            </Fade>
        )
    }
}

export default TablePage;
