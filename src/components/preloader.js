import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: 7,
    },
    preloaderStyles: {
        background: '#1f272d',
        position: "fixed",
        bottom: 15,
        left: 15,
        height: 50,
        width: 200,
        borderRadius: 4
    },
    preloaderText: {
        color: "#fff",
        display: "block",
        float: "right",
        margin: "17px 10px 16px 10px"
    }
});

function Preloader (props)  {

    const { classes } = props;

    if(props.bool === true) {
        return (
            <div className={classes.preloaderStyles}>
                <CircularProgress className={classes.progress} color="secondary" size={36} />
                <span className={classes.preloaderText}>Обновление данных ...</span>
            </div>
        );
    }else {
        return <div/>
    }
}

Preloader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Preloader);