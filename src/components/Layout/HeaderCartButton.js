import { useContext, useEffect, useState } from "react";
import cartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = props => {
    const [btnIsBop, setBtnIsBop] = useState(false);

    const cartCtx = useContext(cartContext);

    const { items } = cartCtx;

    useEffect(() => {
        if (items.length === 0) {
            return;
        };

        setBtnIsBop(true);

        const timer = setTimeout(() => {
            setBtnIsBop(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    const numberOfCartItems = items.reduce(
        (numberOfItems, currentItem) => numberOfItems + currentItem.amount, 0
    );

    const btnClasses = `${classes.button} ${btnIsBop && classes.bump}`;

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;