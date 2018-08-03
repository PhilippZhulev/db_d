import React, { Component } from 'react';
import Tile from './modules/tile';


class Opex extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const funcs = ["OPEX_op","PERS_op","IT_op","NEDV_op","BIS_op","MAR_op","PROC_op"];
        const templ = this.props.templ;
        let tiles = funcs.map(
            (value,index)=>{
                const isSmall = (index==0) ? false : true;
                return(
                    <Tile
                        key={index}
                        tileNum = {index + 1}
                        page = "home"
                        isSmall = {isSmall}
                        func={value}
                        templ = {templ}
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
