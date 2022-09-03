import { useRef, useState } from "react";

import Input from "../../UI/Input/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = props => {
    const amountInputRef = useRef();

    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = e => {
        e.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Amount" input={{
                id: "amount",
                type: "number",
                min: "1",
                max: "5",
                step: "1",
                defaultValue: "1"
            }}
                ref={amountInputRef}
            />
            <button type="submit">+ Add</button>
            {!amountIsValid && <p>Please insert a valid number.</p>}
        </form>
    );
};

export default MealItemForm;