import React, { Component } from 'react';
import Tile from './modules/tile';
import store, {getState, change} from '../reduser';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.dataStates.data,
            funcs: ["PI","INC","OPEX","CIR","KOM","COR","CHIS"],
            templ: this.props.templ
        };

        store.subscribe(() => {
            if (change === "driver_result") {
                window.updateState(["return_driver_to_lumira", ""+getState.driverId+","+getState.value], () => {
                    return this.setState({data:  window.obj.dummyData.data});
                });
            }
        });
    }

    tiles = (states) => {
        return this.state.funcs.map((value,index)=>{
            const isSmall = (index !== 0);
            return (
                <Tile
                    key = {index}
                    tileNum = {index + 1}
                    page = "ALL"
                    isSmall = {isSmall}
                    func={value}
                    templ = {states.templ}
                    data = {states.data}
                />
            )
        });
    };

    render() {
        console.log("tile_data");
        console.log(this.state.data);
        return (
            <div className="tiles_container">
                {this.tiles(this.state)}
            </div>
        )
    }
}

export default Home;
