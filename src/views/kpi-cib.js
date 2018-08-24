import React, { Component } from 'react';
import Tile from './modules/tile';
import Fade from "@material-ui/core/Fade";

class Cib extends Component {

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
                    addSubscr = "CIB"
                    key = {index}
                    tileNum = {index + 1}
                    page = "CIB"
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

export default Cib;
