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
			</header>

			<main>
				<div className='top'>
					<div className='gainers'> 

					</div>

					<div className='losers'>

					</div>
				</div>
				<div className='bottom'>
					<div className='favorited'>
						<h1 className='favorite-title'></h1>
						<div className='divider'></div>
					</div>

					<div className='graph'>

					</div>
				</div>
			</main>

			<footer>

			</footer>

        </div>
    );
}
export default App;

