/* eslint-disable no-unused-expressions */
import * as bsIcons from 'react-icons/bs';
import { useState, useEffect } from 'react';
import Graph from './Graph';
import '../assets/styles/gainers.css';
import React from 'react';

function Gainers(props) {
    const graphurl1 = 'https://coingecko.p.rapidapi.com/coins/';
    const graphurl2 = '/market_chart?vs_currency=usd&days=1';
    const url1 = 'https://coingecko.p.rapidapi.com/simple/price?ids=';
    const url2 = '&vs_currencies=usd&include_last_updated_at=true&include_market_cap=false&include_24hr_change=true&include_24hr_vol=false';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '834b99fcaemsh4f1ff02156e1aecp141eb9jsn6bf831eb2667',
            'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
        }
    };

    const [graphData, setGraphData] = useState({
		labels: [],
		datasets: [{
			label: '',
			data: [],
		}]
	});
    const [percent, setPercent] = useState(0);
    
    useEffect(() => {
        getGraphData(props.id);
        getGainerData(props.id);
    }, [props.id]);

    const getGraphData = async (coin) => {
        try {
            const graphResponse = await fetch(graphurl1 + coin + graphurl2, options);
            if (!graphResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const graphJson = await graphResponse.json();
            
            setGraphData(graphData => ({
                labels: graphJson.prices.map((price, index) => index),
                datasets: [{
                    label: 'Price',
                    data: graphJson.prices.map((price) => price[1]),
                    borderColor: '#36A2EB',
                    backgroundColor: 'rgba(0,0,0,0)'
                }]
            }));
        } catch (error) {
            console.log(error);
        }
	};

    const getGainerData = async (coin) => {
        try {
            const graphPercent = await fetch(url1 + coin + url2, options);
            if (!graphPercent.ok) {
                throw new Error('Network response was not ok');
            }
            const graphPercentJson = await graphPercent.json();
            setPercent(parseFloat(graphPercentJson[coin].usd_24h_change.toPrecision(2)));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="gainer" key={props.id}>
            <img src={props.image} alt={props.name} />
            <div className='coin-name'>
                <h3>{props.name}</h3>
                <coin-symbol>{props.symbol}</coin-symbol>
            </div>
            <bsIcons.BsGraphUpArrow />
            <coin-price>${parseFloat(props.current_price.toPrecision(4))}</coin-price>
            <coin-change>{percent}%</coin-change>
            <Graph chartData={graphData} point={0} border={2} response={true} aspectRatio={false} dis={false}/>
        </div>
    )
}

export default Gainers;