import Home from './pages/Home';
import Account from './pages/Account';
import Chart from './pages/Chart';
import News from './pages/News';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';


function App() {
    return (
        <div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home/>}/>
					<Route path='/account' element={<Account />} />
					<Route path='/chart' element={<Chart />} />
					<Route path='/news' element={<News />} />
					<Route path='/settings' element={<Settings />} />
					<Route path='/signup' element={<Signup/>}/>
					<Route path='/login' element={<Login/>}/>
				</Routes>
			</BrowserRouter>
        </div>
    );
}
export default App;

