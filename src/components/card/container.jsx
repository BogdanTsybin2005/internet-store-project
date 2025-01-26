import { useEffect, useState } from "react";
import CardList from "./presentation";
import React from "react";
import { ButtonForFilter } from "../button/container";
import Header from "../header";
import headerLogo from '../../components/img/pictures/header-logo.png';



export default function CardContainer() {
    const [dataLoded, setDataLoaded] = useState(false);
    const [storeData, setStoreData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myResponse = await fetch('https://fakestoreapi.com/products')
                const data = await myResponse.json();
                setStoreData(data);
                setFilteredData(data)
                setDataLoaded(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []); 

    const filterDataByCategory = (categoryName) => {
        setFilteredData(storeData.filter((item) => {
            return item.category === categoryName
        }))
    }
    
    const resetData = () => {
        setFilteredData(storeData);
    }

    return <>
        <Header>
            <div className="header-logo">
                <img 
                    src={headerLogo} 
                    alt="header logo should be just right here!." 
                />
            </div>
            <div className="header-buttons">
                <ButtonForFilter 
                    buttonText="Reset filter"
                    onFilterAfterClick={resetData}
                />
                {["men's clothing", "jewelery", "electronics", "women's clothing"].map((categoryName) => {
                    return <ButtonForFilter buttonText={categoryName} onFilterAfterClick={() => filterDataByCategory(categoryName)}/>
                })}
            </div>
        </Header>
        {dataLoded ?  <div className="card-list"><CardList data={filteredData}/></div> : <p>Loading...</p>}
    </>
}
