import React, { Component, PropTypes } from 'react';

import injectSheet from 'react-jss';

import InlineSVG from 'svg-inline-react';

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
        fontSize: 12,
        position: "relative"
    },
    legend_color: {
        '& svg':{
            width: 25,
            height: 7,
            display: "inline-flex",
            position: "absolute",
            left: -31,
            margin:{
                top: 13
            }
        },
        position: "absolute",
        top: -3
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
        function makeSvg(color) {return `<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg8"
   version="1.1"
   viewBox="0 0 209.8111 53.875408"
   height="53.875408mm"
   width="209.8111mm">
  <defs
     id="defs2" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     transform="translate(-0.16470957,-69.594934)"
     id="layer1">
    <g
       id="g4550">
      <path
         style="fill:`
         +color+
         `;stroke:`+color+`;stroke-width:16.11760139;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="M 0.16470957,96.811819 H 80.16471"
         id="path3713" />
      <path
         style="fill:`+color+`;stroke:`+color+`;stroke-width:15.13335419;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 129.9758,96.8115 h 80"
         id="path3713-0" />
      <circle
         style="fill:`+color+`;stroke-width:29.31826973;stroke-miterlimit:4;stroke-dasharray:none"
         id="path4545"
         cx="105.60244"
         cy="96.532639"
         r="20.0" />
    </g>
  </g>
</svg>
      `};

        const {classes, children} = this.props;
        const legendItems = this.props.options.colors.map((color,index)=>
            <div key={index} className={classes.legend_item}>
                <span className = {classes.legend_text}>

                        <InlineSVG className={classes.legend_color} src={makeSvg(color)} />
                    {this.props.options.titles[index]}</span>
            </div>
        );
        return (<div className={classes.legend_item_items}>{legendItems}</div>);
    }
}

export default injectSheet(styles)(Legend);
