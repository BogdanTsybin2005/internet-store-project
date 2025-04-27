import { useEffect, useState } from "react";
import CardList from "./presentation";
import React from "react";
import { ButtonForFilter } from "../button/container";
import Header from "../header";
import loadingIcon from '../../components/img/pictures/loading.png';
import ShoppingBasketButton from "../button/shoppingBasketButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function CardContainer() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [storeData, setStoreData] = useState([]);
    const [isFilterWorked, setIsFilterWorked] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const navigateToOtherPage = useNavigate();


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
                    <div className="header-buttons">
                        <Link to="/login" className="auth-button">Login</Link>
                        <Link to="/registration" className="auth-button">Register</Link>
                    </div>
                    <ShoppingBasketButton functionAfterClick={() => navigateToOtherPage('/cart')} />
                </div>
            </Header>
            {dataLoaded ? <div className="card-list"><CardList data={filteredData} /></div> : <div className="load-icon"><img src={loadingIcon} alt="Loading" /></div>}
        </>
    );
}
