import React from "react";
import './button.css';




export function AddToCardButton(props) {
    const {buttonText, buttonAddCounter, onIncrease, onDecrease} = props;
    return <> 
        {
            buttonAddCounter > 0 
            ? 
                <div className="meter-crontroller-button">
                    <button onClick={onDecrease} className="decrease-value">-</button>
                    <p className="counter-value">{buttonAddCounter}</p>
                    <button onClick={onIncrease} className="increase-value">+</button>
                </div> 
            : 
                <button className="base-button" onClick={onIncrease}>{buttonText}</button>
        }
    </>
}
