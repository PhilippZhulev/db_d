import React, { Component } from 'react';
import Tile from './modules/tile';

class Opex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.fluxData,
            funcs: ["OPEX_op","PERS_op","IT_op","NEDV_op","BIS_op","MAR_op","PROC_op"],
            templ: this.props.templ
        };
    }

    tiles = () => {
        return this.state.funcs.map((value,index)=>{
            const isSmall = (index !== 0);
            return (
                <Tile
                    key = {index}
                    tileNum = {index + 1}
                    page = "OPEX"
                    isSmall = {isSmall}
                    func={value}
                    templ = {this.props.templ}
                    data = {this.props.fluxData.data}
                />
            )
        });
    };

    render() {
        return (
            <div className="tiles_container">
                {this.tiles(this.state)}
            </div>
        )
    }
}

export default Opex;
