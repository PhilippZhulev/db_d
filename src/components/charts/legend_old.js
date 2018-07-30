import React, { Component } from 'react';

import injectSheet from 'react-jss';

/**
 * legend item
 *
 * @version 1.0.0
 * @author [Volchanskiy Andrey]
 */
////sdsdsdsd

const styles = {
    legend_text: {
        display: "inline-flex",
        padding: 3,
        color: "#aab3b3",
        fontSize: 12
    },
    legend_color: {
        width: 15,
        height: 2,
        display: "inline-flex",
        position: "absolute",
        left: -19,
        margin:{
            top: 13
        }
    },
    legend_item_items : {
        position: "absolute",
        right: 10,
        bottom: 43
    }
}
//@injectSheet(styles)
class Legend extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {classes, children} = this.props;
        const legendItems = this.props.options.colors.map((color,index)=>
            <div key={index} className={classes.legend_item}>
                <span className = {classes.legend_text}><i className = {classes.legend_color} style={{backgroundColor: color}}></i>{this.props.options.titles[index]}</span>
            </div>
        );
        return (<div className={classes.legend_item_items}>{legendItems}</div>);
    }
}

export default injectSheet(styles)(Legend);
