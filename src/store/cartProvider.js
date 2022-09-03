import { useReducer } from "react";

import cartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const updatedTotalAmount = state.totalAmount + action.item.amount * action.item.price;

        const exictingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const exictingCartItem = state.items[exictingCartItemIndex];

        let updatedItems;

        if (exictingCartItem) {
            const updatedItem = { ...exictingCartItem, amount: exictingCartItem.amount + action.item.amount };
            updatedItems = [...state.items];
            updatedItems[exictingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        };

        return ({
            items: updatedItems,
            totalAmount: updatedTotalAmount
        });
    }

    if (action.type === "REMOVE") {
        const exictingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const exictingCartItem = state.items[exictingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - exictingCartItem.price;

        let updatedItems;

        if (exictingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else if (exictingCartItem.amount > 1) {
            const updatedItem = { ...exictingCartItem, amount: exictingCartItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[exictingCartItemIndex] = updatedItem;
        };

        return ({
            items: updatedItems,
            totalAmount: updatedTotalAmount
        });
    }

    return defaultCartState;
};


const CartProvider = props => {
    const [cartState, dispatchVartActin] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchVartActin({
            type: "ADD",
            item: item
        });
    };

    const removeItemToCartHandler = id => {
        dispatchVartActin({
            type: "REMOVE",
            id: id
        });
    };

    const cartContextObj = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler
    };

    return (
        <cartContext.Provider value={cartContextObj}>
            {props.children}
        </cartContext.Provider>
    );
};

export default CartProvider;