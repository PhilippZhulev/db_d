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
                    <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                        <div className="tile_item__title" style={{color: this.props.templ.primary.textValueMain}}>
                            {dataBank.PI.title}
                        </div>
                        <div className="values_wrapper">
                            <div className="tile_item__value" style={{color: this.props.templ.primary.textValueMain}}>
                                {dataBank.PI.value}<div><span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.PI.smallValue}</span></div>
                            </div>
                        </div>
                        <MultiLine
                            options={dataBank.PI.options}
                            templ={this.props.templ}
                        />
                    </div>
                </div>
                <div className="tile_item_2">
                    <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                        <div className="tile_item__title_small" style={{color: this.props.templ.primary.textValueMain}}>
                            {dataBank.INC.title}
                        </div>
                        <div className="values_wrapper">
                            <div className="tile_item__value_small" style={{color: this.props.templ.primary.textValueMain}}>
                                {dataBank.INC.value}<span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.INC.smallValue}</span>
                            </div>
                        </div>
                        <MultiLine
                            options={dataBank.INC.options}
                            templ={this.props.templ}
                        />
                    </div>
                </div>
                <div className="tile_item_3">
                    <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                        <div className="tile_item__title_small" style={{color: this.props.templ.primary.textValueMain}}>
                            {dataBank.OPEX.title}
                        </div>
                        <div className="values_wrapper">
                            <div className="tile_item__value_small" style={{color: this.props.templ.primary.textValueMain}}>
                                {dataBank.OPEX.value}<span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.OPEX.smallValue}</span>
                            </div>
                        </div>
                        <MultiLine
                            options={dataBank.OPEX.options}
                            templ={this.props.templ}
                        />
                    </div>
                </div>
                <div className="tile_item_4">
                    <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                        <div className="tile_item__title_small" style={{color: this.props.templ.primary.textValueMain}}>
                            {dataBank.CIR.title}
                        </div>
                        <div className="values_wrapper">
                            <div className="tile_item__value_small" style={{color: this.props.templ.primary.textValueMain}}>
                                {dataBank.CIR.value}<span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.CIR.smallValue}</span>
                            </div>
                        </div>
                        <MultiLine
                            options={dataBank.CIR.options}
                            templ={this.props.templ}
                        />
                    </div>
                </div>
                <div className="tile_item_5">
                    <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                        <div className="tile_item__title_small" style={{color: this.props.templ.primary.textValueMain}}>
                            {dataBank.KOM.title}
                        </div>
                        <div className="values_wrapper">
                            <div className="tile_item__value_small" style={{color: this.props.templ.primary.textValueMain}}>
                                {dataBank.KOM.value}<span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.KOM.smallValue}</span>
                            </div>
                        </div>
                        <MultiLine
                            options={dataBank.KOM.options}
                            templ={this.props.templ}
                        />
                    </div>
                </div>
                <div className="tile_item_6">
                    <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                        <div className="tile_item__title_small" style={{color: this.props.templ.primary.textValueMain}}>
                            {dataBank.COR.title}
                        </div>
                        <div className="values_wrapper">
                            <div className="tile_item__value_small" style={{color: this.props.templ.primary.textValueMain}}>
                                {dataBank.COR.value}<span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.COR.smallValue}</span>
                            </div>
                        </div>
                        <MultiLine
                            options={dataBank.COR.options}
                            templ={this.props.templ}
                        />
                    </div>
                </div>
                <div className="tile_item_7">
                    <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                        <div className="tile_item__title_small" style={{color: this.props.templ.primary.textValueMain}}>
                            {dataBank.CHIS.title}
                        </div>
                        <div className="values_wrapper">
                            <div className="tile_item__value_small" style={{color: this.props.templ.primary.textValueMain}}>
                                {dataBank.CHIS.value}<span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.CHIS.smallValue}</span>
                            </div>
                        </div>
                        <MultiLine
                            options={dataBank.CHIS.options}
                            templ={this.props.templ}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
