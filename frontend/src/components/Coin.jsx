/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const url1 = 'https://coingecko.p.rapidapi.com/coins/'
const url2 = '?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '173000f902mshd6df85c8e041161p1a1edejsn88c2908dd37d',
		'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
	}
};


function Coin (props) {
// Props will pass the name of the coin
// use the API to fetch the data for the coin
// display the data for the coin

const [coin, setCoin] = useState({});
const getCoinData = async () => {
    const response = await fetch(url1 + props.name + url2, options);
    const json = await response.json();
    setCoin(json);
    console.log(json);
    console.log(props,props.name);
};

const image = coin.image;
const price_raw = props.market_data.current_price.usd;
const price = parseInt(price_raw.toString(), 10);
const priceChange_raw = props.market_data.price_change_percentage_7d;
const priceChange = parseInt(priceChange_raw.toString(), 10);

    return (
        <>
            <div className='coin' key={coin.id}>
                <img src={image.small} alt='' className='coin-image'></img>
                <div className='mid-coin'>
                    <h1 className='coin-name'>{coin.name}</h1>
                    <h1 className='coin-symbol'>{coin.symbol}</h1>
                </div>
                <div className='side-coin'>
                    <h1 className='current-price'>${price}</h1>
                    <h1 className="price-change-7-days">{priceChange}%</h1>
                </div>
            </div>
            <div className='divider'></div>
        </>
    )
}

export default Coin;