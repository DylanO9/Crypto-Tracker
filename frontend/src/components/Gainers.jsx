/* eslint-disable no-unused-expressions */
import * as bsIcons from 'react-icons/bs';
import { useState, useEffect } from 'react';
import Graph from './Graph';

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

function Gainers(props) {
    const [graphData, setGraphData] = useState({
		labels: [],
		datasets: [{
			label: '',
			data: [],
		}]
	});
    const [percent, setPercent] = useState(0);
    const getGraphData = async (coin) => {
		const graphResponse = await fetch(graphurl1 + coin + graphurl2, options);
		const graphJson = await graphResponse.json();
		console.log('graph url: ' + graphurl1 + coin + graphurl2 + graphurl2);
		console.log('graph data: ' + graphJson);

        const graphPercent = await fetch(url1 + coin + url2, options);
        const graphPercentJson = await graphPercent.json();
        console.log('percent:', graphPercentJson);
        setPercent(parseFloat(graphPercentJson[coin].usd_24h_change.toPrecision(2)));
        console.log(percent);

		setGraphData(graphData => ({
			labels: graphJson.prices.map((price, index) => index),
			datasets: [{
				label: 'Price',
				data: graphJson.prices.map((price) => price[1]),

			}]
		}));
		console.log(graphJson);
	};

    useEffect(() => {
        getGraphData(props.id);
    }, [props.id]);


    return (
        <div className='gainer' key={props.id}>
            <div className='gainer-top'>
                <img src={props.image} alt='' className='gainer-image'></img>
                <div className='gainer-names'>
                    <h1 className='gainer-name'>{props.name}</h1>
                    <h1 className='gainer-symbol'>{props.symbol}</h1>
                </div>
                <h1 className='gainer-up'> <bsIcons.BsGraphUpArrow/></h1>
            </div>
            <div className='gainer-mid'>
                <div className='gainer-prices'>
                    <h1 className='gainer-price'>${parseFloat(props.current_price.toPrecision(3))}</h1>
                    <h1 className='gainer-price-change'>+{percent}%</h1>
                </div>
                <div className='gainer-graph'>
                    <Graph chartData = {graphData} point={0} border={2} response={true} aspectRatio={false} dis={false}/>
                </div>
            </div>
        </div>
    )
}

export default Gainers;