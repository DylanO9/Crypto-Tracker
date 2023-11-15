/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import '../assets/styles/home.css';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Coin from '../components/Coin';
import Graph from '../components/Graph';
import Navbar from '../components/Navbar';
import Gainers from '../components/Gainers';
import * as bsIcons from 'react-icons/bs';


function Home() {
    const [gainersFound, setGainersFound] = useState(false);
    const [gainers, setGainers] = useState([]);
    const { user } = useAuthContext();
    const [favorites, setFavorites] = useState([]);
    const [foundFavorite, setFoundFavorite] = useState(false);
    const [graphState, setGraphState] = useState(false);
    const [graphCoin, setGraphCoin] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [graphData, setGraphData] = useState({
        labels: [],
        datasets: [{
            label: '',
            data: [],
        }]
    });
    const url1 = 'https://api.coingecko.com/api/v3/coins/'
    const url2 = '?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true';
    const graphurl1 = 'https://coingecko.p.rapidapi.com/coins/';
    const graphurl2 = '/market_chart?vs_currency=usd&days=1';
    const marketurl = 'https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=1&per_page=100&order=market_cap_desc';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '834b99fcaemsh4f1ff02156e1aecp141eb9jsn6bf831eb2667',
            'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
        }
    };

    useEffect(() => {
        if(user) {
            getFavorites();
        }
        getTop4Winners();
    }, [user, setFavorites]);

    const getFavorites = async () => {
        try {
            const responseFavorites = await fetch('/api/favorites', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            let jsonFavorites = await responseFavorites.json();
            if (!responseFavorites.ok) {
                throw new Error('Network response was not ok');
            }
            await Promise.all(jsonFavorites.map(async (favorite) => {
                const response = await fetch(url1 + favorite.id + url2, options);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                data._id = favorite._id;
                setFavorites(favorites => [...favorites, data]);
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const checkFavorite = async () => {
        const isFavorite = await Promise.all(
            favorites.map(async (el) => {
                return el.id === graphCoin.id;
            })
        );
        setFoundFavorite(isFavorite.some((result) => result));
    };

    const addFavorite = async () => {
        try {
            console.log(checkFavorite());
            if(!user) {
                console.log('You must be logged in');
                return;
            }
    
            if (foundFavorite === false) {
                const newFavorite = {id: graphCoin.id};
                const responseFavorite = await fetch('/api/favorites', {
                    method: 'POST',
                    body: JSON.stringify(newFavorite),
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const jsonFavorite = await responseFavorite.json();
                const response = await fetch(url1 + graphCoin.id + url2, options);
                if(jsonFavorite.ok) {
                    console.log('Favorite Added');
                }
                const data = await response.json();
                if(JSON.stringify(data) === '{"error":"coin not found"}') {
                    console.log("No data found");
                } else {
                    // Sets the coin the graph is currently displaying
                    setFavorites(favorites => [...favorites, data]);
                }
            }
        }
        catch (error) {
            console.log(error);
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
    
    const handleSubmit = async (e) => {
        try {
            console.log(checkFavorite());
            e.preventDefault();
            const response = await fetch(url1 + searchTerm + url2, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if(JSON.stringify(data) === '{"error":"coin not found"}') {
                console.log('No data found');
            } else {
                console.log('Form submitted');
                getGraphData(searchTerm);
                setGraphState(true);
                setGraphCoin({...data, id: searchTerm});
                checkFavorite();
            }
        }
        catch (error) {
            console.log(error);
        }
	};

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

    return (
        <>
        <header>
            <Navbar />
            <h1 id='dashboard'>Dashboard</h1>
            <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Search' id='search-bar' value={searchTerm} onChange={e =>{setSearchTerm(e.target.value)}}/>
            </form>
            {user && (
                <div id='dashboard-user'>User: {user.email}</div>
            )}
        </header>
        <main>
            <section id='gainers'>
                {
                    gainersFound === true? gainers.map((gainer) => {
                        return (
                            <Gainers {...gainer} getGraphData={getGraphData} setGraphState={setGraphState} setGraphCoin={setGraphCoin} checkFavorite={checkFavorite} setFoundFavorite={setFoundFavorite} graphCoin={graphCoin} favorites={favorites}/>
                        )}) :    
                    <p>No gainers were found</p>
                }
            </section>
            <section id='favorite-coins'> 
            <h2 className='sub-title'>Favorites</h2>
                <ul id='favorite-coins-list'>
                    {
                        favorites.length > 0? favorites.map((favorite) => {
                            return (
                                <Coin {...favorite} favorites={favorites} setFavorites={setFavorites} getGraphData={getGraphData} setGraphState={setGraphState} setGraphCoin={setGraphCoin} checkFavorite={checkFavorite} setFoundFavorite={setFoundFavorite} graphCoin={graphCoin}/>
                            )}) :    
                        <p>No favorites were found</p>
                    }
                </ul>
            </section>
            <section id='graph'>
                <h2 className='sub-title'>Graph: {graphCoin.id} <button className={foundFavorite ? 'heart active' : 'heart'} onClick={addFavorite}><bsIcons.BsHeartFill/></button></h2>
                {
                    graphState === true? <Graph chartData={graphData} point={0} border={2} response={true} aspectRatio={false} dis={true}/>
                    : <p>Graph not found</p>
                }
            </section>
        </main>
        </>
    );
}

export default Home;