import React, { Component } from 'react';
import Tile from './modules/tile';
import store, {getState, change} from '../reduser';

let data={};

store.subscribe(() => {
    if (change === "first_include") {
        data = getState.data.data;
    }
});

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: data,
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
        return (
            <div className="tiles_container">
                {this.tiles(this.state)}
            </div>
        )
    }
}

export default Home;
