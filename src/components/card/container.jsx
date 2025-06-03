import { useEffect, useState, useCallback } from "react";
import CardList from "./presentation";
import { ButtonForFilter } from "../button/container";
import Header from "../header";
import loadingIcon from '../../components/img/pictures/loading.png';
import ShoppingBasketButton from "../button/shoppingBasketButton";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";



export default function CardContainer() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [storeData, setStoreData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isFilterWorked, setIsFilterWorked] = useState(false);
    const [loadingError, setLoadingError] = useState(null);

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        console.time("⏱ fetchData");
        let timeout;
        try {
            timeout = setTimeout(() => {
                setLoadingError("The server is taking too long to respond. Please try again.");
                setDataLoaded(false);
            }, 10000);

            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();

            clearTimeout(timeout);
            setStoreData(data);
            setFilteredData(data);
            setDataLoaded(true);
            setLoadingError(null);
        } catch (error) {
            clearTimeout(timeout);
            console.error(error);
            setLoadingError("Failed to load data. Please check your connection.");
        } finally {
            console.timeEnd("⏱ fetchData");
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        document.body.style.overflow = loadingError ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [loadingError]);

    const filterDataByCategory = useCallback((categoryName) => {
        setFilteredData(storeData.filter(item => item.category === categoryName));
        setIsFilterWorked(true);
    }, [storeData]);

    const resetData = useCallback(() => {
        setFilteredData(storeData);
        setIsFilterWorked(false);
    }, [storeData]);

    return (
        <>
            <Header
                isFilterWorked={isFilterWorked}
                resetData={resetData}
                filterDataByCategory={filterDataByCategory}
            >
                <>
                    {isFilterWorked && (
                        <ButtonForFilter buttonText="Reset filter" onFilterAfterClick={resetData} />
                    )}
                    {["men's clothing", "women's clothing", "electronics", "jewelery"].map(category => (
                        <ButtonForFilter
                            key={category}
                            buttonText={category}
                            onFilterAfterClick={() => filterDataByCategory(category)}
                        />
                    ))}

                    {user ? (
                        <>
                            <Link to="/profile" className="auth-button">Profile</Link>
                            <button className="auth-button" onClick={() => {
                                logout();
                                navigate('/login');
                            }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="auth-button">Login</Link>
                            <Link to="/registration" className="auth-button">Register</Link>
                        </>
                    )}

                    <ShoppingBasketButton functionAfterClick={() => navigate('/cart')} />
                </>
            </Header>

            {dataLoaded ? (
                <div className="card-list">
                    <CardList data={filteredData} />
                </div>
            ) : loadingError ? (
                <div className="full-error-screen">
                    <div className="load-error">
                        <p>{loadingError}</p>
                        <button className="retry-button" onClick={() => window.location.reload()}>Retry</button>
                    </div>
                </div>
            ) : (
                <div className="load-icon">
                    <img src={loadingIcon} alt="Loading..." />
                </div>
            )}
        </>
    );
}
