import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';
import * as faIcons from 'react-icons/fa';
import '../assets/styles/coin.css'
import React from 'react';

function Coin (props) {
    console.log('coin', props);
    const { user } = useAuthContext();
    const image = props.image;
    const price_raw = props.market_data.current_price.usd;
    const price = parseFloat(price_raw.toPrecision(5));
    const priceChange_raw = props.market_data.price_change_percentage_7d;
    const priceChange = parseInt(priceChange_raw.toString(), 10);

    const deleteCoin = async () => {
    };
    return (
        <li className='coin' key={props.id}>
            <img src={props.image.small} alt={props.name} />
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