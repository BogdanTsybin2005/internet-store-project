import { useEffect, useState } from "react";
import CardList from "./presentation";
import React from "react";
import { ButtonForFilter } from "../button/container";
import Header from "../header";
import loadingIcon from '../../components/img/pictures/loading.png';
import ShoppingBasketButton from "../button/shoppingBasketButton";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";



export default function CardContainer() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [storeData, setStoreData] = useState([]);
    const [isFilterWorked, setIsFilterWorked] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const navigateToOtherPage = useNavigate();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [loadingError, setLoadingError] = useState(null);



    useEffect(() => {
        let timeout;
        const fetchData = async () => {
            try {
                timeout = setTimeout(() => {
                    setLoadingError("The server is taking too long to respond. Please try again.");
                    setDataLoaded(false);
                }, 10000);
    
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
    
                clearTimeout(timeout);
                setStoreData(data);
                setFilteredData(data);
                setDataLoaded(true);
                setLoadingError(null);
            } catch (error) {
                clearTimeout(timeout);
                setLoadingError("Failed to load data. Please check your connection.");
                console.error(error);
            }
        };
    
        fetchData();
        return () => clearTimeout(timeout);
    }, []);
    
    useEffect(() => {
        if (loadingError) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [loadingError]);

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
                        {user ? (
                            <>
                            <Link to="/profile" className="auth-button">Profile</Link>
                            <button className="auth-button" onClick={() => {
                                logout();
                                navigate('/login');
                            }}>
                                Logout
                            </button>
                            </>
                        ) : (
                            <>
                            <Link to="/login" className="auth-button">Login</Link>
                            <Link to="/registration" className="auth-button">Register</Link>
                            </>
                        )}
                    </div>
                    <ShoppingBasketButton functionAfterClick={() => navigateToOtherPage('/cart')} />
                </div>
            </Header>
            {
                dataLoaded ? (
                    <div className="card-list">
                        <CardList data={filteredData} />
                    </div>
                ) : loadingError ? (
                    <div className="full-error-screen">
                        <div className="load-error">
                            <p>{loadingError}</p>
                            <button className="retry-button" onClick={() => window.location.reload()}>
                                Retry
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="load-icon">
                        <img src={loadingIcon} alt="Loading" />
                    </div>
                )
            }
        </>
    );
}
