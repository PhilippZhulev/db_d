import React, { Component } from 'react';
import MultiLine from '../../components/charts/MultyLineCharts';
import Model from '../../models/model.js';
import {withStyles} from "@material-ui/core/styles";
import Close from '@material-ui/icons/Close';

const tilesBind = Model.tilesBind();

const styles = theme => ({
    popup : {
        top: -67,
        left: 0,
        width: "100%",
        height: "calc(100% + 70px)",
        zIndex: 9000,
        opacity: 0,
        position: "absolute",
        transform:"scale(0)",
        background: "#29353e"
    },
    close : {
        width: 40,
        height: 40,
        position: "absolute",
        right: 0,
        top: 15
    },
    closeIcon: {
        width: 40,
        height: 40,
        fill: "#fff"
    }
});

class Tile extends Component {

    prec = 0;

    state = {
      popup: false,
      popFade: { transform: "scale(0)", opacity: 0, transition: "all 300ms ease-in-out"}
    };

    componentDidMount = () => {
        this.setState({popFade: {transform: "scale(1)", opacity: 1, transition: "all 300ms ease-in-out"}})
    };

    componentWillMount = () => {
        this.setState({popFade: {transform: "scale(0)", opacity: 0, transition: "all 300ms ease-in-out"}})
    };

    createPopup = (classes, subscribtion, color, postfix) => {
      if(this.state.popup === true) {
        return (
          <section style={this.state.popFade} className={classes.popup}>
              <div className={"popup_content_wrapper"}>
                  <div className={classes.close}>
                    <Close onClick={this.closePopup} className={classes.closeIcon} />
                  </div>
                  <div className={"tile_item__title"+postfix} style={{color: this.props.templ.primary.textValueMain, fontSize: "32px"}}>
                      {tilesBind[this.props.func].title}<span style={{color: this.props.templ.primary.textValueNormal, fontSize: "28px"}}>{((tilesBind[this.props.func].mera === "") ? "" : ", ")+tilesBind[this.props.func].mera}</span>
                  </div>
                  <div className="values_wrapper main_tile">
                      {this.setValuePopup(postfix, subscribtion, color)}
                  </div>
                  <MultiLine
                      options={{
                          grId:"line",
                          titles:["Стратегия 2020", "Моделирование", "Базовая версия"],
                          geometry: {width:"88%", height:"90%"},
                          //colors: (this.props.isSmall) ? ["#727CF5","#1ab394"] : ["#f8ac59","#727CF5","#1ab394"],
                          colors: (this.props.isSmall) ? this.graphcolor : ["#727CF5","#f8ac59","#1ab394"],
                          legend: (!this.props.isSmall),
                          type: "smoothedLine",
                          labelPosition:(this.props.isSmall) ? ["top","bottom"] : ["top","top", "bottom"],
                          label: this.label,
                          thickness: (this.props.isSmall) ? 1 : 2,
                          isBig: (!this.props.isSmall)
                      }}
                      templ={this.props.templ}
                      func={this.props.func}
                      page={this.props.page}
                      grId={this.props.grId}
                      data={this.props.data[this.props.page][this.props.func]}
                      prec={this.prec}
                  />
              </div>
          </section>
        );
      }else {
        return <section style={this.state.popFade} />
      }
    };

    openPopup = () => {
      this.setState({popup: true});
    };

    closePopup = () => {
      this.setState({popup: false});
    };

    setValue = (postfix, subscribtion, color) => {
        let values = [];
        let prec = 1;
        if ((this.props.func === "EPS") || (this.props.func === "COR")) {
            prec = 2;
        } else if(((this.props.func === "OPEX")&&(this.props.page === "ALL"))||((this.props.func === "CHIS")&&(this.props.page === "ALL"))){
            prec = 0;
        }else{
            prec = 1;
        }
        this.prec = prec;

        let graphcolor = ["#f8ac59","#1ab394"];
        let label = true;
        if(((this.props.func === "CIR")&&(this.props.page === "ALL"))||((this.props.func === "CHIS")&&(this.props.page === "ALL"))){
             graphcolor = ["#727CF5","#f8ac59","#1ab394"];
             label = false;
        }
        this.graphcolor = graphcolor;
        this.label = label;

        let tileCalc = Model.tileCalc(this.props.func, this.props.page, this.props.data, this.props.date, tilesBind[this.props.func].mera, prec);

        values.unshift(
            <div key={0} className={"tile_item__value"+postfix+" value_flex"} style={{color: this.props.templ.primary.textValueMain}}>
                <div>
                    {/*{(zeroedVal === null) ? tileCalc.mainVal : zeroedVal}*/}
                    {tileCalc.mainVal}
                </div>
                <div>
                    <span className="subscribe" style={{color: color}}>{(this.props.addSubscr !== undefined ? this.props.addSubscr : "1")}</span>
                    <span style={{color:(tileCalc.smallVal === "(0.0%)" || tileCalc.smallVal === "(NaN%)" || tileCalc.smallVal === "(0%)" || tileCalc.smallVal === "(0.00%)" || tileCalc.smallVal === "(NaN)" || tileCalc.smallVal === "(0.0)" || tileCalc.smallVal === "(0)" || tileCalc.smallVal === "(0.00)") ? this.props.templ.primary.textValueNormal : this.props.templ.primary.textValuePerc}}>
                        {tileCalc.smallVal}
                    </span>
                </div>
            </div>
        );

        return values

    };

    setValuePopup = (postfix, subscribtion, color) => {
        let values = [];
        let prec = 1;
        if ((this.props.func === "EPS") || (this.props.func === "COR")) {
            prec = 2;
        } else if(((this.props.func === "OPEX")&&(this.props.page === "ALL"))||((this.props.func === "CHIS")&&(this.props.page === "ALL"))){
            prec = 0;
        }else{
            prec = 1;
        }
        this.prec = prec;

        let graphcolor = ["#f8ac59","#1ab394"];
        let label = true;
        if(((this.props.func === "CIR")&&(this.props.page === "ALL"))||((this.props.func === "CHIS")&&(this.props.page === "ALL"))){
            graphcolor = ["#727CF5","#f8ac59","#1ab394"];
            label = false;
        }
        this.graphcolor = graphcolor;
        this.label = label;

        let tileCalc = Model.tileCalc(this.props.func, this.props.page, this.props.data, this.props.date, tilesBind[this.props.func].mera, prec);

        values.unshift(
            <div key={0} className={"tile_item__value"+postfix+" value_flex"} style={{color: this.props.templ.primary.textValueMain, fontSize: "76px", lineHeight:"76px"}}>
                <div>
                    {/*{(zeroedVal === null) ? tileCalc.mainVal : zeroedVal}*/}
                    {tileCalc.mainVal}
                </div>
                <div>
                    <span className="subscribe" style={{color: color, lineHeight:"36px"}}>{(this.props.addSubscr !== undefined ? this.props.addSubscr : "1")}</span>
                    <span style={{color:(tileCalc.smallVal === "(0.0%)" || tileCalc.smallVal === "(NaN%)" || tileCalc.smallVal === "(0%)" || tileCalc.smallVal === "(0.00%)" || tileCalc.smallVal === "(NaN)" || tileCalc.smallVal === "(0.0)" || tileCalc.smallVal === "(0)" || tileCalc.smallVal === "(0.00)") ? this.props.templ.primary.textValueNormal : this.props.templ.primary.textValuePerc, fontSize:"32px", lineHeight:"37px"}}>
                        {tileCalc.smallVal}
                    </span>
                </div>
            </div>
        );

        return values

    };

    render(){
        const postfix = (this.props.isSmall) ? "_small" : "";
        let subscribtion = "1";
        let color = "rgba(0,0,0,0)";

        const { classes } = this.props;

        return(
            <div className={"tile_item_"+this.props.tileNum}>
                <div className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                    <div onClick={this.openPopup} className={"tile_item__title"+postfix} style={{color: this.props.templ.primary.textValueMain}}>
                        {tilesBind[this.props.func].title}<span style={{color: this.props.templ.primary.textValueNormal}}>{((tilesBind[this.props.func].mera === "") ? "" : ", ")+tilesBind[this.props.func].mera}</span>
                    </div>
                    <div className="values_wrapper main_tile">
                        {this.setValue(postfix, subscribtion, color)}
                    </div>
                    <MultiLine
                        options={{
                            grId:"line",
                            titles:["Стратегия 2020", "Моделирование", "Базовая версия"],
                            geometry: {width:"88%", height:"90%"},
                            //colors: (this.props.isSmall) ? ["#727CF5","#1ab394"] : ["#f8ac59","#727CF5","#1ab394"],
                            colors: (this.props.isSmall) ? this.graphcolor : ["#727CF5","#f8ac59","#1ab394"],
                            legend: (!this.props.isSmall),
                            type: "smoothedLine",
                            labelPosition:(this.props.isSmall) ? ["top","bottom"] : ["top","top", "bottom"],
                            label: this.label,
                            thickness: (this.props.isSmall) ? 1 : 2,
                            isBig: (!this.props.isSmall)
                        }}
                        templ={this.props.templ}
                        func={this.props.func}
                        page={this.props.page}
                        grId={this.props.grId}
                        data={this.props.data[this.props.page][this.props.func]}
                        prec={this.prec}
                    />
                </div>
                {this.createPopup(classes, subscribtion, color, postfix)}
            </div>
        )
    }
}

export default withStyles(styles)(Tile);