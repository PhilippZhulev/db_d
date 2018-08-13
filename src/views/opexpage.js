import React, { Component } from 'react';
import Tile from './modules/tile';
import store, {change, getState} from "../reduser";

let data={};

store.subscribe(() => {

    if (change === "first_include") {
        data = getState.data.data;
    }
});

class Opex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const funcs = ["OPEX_op","PERS_op","IT_op","NEDV_op","BIS_op","MAR_op","PROC_op"];
        const templ = this.props.templ;
        let tiles = funcs.map(
            (value,index)=>{
                const isSmall = (index !== 0);
                return(
                    <Tile
                        key={index}
                        tileNum = {index + 1}
                        grId={index}
                        tileNum = {index + 1}
                        page = "OPEX"
                        isSmall = {isSmall}
                        func={value}
                        templ = {templ}
                        data = {data}
                    />
            )
            }
        );

        return (
            <div className="tiles_container">
                {tiles}
            </div>
        )
    }
}

export default Opex;
