import React, { Component } from 'react';
import Tile from './modules/tile';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            funcs: ["PI","INC","OPEX","CIR","KOM","COR","CHIS"]
        }
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
                    data = {this.props.data}
                />
            )
        });
    };

    render() {
        return (
            <div className="tiles_container">
                {this.tiles()}
            </div>
        )
    }
}

export default Home;
