/*HOOKS*/
import React,{ useState, useContext, useEffect } from 'react'
import LoginContext from '../../context/LoginContext';
import CartContext from '../../context/CartContext';

/*import firebase*/
import db,{ app } from '../../utils/firebase';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';


/*Material UI*/
import { Button, Alert, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';


const UserRegisterByMail = () => {

    const {  setUserProvider } = useContext(LoginContext);

    const { cartWidgetItems, totalAddCartItemCount, addItemToCart } = useContext(CartContext);


    /*Guardo el valor de los input*/
    const [ inputValue, setInputValue ] = useState({
        name:'',
        mail:'',
        password:'',
        repeatPassword:'',
        dni:'',
        direction:'',
        tel:'',
        zipcode:''
    });

    /*Guardo lo que voy a escribir en la alerta*/
    const [ alertContent, setAlertContent ] = useState({
        content:'',
        severity:'success',
    })

    useEffect(()=>{
        if(alertContent.content.length>1){
            setOpen(true);
        }

    },[alertContent])

    const userRegByMail = (e) => {
        e.preventDefault();

        const email = inputValue.mail;
        const password = inputValue.password;
        const repeatPassword = inputValue.repeatPassword;

        const auth = getAuth(app);
        /*Pregunto si las contraseñas son iguales*/
        if(password == repeatPassword){
            /*Registro al usuario en firebase Auth*/
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    const user = {
                        name:inputValue.name,
                        mail:inputValue.mail,
                        image:' ',            
                        dni:'',
                        direction:'',
                        zipcode:'',
                        tel:'',
                    };
                    
                    /*Guardo los datos en el context*/
                    setUserProvider( user) ;


                    userRegister( email, user );

                    setAlertContent({
                        content:'¡Registro exitoso!',
                        severity:'success',
                    })

                    setTimeout(()=>{
                        
                    },1500)

                    if( totalAddCartItemCount() > 1 ) {
                        itemRegister( email )
                    }

                })
                .catch((error) => {
                    /*Pregunto si la contraseña es debil*/
                    error.code == 'auth/weak-password' ? (
                        setAlertContent({
                            content:'¡La contraseña debe tener al menos 6 caracteres!',
                            severity:'error',
                        })
                    ) : 
                    /*Pregunto si el mail está en uso*/
                    error.code=='auth/email-already-in-use' && (
                        setAlertContent({
                            content:'¡El mail está en uso!',
                            severity:'error',
                        })
                    )

                })
        /*Si las contraseñas no coinciden llamo a la alerta*/
        } else{
            setAlertContent({
                content:'¡Las contraseñas no coinciden!',
                severity:'error',
            });
            
        }
    }

    /*Guardo los datos de la consola en fireStore*/
    const userRegister = async( userId, userData ) => {

        const userCollection = collection(db,'users');
        const userDoc = doc( db, 'users', userId )
        const addUserToFirestore = await setDoc( userDoc, userData )
    }


    /*Guardo los datos de la consola en fireStore*/
    const itemRegister = async( userID ) => {

        const cartsCollection = collection(db, 'carritos');
        const cartsList = await getDocs(cartsCollection)

        cartsList.docs.map(( cart )=>{
            
            if( cart.id == userID ){
                const objetosGuardados = Object.values( cart.data() ) 
                objetosGuardados.map(( item )=>{
                
                addItemToCart( item )
                })
            }
        })
        
        const itemsListToObject = Object.assign({},cartWidgetItems);

        const itemCollection = collection(db,'carritos');
        const itemDoc = doc( db, 'carritos', userID )
        const addItemToFirestore = await setDoc( itemDoc, itemsListToObject )


    }

    /*Reviso el valor del input cada vez que se ingresa una tecla*/
    const inputEnter = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]:value,
        })
    }
  
    /*Alerta del boton 'agregar al carrito'*/
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };
    
    
  return (
    <div className='userRegister-container'>
    <form onSubmit={ userRegByMail } className='userRegisterByMail' >
        <TextField type='text' placeholder='Nombre' name='name' onChange={inputEnter} value={inputValue.name} required />
        <TextField type='email' placeholder='Mail' name='mail' onChange={inputEnter} value={inputValue.mail} required />
        <TextField type='password' placeholder='Contraseña' name='password' onChange={inputEnter} value={inputValue.password} required />
        <TextField type='password' placeholder='Repetir contraseña' name='repeatPassword' onChange={inputEnter} value={inputValue.repeatPassword} required />
        <Button className='register' type='submit'>
          Registrarse
        </Button>
    </form>

    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={alertContent.severity} sx={{ width: '100%' }}>
        {alertContent.content}
    </Alert>
    </Snackbar>
    </div>
  )
}

export default UserRegisterByMail