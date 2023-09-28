import { useAuth } from '../contexts/auth';

export const Profile = () => {
    const {currentUser} = useAuth();
    
  return (
    <>
         <div style={{width: 'auto', height: '60px'}}></div>
        <div style={{backgroundColor : '#8aed94', padding:'15px', borderRadius: '5px'}}>
            <button type="button" className="btn btn-info mr-2 mb-2">Logged In User : {currentUser?.username}</button>
        </div>
    </>
  )
}
