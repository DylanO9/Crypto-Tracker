import { useAuthContext } from "../hooks/useAuthContext"
import '../assets/styles/accountinfo.css'

function AccountInfo() {
    const { user } = useAuthContext();
    return (
        <div className='account-info'>
            <h1 className='email'>Email: {user && user.email}</h1>
            <h1 className='username'>Username: {user && user.username}</h1>
            <h1 className='password'>Password: {user && user.password}</h1>
            <div className='personal'>
                <h1 className='personal-info'>Personal Information</h1>
                <h1 className='name'>Name: {user && user.name}</h1>
                <h1 className='age'>Age: {user && user.age}</h1>
                <ul className='theme'>
                    <li></li>
                </ul>
            </div>
        </div>
    )
}

export default AccountInfo