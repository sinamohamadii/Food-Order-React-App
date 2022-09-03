import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const BackDrop = props =>{
    return <div className={classes.backdrop} onClick={props.onCartToggle}/>;
};

const ModalOverlay = props => {
    return(
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    );
};

const Modal = props => {
    const portalElement = document.getElementById("overlays");

    return(
        <>
            {ReactDOM.createPortal(<BackDrop onCartToggle={props.onCartToggle} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    );
};

export default Modal;