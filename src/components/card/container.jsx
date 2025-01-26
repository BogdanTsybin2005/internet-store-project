import { useEffect, useState } from "react";
import CardList from "./presentation";
import React from "react";
import { ButtonForFilter } from "../button/container";
import Header from "../header";
import loadingIcon from '../../components/img/pictures/loading.png';



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
            <div className="header-buttons">
                <ButtonForFilter 
                    buttonText="Reset filter"
                    onFilterAfterClick={resetData}
                />
                {["men's clothing", "women's clothing", "electronics", "jewelery"].map((categoryName) => {
                    return <ButtonForFilter buttonText={categoryName} onFilterAfterClick={() => filterDataByCategory(categoryName)}/>
                })}
            </div>
        </Header>
        {dataLoded ?  <div className="card-list"><CardList data={filteredData}/></div> : <div className="load-icon"><img src={loadingIcon} alt="loading icon" /></div>}
    </>
}
