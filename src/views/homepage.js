import React, { Component } from 'react';
import MultiLine from '../components/charts/MultyLineCharts';
import dataBank from '../secret/data_bank';


class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tiles_container">
                <div className="tile_item_1">
                    <div className="tile_item__inner">
                        <div className="tile_item__title">
                            {dataBank.PI.title}
                        </div>
                        <div className="tile_item__value">
                            {dataBank.PI.value}<span>{dataBank.PI.smallValue}</span>
                        </div>
                        <MultiLine
                            options={dataBank.PI.options}
                        />
                    </div>
                </div>
                <div className="tile_item_2">
                    <div className="tile_item__inner">
                        <div className="tile_item__title_small">
                            {dataBank.INC.title}
                        </div>
                        <div className="tile_item__value_small">
                            {dataBank.INC.value}<span>{dataBank.INC.smallValue}</span>
                        </div>
                        <MultiLine
                            options={dataBank.INC.options}
                        />
                    </div>
                </div>
                <div className="tile_item_3">
                    <div className="tile_item__inner">
                        <div className="tile_item__title_small">
                            {dataBank.OPEX.title}
                        </div>
                        <div className="tile_item__value_small">
                            {dataBank.OPEX.value}<span>{dataBank.OPEX.smallValue}</span>
                        </div>
                        <MultiLine
                            options={dataBank.OPEX.options}
                        />
                    </div>
                </div>
                <div className="tile_item_4">
                    <div className="tile_item__inner">
                        <div className="tile_item__title_small">
                            {dataBank.CIR.title}
                        </div>
                        <div className="tile_item__value_small">
                            {dataBank.CIR.value}<span>{dataBank.CIR.smallValue}</span>
                        </div>
                        <MultiLine
                            options={dataBank.CIR.options}
                        />
                    </div>
                </div>
                <div className="tile_item_5">
                    <div className="tile_item__inner">
                        <div className="tile_item__title_small">
                            {dataBank.KOM.title}
                        </div>
                        <div className="tile_item__value_small">
                            {dataBank.KOM.value}<span>{dataBank.KOM.smallValue}</span>
                        </div>
                        <MultiLine
                            options={dataBank.KOM.options}
                        />
                    </div>
                </div>
                <div className="tile_item_6">
                    <div className="tile_item__inner">
                        <div className="tile_item__title_small">
                            {dataBank.COR.title}
                        </div>
                        <div className="tile_item__value_small">
                            {dataBank.COR.value}<span>{dataBank.COR.smallValue}</span>
                        </div>
                        <MultiLine
                            options={dataBank.COR.options}
                        />
                    </div>
                </div>
                <div className="tile_item_7">
                    <div className="tile_item__inner">
                        <div className="tile_item__title_small">
                            {dataBank.CHIS.title}
                        </div>
                        <div className="tile_item__value_small">
                            {dataBank.CHIS.value}<span>{dataBank.CHIS.smallValue}</span>
                        </div>
                        <MultiLine
                            options={dataBank.CHIS.options}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
