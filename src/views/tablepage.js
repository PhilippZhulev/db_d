import React, { Component } from 'react';
import Fade from "@material-ui/core/Fade";

class Cib extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.fluxData,
            funcs: ["PI","INC","OPEX","CIR","KOM","COR","CHIS"],
            templ: this.props.templ
        };
    }

    render() {
        return (
            <Fade in={true} timeout={{enter: 300, exit:300}}>
                <div className="table">
                    <div className="column">
                        <div className="row">1</div>
                        <div className="row">2</div>
                        <div className="row">3</div>
                    </div>
                    <div className="column">
                        <div className="row">4</div>
                        <div className="row">5</div>
                        <div className="row">6</div>
                    </div>
                </div>
            </Fade>
        )
    }
}

export default Cib;
