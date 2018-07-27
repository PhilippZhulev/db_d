import React, { Component } from 'react';

/**
 * legend item
 *
 * @version 1.0.0
 * @author [Volchanskiy Andrey]
 */
////sdsdsdsd
class Legend extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const legendItems = this.props.options.colors.map((color,index)=>
            <div key={index} className="legend_item">
                <div className = "legend_color" style={{backgroundColor: color}}></div>
                <div className = "legend_text">{this.props.options.titles[index]}</div>
            </div>
        );

        return (<div className="legend_item_items">{legendItems}</div>);
    }
}

export default Legend;
