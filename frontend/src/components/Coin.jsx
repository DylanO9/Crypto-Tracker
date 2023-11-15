import { useAuthContext } from '../hooks/useAuthContext';
import { useState, useEffect } from 'react';
import * as faIcons from 'react-icons/fa';
import '../assets/styles/coin.css'
import React from 'react';

function Coin (props) {
    const url1 = 'https://coingecko.p.rapidapi.com/simple/price?ids=';
    const url2 = '&vs_currencies=usd&include_last_updated_at=true&include_market_cap=false&include_24hr_change=true&include_24hr_vol=false';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '834b99fcaemsh4f1ff02156e1aecp141eb9jsn6bf831eb2667',
            'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
        }
    };

    const { user } = useAuthContext();
    const price_raw = props.market_data.current_price.usd;
    const price = parseFloat(price_raw.toPrecision(5));
    const priceChange_raw = props.market_data.price_change_percentage_7d;
    const priceChange = parseInt(priceChange_raw.toString(), 10);

    useEffect(() => {
       props.checkFavorite();
    }, [props.graphCoin]);

    const deleteCoin = async () => {
        try {
            let deleteId = props._id;
            props.setFavorites(props.favorites.filter((el) => el.id !== props.id));
            const deleteResponse = await fetch('/api/favorites/' + deleteId, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (!deleteResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const deleteJson = await deleteResponse.json();
            props.setFoundFavorite(false);
        }
        catch (error) {
            console.log(error);
    }
    };

    const handleClick = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(url1 + props.id + url2, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if(JSON.stringify(data) === '{"error":"coin not found"}') {
                console.log("No data found");
            } else {
                console.log("Form submitted");
                props.getGraphData(props.id);
                props.setGraphState(true);
                props.setGraphCoin({...data, id: props.id});
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    
    return (
        <li className='coin' key={props.id}>
            <img src={props.image.small} alt={props.name} onClick={handleClick}/> 
            <div className='coin-name'>
                <h3>{props.name}</h3>
                <coin-symbol>{props.symbol}</coin-symbol>
            </div>
            <div className='coin-prices'>
                <coin-price>${price}</coin-price>
                <coin-change>{priceChange}%</coin-change>
            </div>
            <button id='trash' onClick={deleteCoin}><faIcons.FaTrash/></button>
        </li>
    )
}
    
    export default Coin;