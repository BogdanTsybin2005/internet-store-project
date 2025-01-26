import { AddToCardButton } from "./button";
import { useState } from "react";
import React from "react";


export function ButtonContainer() {
    const [buttonPropCounter, setButtonPropCounter] = useState(0);

    const increaseCounterValue = () => {
        setButtonPropCounter(buttonPropCounter => buttonPropCounter + 1);
    }

    const decreaseCounterValue = () => {
        if (buttonPropCounter >= 0) {
            setButtonPropCounter(buttonPropCounter => buttonPropCounter - 1);
        }
    }

    return <AddToCardButton 
        buttonText='Add to cart' 
        buttonAddCounter={buttonPropCounter} 
        onIncrease={increaseCounterValue}
        onDecrease={decreaseCounterValue}
    />
}

export function ButtonForFilter(props) {
    const {buttonText, onFilterAfterClick} = props;
    return <button 
        className="base-button"
        onClick={onFilterAfterClick}
    >{buttonText}</button>
}
