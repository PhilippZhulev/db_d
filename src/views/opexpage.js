import React, { Component } from 'react';
import Tile from './modules/tile';
import Fade from "@material-ui/core/Fade";

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
            <Fade in={true} timeout={{enter: 300, exit:300}}>
                <div className="tiles_container">
                    {this.tiles(this.state)}
                </div>
            </Fade>
        )
    }
}

export default Opex;
