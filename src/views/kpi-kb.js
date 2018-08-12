import React, { Component } from 'react';
import Tile from './modules/tile';


class Kb extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const funcs = ["PI","INC","OPEX","CIR","KOM","COR","CHIS"];
        const templ = this.props.templ;
        let tiles = funcs.map(
            (value,index)=>{
                const isSmall = (index==0) ? false : true;
                return(
                    <Tile
                        key={index}
                        tileNum = {index + 1}
                        page = "CB"
                        addSubscr = "КБ"
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

export default Kb;
