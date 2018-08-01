import React, { Component } from 'react';
import MultiLine from '../components/charts/MultyLineCharts';
import dataBank from '../secret/data_bank';


class Cib extends Component {
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
                        <div className="values_wrapper main_tile">
                            <div className="tile_item__value value_flex" style={{color: this.props.templ.primary.textValueMain}}>
                                <div>
                                    {dataBank.PI.valueCIB}
                                </div>
                                <div>
                                    <span className="subscribe_big" style={{color: this.props.templ.primary.textValueNormal}}>CIB</span>
                                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.PI.smallValueCIB}</span>
                                </div>
                            </div>
                            <div className="vLineBig"></div>
                            <div className="tile_item__value value_flex" style={{color: this.props.templ.primary.textValueMain}}>
                                <div>
                                    {dataBank.PI.value}
                                </div>
                                <div>
                                    <span className="subscribe_big" style={{color: this.props.templ.primary.textValueNormal}}>total</span>
                                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.PI.smallValue}</span>
                                </div>
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
                        <div className="values_wrapper main_tile">
                            <div className="tile_item__value_small value_flex" style={{color: this.props.templ.primary.textValueMain}}>
                                <div>
                                    {dataBank.INC.valueCIB}
                                </div>
                                <div>
                                    <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>CIB</span>
                                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.INC.smallValueCIB}</span>
                                </div>
                            </div>
                            <div className="vLine"></div>
                            <div className="tile_item__value_small value_flex" style={{color: this.props.templ.primary.textValueMain}}>
                                <div>
                                    {dataBank.INC.value}
                                </div>
                                <div>
                                    <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>total</span>
                                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.INC.smallValue}</span>
                                </div>
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
                        <div className="values_wrapper main_tile">
                            <div className="tile_item__value_small value_flex" style={{color: this.props.templ.primary.textValueMain}}>
                                <div>
                                    {dataBank.OPEX.valueCIB}
                                </div>
                                <div>
                                    <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>CIB</span>
                                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.OPEX.smallValueCIB}</span>
                                </div>
                            </div>
                            <div className="vLine"></div>
                            <div className="tile_item__value_small value_flex" style={{color: this.props.templ.primary.textValueMain}}>
                                <div>
                                    {dataBank.OPEX.value}
                                </div>
                                <div>
                                    <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>total</span>
                                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.OPEX.smallValue}</span>
                                </div>
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
                        <div className="values_wrapper main_tile">
                            <div className="tile_item__value_small value_flex" style={{color: this.props.templ.primary.textValueMain}}>
                                <div>
                                    {dataBank.CIR.valueCIB}
                                </div>
                                <div>
                                    <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>CIB</span>
                                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.CIR.smallValueCIB}</span>
                                </div>
                            </div>
                            <div className="vLine"></div>
                            <div className="tile_item__value_small value_flex" style={{color: this.props.templ.primary.textValueMain}}>
                                <div>
                                    {dataBank.CIR.value}
                                </div>
                                <div>
                                    <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>total</span>
                                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.CIR.smallValue}</span>
                                </div>
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
                        <div className="values_wrapper main_tile">
                            <div className="tile_item__value_small value_flex" style={{color: this.props.templ.primary.textValueMain}}>
                                <div>
                                    {dataBank.KOM.valueCIB}
                                </div>
                                <div>
                                    <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>CIB</span>
                                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.KOM.smallValueCIB}</span>
                                </div>
                            </div>
                            <div className="vLine"></div>
                            <div className="tile_item__value_small value_flex" style={{color: this.props.templ.primary.textValueMain}}>
                                <div>
                                    {dataBank.KOM.value}
                                </div>
                                <div>
                                    <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>total</span>
                                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.KOM.smallValue}</span>
                                </div>
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
                        <div className="values_wrapper main_tile">
                            <div className="tile_item__value_small value_flex" style={{color: this.props.templ.primary.textValueMain}}>
                                <div>
                                    {dataBank.COR.valueCIB}
                                </div>
                                <div>
                                    <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>CIB</span>
                                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.COR.smallValueCIB}</span>
                                </div>
                            </div>
                            <div className="vLine"></div>
                            <div className="tile_item__value_small value_flex" style={{color: this.props.templ.primary.textValueMain}}>
                                <div>
                                    {dataBank.COR.value}
                                </div>
                                <div>
                                    <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>total</span>
                                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.COR.smallValue}</span>
                                </div>
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
                        <div className="values_wrapper main_tile">
                            <div className="tile_item__value_small value_flex" style={{color: this.props.templ.primary.textValueMain}}>
                                <div>
                                    {dataBank.CHIS.valueCIB}
                                </div>
                                <div>
                                    <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>CIB</span>
                                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.CHIS.smallValueCIB}</span>
                                </div>
                            </div>
                            <div className="vLine"></div>
                            <div className="tile_item__value_small value_flex" style={{color: this.props.templ.primary.textValueMain}}>
                                <div>
                                    {dataBank.CHIS.value}
                                </div>
                                <div>
                                    <span className="subscribe" style={{color: this.props.templ.primary.textValueNormal}}>total</span>
                                    <span style={{color: this.props.templ.primary.textValueNormal}}>{dataBank.CHIS.smallValue}</span>
                                </div>
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

export default Cib;
