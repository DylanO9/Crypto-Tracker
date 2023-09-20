import Home from './pages/Home';
import Account from './pages/Account';
import Chart from './pages/Chart';
import News from './pages/News';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';


function App() {
	const { user } = useAuthContext();

    return (
        <div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={user ? <Home/> : <Navigate to='/login'/>} />
					<Route path='/account' element={<Account />} />
					<Route path='/chart' element={<Chart />} />
					<Route path='/news' element={<News />} />
					<Route path='/settings' element={<Settings />} />
					<Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>}/>
					<Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
				</Routes>
			</BrowserRouter>
        </div>
    );
}
export default App;

