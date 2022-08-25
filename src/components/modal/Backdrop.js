import React from 'react';
import classes from "./Modal.module.css";

const Backdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onHide}>
            
        </div>
    );
};

export default Backdrop;
