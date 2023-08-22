import './styles.css';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import Coin from './coin';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

const url1 = 'https://coingecko.p.rapidapi.com/coins/'
const url2 = '?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '173000f902mshd6df85c8e041161p1a1edejsn88c2908dd37d',
		'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
	}
};

const app = initializeApp(firebaseConfig);

function App() {
	const [coin, setCoin] = useState({});
	const [favorites, setFavorites] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [coinFound, setCoinFound] = useState(false);

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
			setCoin(data);
			console.log(data);
			console.log("Form submitted");
			setCoinFound(true);
		}
	};
    
    return (
        <div className='App'>
			<header>
				<h1 className='dashboard'>Dashboard</h1>
				<form onSubmit={handleSubmit}>
						<input type='text' placeholder='Search' id='search' value={searchTerm} onChange={e =>{setSearchTerm(e.target.value); console.log(e.target.value);}}/>
				</form>
			</header>

			<main>
				<div className='sidebar'>

				</div>
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
							{coinFound === true ? <Coin {...coin}/> 
								: <h1 className='no-id'>No data found</h1>
							}
						</div>

						<div className='graph'>
							<h1 className='graph-title'>Graph</h1>
							<div className='divider'></div>
						</div>
					</div>
				</div>
			</main>

        </div>
    );
}
export default App;

