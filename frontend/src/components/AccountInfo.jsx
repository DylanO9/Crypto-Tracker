import { useAuthContext } from "../hooks/useAuthContext"
import '../assets/styles/accountinfo.css';

function AccountInfo() {
    const { user } = useAuthContext();
    return (
        <>
        <div className='account-info'>
            <h3 className='account-info-email'>Email: {user && user.email}</h3>
            <h3 className='account-info-username'>Username: {user && user.username}</h3>
            <h3 className='account-info-password'>Password: {user && user.password}</h3>
            <div className='account-info-personal'>
                <h2 className='personal-info'>Personal Information</h2>
                <h3 className='account-info-name'>Name: {user && user.name}</h3>
                <h3 className='account-info-age'>Age: {user && user.age}</h3>
            </div>
        </div>
        </>
    )
}

export default AccountInfo