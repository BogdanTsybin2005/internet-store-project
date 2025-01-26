import {ButtonContainer} from "../button/container";
import React from "react";
import './card.css';



export default function CardList(props) {
    const {data} = props;

    return <>
        {data.map((item) => {
            return <div className="card" key={item.id}>
                <div className="card-image">
                    <img src={item.image} alt="img" />
                </div>
                <div className="card-text-content">
                    <div>
                        <p className="card-category">{item.category}</p>
                        <p className="card-title">{item.title}</p>
                    </div>
                    <div>
                        <p className="card-price">${item.price}</p>
                        <ButtonContainer/>
                    </div>
                </div>
            </div>
        })}
    </>
}
