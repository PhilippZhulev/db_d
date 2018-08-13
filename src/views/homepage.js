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

        store.subscribe(() => {
            if (change === "driver_result") {
                window.updateState(["return_driver_to_lumira", ""+getState.driverId+","+getState.value], () => {
                    console.log(123123);
                    return this.setState({data:  window.obj.dummyData.data});
                });
            }
        });
    }

    render() {
        const funcs = ["PI","INC","OPEX","CIR","KOM","COR","CHIS"];
        const templ = this.props.templ;
        let tiles = funcs.map(
            (value,index)=>{
                const isSmall = (index !== 0);
                return(
                    <Tile
                        key={index}
                        tileNum = {index + 1}
                        page = "ALL"
                        isSmall = {isSmall}
                        func={value}
                        templ = {templ}
                        data = {data}
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

export default Home;
