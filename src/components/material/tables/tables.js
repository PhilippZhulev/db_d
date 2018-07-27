import React, { Component } from 'react';

class SuperTable extends Component {

    constructor(props) {
        super(props);
    }

    eachItems = (item, i) => {
        return (
            <div key={i} className="super_table__item">
                {item}
            </div>
        )
    }

    eachChildren = (arr) => {
        if(typeof arr !== "undefined") {
            return (
                <div className="table__childrens">
                    {arr.map(this.eachRows)}
                </div>
            )
        }
    }

    eachRows = (item, i) => {
        return (
            <div
                key={i}
                className={"super_table__row" + ((typeof item.rowClass !== "undefined") ? " " + item.rowClass : "")}>
                <div>
                    {item.items.split("|").map(this.eachItems)}
                </div>
                {this.eachChildren(item.children)}
            </div>
        )
    }

    render() {
        return (
            <div className="super__table">
                {this.props.options.map(this.eachRows)}
            </div>
        );
    }
}

export default SuperTable;
