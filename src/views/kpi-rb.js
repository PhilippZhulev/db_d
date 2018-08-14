import React, { Component } from 'react';
import Tile from './modules/tile';

class Rb extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.fluxData,
            funcs: ["PI","INC","OPEX","CIR","KOM","COR","CHIS"],
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
                    page = "RB"
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

export default Rb;
