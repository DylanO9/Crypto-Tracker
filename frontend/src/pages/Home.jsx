/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import '../styles/home.css';
import { useEffect, useState } from 'react';
import Coin from '../components/Coin';
import Graph from '../components/Graph';
import Navbar from '../components/Navbar';
import Gainers from '../components/Gainers';
import * as bsIcons from 'react-icons/bs';


// All necessary urls for the api calls
const allcoinsurl = 'https://coingecko.p.rapidapi.com/coins/list';
const marketurl = 'https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=100&order=market_cap_desc';
const graphurl1 = 'https://coingecko.p.rapidapi.com/coins/';
const graphurl2 = '/market_chart?vs_currency=usd&days=30'
const url1 = 'https://coingecko.p.rapidapi.com/coins/'
const url2 = '?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '834b99fcaemsh4f1ff02156e1aecp141eb9jsn6bf831eb2667',
		'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
	}
};

function Home() {
    let jsonFavorites=[];
    const [allFavorites, setAllFavorites] = useState([]);
    const [gainers, setGainers] = useState([]);
    const [gainersFound, setGainersFound] = useState(false);
    const [graphState, setGraphState] = useState(false);
	const [allCoins, setAllCoins] = useState([]);
	const [coin, setCoin] = useState({});
	const [searchTerm, setSearchTerm] = useState('');
	const [coinFound, setCoinFound] = useState(false);
    const [foundFavorite, setFoundFavorite] = useState(false);
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
            console.log('Favorites: ', jsonFavorites);
            getFavorites(jsonFavorites);
        }
    };

	useEffect(() => {
        fetchFavorites();
        getTop4Winners();
	}, []);

    const getFavorites = async (array) => {
        setAllFavorites([]);
        await Promise.all(array.map(async (favorite) => {
            await getSingleFavorite(favorite.id);
        }));
    };

    const getSingleFavorite = async (searchTerm) => {
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
        setFoundFavorite(false);
        if(allFavorites.some(el => el.id === coin)) {
            setFoundFavorite(true);
        }
		const graphResponse = await fetch(graphurl1 + coin + graphurl2, options);
		const graphJson = await graphResponse.json();

		setGraphData(graphData => ({
			labels: graphJson.prices.map((price, index) => index),
			datasets: [{
				label: 'Price',
				data: graphJson.prices.map((price) => price[1]),

			}]
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Search Term: ' + searchTerm)
		const response = await fetch(url1 + searchTerm + url2, options);
		console.log(url1 + searchTerm + url2, options)
		const data = await response.json();
		if(JSON.stringify(data) === '{"error":"coin not found"}') {
			console.log("No data found");
		} else {

            // Sets the coin the graph is currently displaying
			setCoin(data);

			console.log("Form submitted");

            // Sets the coinFound state to true
			setGraphState(true);

            // Gets the graph data for the coin
			getGraphData(searchTerm);
		}
	};
    
    const getTop4Winners = async () => {
        try {
            const response = await fetch(marketurl, options);
            const data = await response.json();

            const sortedData = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h, 0);

            const top4Winners = sortedData.slice(0, 4);

            setGainersFound(true);
            setGainers(top4Winners);
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

    const addFavorite = async (searchTerm) => {
        // Search through the list, and see if one of the same coins is already in the list
        const found = allFavorites.some(el => el.id === searchTerm);
        if (!found) {
            const newFavorite = {id: coin.id};
            const responseFavorite = await fetch('/api/favorites',{
                method: 'POST',
                body: JSON.stringify(newFavorite),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const jsonFavorite = await responseFavorite.json();
            const response = await fetch(url1 + searchTerm + url2, options);
            if(jsonFavorite.ok) {
                console.log('Favorite Added');
            }
            const data = await response.json();
            if(JSON.stringify(data) === '{"error":"coin not found"}') {
                console.log("No data found");
            } else {
                // Sets the coin the graph is currently displaying
                setAllFavorites(allFavorites => [...allFavorites, data]);
            }
            setFoundFavorite(true);
        }
    };

    return (
        <div className="Home">
                <header>
                    <Navbar/>
                    <h1 className='dashboard'>Dashboard</h1>
                    <form onSubmit={handleSubmit}>
                            <input type='text' placeholder='Search' id='search' value={searchTerm} onChange={e =>{setSearchTerm(e.target.value); console.log(e.target.value);}}/>
                    </form>
                </header>

                <main>
                    <div className='data'>
                        <div className='top'>
                            {
                                gainersFound === true? gainers.map((gainer) => {
                                    return <>
                                    <button onClick={() => handleFavoriteClick(gainer.id)} className='gainer-button'>
                                    <Gainers {...gainer}/>
                                    </button>
                                    </>
                                }) :    
                                <h1 className='no-id'></h1>
                            }
                        </div>
                        <div className='bottom'>
                            <div className='favorites'>
                                <div className='favorite-top'>
                                    <h1 className='favorite-title'>Favorites</h1>
                                </div>
                                <div className='divider'></div>
                                {/* Map all the favorites to the favorites tab */}
                                <div className='favorite-coins'>
                                    {
                                        coinFound === true? allFavorites.map((favoriteCoin) => {
                                            return <>
                                            <button onClick={() => handleFavoriteClick(favoriteCoin.id)} className='coin-button'>
                                            <Coin {...favoriteCoin } setAllFavorites={setAllFavorites} allFavorites={allFavorites}/>
                                            </button>
                                            <div className='divider'></div>
                                            </>
                                        }) :    
                                        <h1 className='no-id'></h1>
                                    }
                                </div>
                            </div>
                            <div className='graph'>
                                <div className='graph-top'>
                                    <h1 className='graph-title'>Graph: {coin.name}</h1>
                                    {/* <button className='graph-add-favorite' onClick={() => addFavorite(coin.id)}></button> */}
                                    <bsIcons.BsHeartFill className={foundFavorite ? 'heart active' : 'heart'} onClick={() => addFavorite(coin.id)}/>
                                </div>
                                <div className='divider'></div>
                                {graphState === true ? <Graph chartData = {graphData} point={0} border={2} response={true} aspectRatio={false} dis={true}/> 
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