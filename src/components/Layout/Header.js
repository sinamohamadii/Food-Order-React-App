import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import mealsPhoto from "../../assets/meals.jpg";

const Header = props => {
    return (
        <>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={props.onCartToggle}/>
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsPhoto} alt="A table full of dlicious foods" />
            </div>
        </>
    );
};

export default Header;