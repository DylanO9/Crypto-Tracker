import Home from './pages/Home';
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
					<Route path='/settings' element={user ? <Settings /> : <Navigate to='/'/>} />
					<Route path='/signup' element={!user ? <Signup/> : <Navigate to='/'/>}/>
					<Route path='/login' element={!user ? <Login/> : <Navigate to='/'/>}/>
				</Routes>
			</BrowserRouter>
        </div>
    );
}
export default App;

