import { useEffect, useState } from "react";
import CardList from "./presentation";
import React from "react";



export default function CardContainer() {
    const [dataLoded, setDataLoaded] = useState(false);
    const [storeData, setStoreData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myResponse = await fetch('https://fakestoreapi.com/products')
                const data = await myResponse.json();
                setStoreData(data);
                setDataLoaded(true);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);



    return <>
        
        {/* {dataLoded ?  <div className="card-list"><CardList data={storeData}/></div> : <p>Loading...</p>} */}
    </>
}
