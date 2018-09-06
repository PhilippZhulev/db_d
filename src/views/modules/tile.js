import React, { Component } from 'react';
import MultiLine from '../../components/charts/MultyLineCharts';
import Model from '../../models/model.js';
import {withStyles} from "@material-ui/core/styles";
import Close from '@material-ui/icons/Close';
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import store from "../../reduser";

const tilesBind = Model.tilesBind();

const styles = theme => ({
    popup : {
        top: -67,
        left: 0,
        width: "100%",
        height: "calc(100% + 70px)",
        zIndex: 9000,
        position: "absolute"
    },
    close : {
        width: 40,
        height: 40,
        position: "absolute",
        right: 0,
        top: 15,
        zIndex: 9999
    },
    closeIcon: {
        width: 40,
        height: 40,
        fill: "#fff"
    }, root: {
        display: 'flex',
        '&$checked': {
            color: 0
        },
    },
    formControl: {
        //margin: theme.spacing.unit * 3,
        color: "white",
        height: "70px",
        width: "250px"
    },
    group_wrapper: {

    },
    group: {
        margin: "14px -37px",
        color: "white",
        display: "-webkit-box",
        //display: "inline",
        webkitBoxOrient: "vertical"
    },
    radio: {color: "red"}
});

class Tile extends Component {

    prec = 0;
constructor(props){

    super(props);

    this.state = {
        popup: false,
        date: this.props.date
    };

    store.subscribe(() => {
        this.setState({date: this.props.date});
    });

};

    handleChangeDate = event => {
        this.setState({ date: event.target.value });
        store.dispatch({
            type: "CHANGE_DATE",
            payload: event.target.value
        });
        console.log(event.target.value);
    };

    createPopup = (classes, subscribtion, color, postfix) => {
      if(this.state.popup === true) {
        return (
          <section style={{background: this.props.templ.primary.tiles}} className={classes.popup}>
              <div className={classes.close} onTouchStart={this.closePopup}>
                <Close style={{fill: this.props.templ.primary.textValueMain}} className={classes.closeIcon} />
              </div>
              <div className={"popup_content_wrapper"}>
                  <div className={"tile_item__title"+postfix} style={{color: this.props.templ.primary.textValueMain, fontSize: "32px"}}>
                      {tilesBind[this.props.func].title}<span style={{color: this.props.templ.primary.textValueNormal, fontSize: "28px"}}>{((tilesBind[this.props.func].mera === "") ? "" : ", ")+tilesBind[this.props.func].mera}</span>
                  </div>
                  <div className="values_wrapper main_tile">
                      {this.setValuePopup(subscribtion, color)}
                  </div>
                  {this.buttonsPopup(this.state)}
                  <MultiLine
                      options={{
                          grId:"line",
                          //titles: ((this.props.isSmall)&&((this.props.page === "ALL")&&((this.props.func !== "CIR")||(this.props.func !== "CHIS")))) ? ["Моделирование", "Базовая версия"] : ["Стратегия 2020", "Моделирование", "Базовая версия"],
                          geometry: {width:"100%", height:"100%"},
                          titles: ((!this.props.isSmall)||((this.props.page === "ALL")&&((this.props.func === "CIR")||(this.props.func === "CHIS")))) ? ["Стратегия 2020", "Моделирование", "Базовая версия"] : ["Моделирование", "Базовая версия"],
                          //colors: (this.props.isSmall) ? ["#727CF5","#1ab394"] : ["#f8ac59","#727CF5","#1ab394"],
                          colors: (this.props.isSmall) ? this.graphcolor : ["#727CF5","#f8ac59","#1ab394"],
                          legend: true,
                          type: "smoothedLine",
                          labelPosition:["top","top", "bottom"],
                          label: this.label,
                          thickness: 2,
                          isBig: true,
                          addFontSize: 2
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
         return <section/>
      }
    };

    openPopup = () => {
      this.setState({popup: true});
    };

    closePopup = () => {
      this.setState({popup: false});
        this.forceUpdate();
    };

    buttonsPopup = () => {
        const { classes } = this.props;
        const years = ["2019", "2020", "2021"];
        return (
            <div className={"buttons_container"} style={{position: "absolute", zIndex: 999, right:"0px", top:"-20px", width:"250px", height:"70px"}}>
                <style>
                    {".radioChecked {color: " + this.props.templ.primary.textValueNormal +"!important}"}
                </style>
            <div className={classes.root}>
                <div className={classes.group_wrapper}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                            aria-label="Gender"
                            name="gender1"
                            className={classes.group}
                            value={this.state.date}
                            onChange={this.handleChangeDate}
                        >
                            {years.map(
                                (value,index)=>{
                                    return(
                                        <FormControlLabel
                                            className={classes.label}
                                            classes={{label: "radioChecked"}}
                                            key={index}
                                            value={String(index)}
                                            control={<Radio className={classes.radio} classes={{root: classes.root,colorPrimary:"radioChecked",colorSecondary:"radioChecked", checked: "radioChecked"}}/>}
                                            label={value}
                                        />
                                    )
                                }
                            )}
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            </div>)
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

    setValuePopup = (subscribtion, color) => {
        let postfix = "";
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
            <div key={0} className={"tile_item__value"+postfix+" value_flex"} style={{color: this.props.templ.primary.textValueMain, fontSize: "60px", lineHeight:"76px"}}>
                <div>
                    {/*{(zeroedVal === null) ? tileCalc.mainVal : zeroedVal}*/}
                    {tileCalc.mainVal}
                </div>
                <div>
                    <span className="subscribe" style={{color: color, lineHeight:"35px"}}>{(this.props.addSubscr !== undefined ? this.props.addSubscr : "1")}</span>
                    <span style={{color:(tileCalc.smallVal === "(0.0%)" || tileCalc.smallVal === "(NaN%)" || tileCalc.smallVal === "(0%)" || tileCalc.smallVal === "(0.00%)" || tileCalc.smallVal === "(NaN)" || tileCalc.smallVal === "(0.0)" || tileCalc.smallVal === "(0)" || tileCalc.smallVal === "(0.00)") ? this.props.templ.primary.textValueNormal : this.props.templ.primary.textValuePerc, fontSize:"30px", lineHeight:"32px"}}>
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
                <div onTouchStart={this.openPopup} className="tile_item__inner" style={{background: this.props.templ.primary.tiles}}>
                    <div className={"tile_item__title"+postfix} style={{color: this.props.templ.primary.textValueMain}}>
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
