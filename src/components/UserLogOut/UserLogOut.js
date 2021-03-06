/*HOOKS*/
import React, { useContext } from 'react'
import LoginContext from '../../context/LoginContext'
import { useNavigate } from 'react-router-dom';

/*Firebase*/
import '../../utils/firebase';
import { getAuth, signOut } from 'firebase/auth'

/*Material UI*/
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';


const UserLogOut = () => {

    const {  setUserProvider } = useContext(LoginContext);

    const navigate = useNavigate();

    const userSignOut =  () => {
        const auth = getAuth()
        signOut(auth).then(()=>{

            setUserProvider({
                name:'',
                mail:'',
                image:'',
            })
            navigate('/')
            window.location.reload(false)



        }).catch(( error ) => {
           console.log(error)
        })
      }


  return (
    <div className='userSignOut-container'>
        <Button onClick={ userSignOut } > 
            <LogoutIcon /> Salir
        </Button>
    </div>
  )
}

export default UserLogOut