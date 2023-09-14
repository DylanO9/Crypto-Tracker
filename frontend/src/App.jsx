import Home from './pages/Home';
import Account from './pages/Account';
import Chart from './pages/Chart';
import News from './pages/News';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';


function App() {
    return (
        <div className='App'>
			<Navbar/>
			<Routes>
				<Route path='/' element={<Home/>}/>
				<Route path="/account" element={<Account />} />
				<Route path="/chart" element={<Chart />} />
				<Route path="/news" element={<News />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
        </div>
    );
}
export default App;

