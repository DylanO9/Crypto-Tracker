import { useEffect, useState } from 'react';
import '../styles.css';
import Coin from '../components/Coin';
import Graph from '../components/Graph';

const allcoinsurl = 'https://coingecko.p.rapidapi.com/coins/list';
const graphurl1 = 'https://coingecko.p.rapidapi.com/coins/';
const graphurl2 = '/market_chart/range?from=';
const graphurl3 = '&vs_currency=usd&to=';
const url1 = 'https://coingecko.p.rapidapi.com/coins/'
const url2 = '?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '173000f902mshd6df85c8e041161p1a1edejsn88c2908dd37d',
		'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
	}
};

const timestamp = ((Date.now() / 1000) - 2628000).toFixed(0);
const timestamp2 = ((Date.now() / 1000) - 86400).toFixed(0);


function Home() {
	const [allCoins, setAllCoins] = useState([]);
	const [coin, setCoin] = useState({});
	const [favorites, setFavorites] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [coinFound, setCoinFound] = useState(false);
	const [graphData, setGraphData] = useState({
		labels: [],
		datasets: [{
			label: '',
			data: [],
		}]
	});

	useEffect(() => {
        const fetchFavorites = async() => {
            const responseFavorites = await fetch('/api/favorites');
            const jsonFavorites = await responseFavorites.json();
            
            if (responseFavorites.ok) {
                setFavorites(jsonFavorites);
            }
        };
        fetchFavorites();
	}, []);

	const getAllCoins = async () => {
		const allCoinsResponse = await fetch(allcoinsurl, options);
		const allCoinsData = await allCoinsResponse.json();
		setAllCoins(allCoinsData);
		console.log('All Coins: ' + allCoinsData);
	}

	const getGraphData = async (coin) => {
		const graphResponse = await fetch(graphurl1 + coin + graphurl2 + timestamp + graphurl3 + timestamp2, options);
		const graphJson = await graphResponse.json();
		console.log('graph url: ' + graphurl1 + coin + graphurl2 + timestamp + graphurl3 + timestamp2);
		console.log('graph data: ' + graphJson);

		setGraphData(graphData => ({
			labels: graphJson.prices.map((price, index) => index),
			datasets: [{
				label: 'Price',
				data: graphJson.prices.map((price) => price[1]),

			}]
		}));

		console.log(graphJson);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Search Term: ' + searchTerm)
		const response = await fetch(url1 + searchTerm + url2, options);
		console.log(url1 + searchTerm + url2, options)
		const data = await response.json();
		if(JSON.stringify(data) === '{"error":"coin not found"}') {
			console.log("No data found");
			setCoin({});
			setCoinFound(false);
		} else {

            // Sets the coin the graph is currently displaying
			setCoin(data);

			console.log(data);
			console.log("Form submitted");

            // Sets the coinFound state to true
			setCoinFound(true);

            // Gets the graph data for the coin
			getGraphData(searchTerm);
		}
	};
    
    return (
        <div className="Home">
                <header>
                    <h1 className='dashboard'>Dashboard</h1>
                    <form onSubmit={handleSubmit}>
                            <input type='text' placeholder='Search' id='search' value={searchTerm} onChange={e =>{setSearchTerm(e.target.value); console.log(e.target.value);}}/>
                    </form>
                </header>

                <main>
                    <div className='data'>
                        <div className='top'>
                            <div className='gainers'> 
                                <h1>Gainers</h1>
                                <div className='divider'></div>
                            </div>

                            <div className='losers'>
                                <h1>Losers</h1>
                                <div className='divider'></div>
                            </div>
                        </div>
                        <div className='bottom'>
                            <div className='favorites'>
                                <h1 className='favorite-title'>Favorites</h1>
                                <div className='divider'></div>
                                {/* Map all the favorites to the favorites tab */}
                                {favorites && favorites.map((favorite) => {
                                    <Coin name={favorite}/>
                                })}
                            </div>

                            <div className='graph'>
                                <h1 className='graph-title'>Graph</h1>
                                <div className='divider'></div>
                                {coinFound === true ? <Graph chartData = {graphData}/> 
                                : <h1 className='no-id'></h1>
                                }
                            </div>
                        </div>
                    </div>
                </main>
        
        </div>
        );
}

export default Home;