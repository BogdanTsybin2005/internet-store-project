import { useEffect, useState } from "react";
import CardList from "./presentation";
import React from "react";
import { ButtonForFilter } from "../button/container";
import Header from "../header";
import loadingIcon from '../../components/img/pictures/loading.png';
import ShoppingBasketButton from "../button/shoppingBasketButton";
import CartContainer from "../cart/CartContainer";
import { useCart } from "../../context/CartContext";



export default function CardContainer() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [storeData, setStoreData] = useState([]);
    const [isFilterWorked, setIsFilterWorked] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const {cart} = useCart();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const myResponse = await fetch('https://fakestoreapi.com/products');
                const data = await myResponse.json();
                setStoreData(data);
                setFilteredData(data);
                setDataLoaded(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const filterDataByCategory = (categoryName) => {
        setFilteredData(storeData.filter((item) => item.category === categoryName));
        setIsFilterWorked(true);
    };

    const resetData = () => {
        setFilteredData(storeData);
        setIsFilterWorked(false);
    };

    return (
        <>
            <Header>
                <div className="header-buttons">
                    {isFilterWorked && <ButtonForFilter buttonText="Reset filter" onFilterAfterClick={resetData} />}
                    {["men's clothing", "women's clothing", "electronics", "jewelery"].map((categoryName) => (
                        <ButtonForFilter key={categoryName} buttonText={categoryName} onFilterAfterClick={() => filterDataByCategory(categoryName)} />
                    ))}
                    <ShoppingBasketButton functionAfterClick={() => console.log('Basket Click')} />
                </div>
            </Header>
            {(cart.length > 0) && <CartContainer />}
            {dataLoaded ? <div className="card-list"><CardList data={filteredData} /></div> : <div className="load-icon"><img src={loadingIcon} alt="Loading" /></div>}
        </>
    );
}
