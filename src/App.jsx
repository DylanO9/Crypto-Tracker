import './styles.css';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import { Routes, Route, Link } from 'react-router-dom';



const app = initializeApp(firebaseConfig);

const url = 'https://coingecko.p.rapidapi.com/coins/list';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '173000f902mshd6df85c8e041161p1a1edejsn88c2908dd37d',
		'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

function App() {

    
    return (
        <div className='App'>
			<header>
				<h1 className='dashboard'>Dashboard</h1>
				<input type='text' placeholder='Search' className='search'/>
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

