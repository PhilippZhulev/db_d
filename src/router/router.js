import React, { Component } from 'react';
import Home from '../views/homepage';

class Routers extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let include = null;
        let changeCrumbs = ["Главная"];

        switch (this.props.page) {
            case "home" :
            include = <Home data={this.props.data} />;
            break;

            case "opex" :
            include = <Opex data={this.props.data} />;
            changeCrumbs.push(" / Opex");
            break;

            default: include = <Home data={this.props.data} />;
        }

        function newCrumb(item, i) {
            return <li key={i} className="crumbs_item">{item}</li>
        }

        return (
            <div className="body__inner">
                <div className="crumbs">
                    <div className="container">
                        <div className="row">
                            <div className="col xs-12">
                                <ul>{changeCrumbs.map(newCrumb)}</ul>
                            </div>
                        </div>
                    </div>
                </div>
                {include}
            </div>
        );
    }
}

export default Routers;
