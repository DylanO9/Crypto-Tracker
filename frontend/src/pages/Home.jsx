/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import { useEffect, useState } from 'react';
import '../styles.css';
import Coin from '../components/Coin';
import Graph from '../components/Graph';

const allcoinsurl = 'https://coingecko.p.rapidapi.com/coins/list';

const marketurl = 'https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=100&order=market_cap_desc';

const graphurl1 = 'https://coingecko.p.rapidapi.com/coins/';
const graphurl2 = '/market_chart/range?from=';
const graphurl3 = '&vs_currency=usd&to=';

const url1 = 'https://coingecko.p.rapidapi.com/coins/'
const url2 = '?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '834b99fcaemsh4f1ff02156e1aecp141eb9jsn6bf831eb2667',
		'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
	}
};

const timestamp = ((Date.now() / 1000) - 2628000).toFixed(0);
const timestamp2 = ((Date.now() / 1000) - 86400).toFixed(0);


function Home() {
    let jsonFavorites=[];
    const [allFavorites, setAllFavorites] = useState([]);
    const [Favorites, setFavorites] = useState([]);
    const [graphState, setGraphState] = useState(false);
	const [allCoins, setAllCoins] = useState([]);
	const [coin, setCoin] = useState({});
	const [searchTerm, setSearchTerm] = useState('');
	const [coinFound, setCoinFound] = useState(false);
	const [graphData, setGraphData] = useState({
		labels: [],
		datasets: [{
			label: '',
			data: [],
		}]
	});

    const fetchFavorites = async() => {
        const responseFavorites = await fetch('/api/favorites');
        jsonFavorites = await responseFavorites.json();
    
        if (responseFavorites.ok) {
            setCoinFound(true);
            setFavorites(jsonFavorites);
            // console.log('Favorites: ', Favorites);
            getFavorites(jsonFavorites);
        }
    };

	useEffect(() => {
        fetchFavorites();
        getTop5Winners();
        // console.log('temp', allFavorites);
	}, []);

    const getFavorites = async (array) => {
        setAllFavorites([]);
        await Promise.all(array.map(async (favorite) => {
            await getSingleCoin(favorite.id);
        }));
    };

    const getSingleCoin = async (searchTerm) => {
		const response = await fetch(url1 + searchTerm + url2, options);
		const data = await response.json();
		if(JSON.stringify(data) === '{"error":"coin not found"}') {
			console.log("No data found");
		} else {
            // Sets the coin the graph is currently displaying
			setAllFavorites(allFavorites => [...allFavorites, data]);
		}
    };

	const getAllCoins = async () => {
		const allCoinsResponse = await fetch(allcoinsurl, options);
		const allCoinsData = await allCoinsResponse.json();
		setAllCoins(allCoinsData);
		console.log('All Coins: ' + allCoinsData);
	};

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

			console.log("Data From Search" + data);
			console.log("Form submitted");

            // Sets the coinFound state to true
			setGraphState(true);

            // Gets the graph data for the coin
			getGraphData(searchTerm);
		}
	};
    
    const getTop5Winners = async () => {
        try {
            const response = await fetch(marketurl, options);
            const data = await response.json();

            const sortedData = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h, 0);

            const top5Winners = sortedData.slice(0, 5);

            top5Winners.map((coin, index) => {
                console.log(`${index + 1}. ${coin.name} (${coin.symbol}): ${coin.price_change_percentage_24h}%`);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleFavoriteClick = async (searchTerm) => {
		const response = await fetch(url1 + searchTerm + url2, options);
		const data = await response.json();
        
        // Sets the coin the graph is currently displaying
        setCoin(data);

        // Sets the coinFound state to true
        setGraphState(true);

        // Gets the graph data for the coin
        getGraphData(searchTerm);
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
                                {
                                    coinFound === true? allFavorites.map((favoriteCoin) => {
                                        return <>
                                        <button onClick={() => handleFavoriteClick(favoriteCoin.id)} className='coin-button'>
                                        <Coin {...favoriteCoin}/>
                                        </button>
                                        <div className='divider'></div>
                                        </>
                                    }) :    
                                    <h1 className='no-favorites'>No Favorites</h1>
                                }
                            </div>
                            <div className='graph'>
                                <h1 className='graph-title'>Graph</h1>
                                <div className='divider'></div>
                                {graphState === true ? <Graph chartData = {graphData}/> 
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