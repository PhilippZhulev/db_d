import React, { Component } from 'react';
import Tile from './modules/tile';
import Fade from "@material-ui/core/Fade";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.fluxData,
            funcs: ["PI","TIER","OPEX","CIR","ROE","COR","CHIS"],
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
                    page = "ALL"
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

export default Home;
