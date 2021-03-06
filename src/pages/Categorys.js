/*HOOKS*/
import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

/*Material UI*/
import Button from '@mui/material/Button';
import { Skeleton } from '@mui/material';

/*FontAwesome*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonDress, faGem, faPerson, faComputer } from '@fortawesome/free-solid-svg-icons'


const Categorys = () => {

    const [ loader, setLoader ] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            setLoader(true);
        },1000)
    },[]);

    const skeleton = 
        <div className='categorys-container__skeleton'>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
        </div>;

  return (
   
    <div className='categorys-container'>


        {!loader ?  skeleton

            : 

        <div className='categorys-container__links'>
            <div className='categorys-container__link'>
                <Link to={`/Categorys/Joyeria`} > 
                    <Button>
                        <FontAwesomeIcon icon={ faGem }/>
                        <p>Joyería</p>
                    </Button>
                </Link>
                
            </div>

            <div className='categorys-container__link'>
                <Link to={`/Categorys/Ropa%20para%20mujer`} > 
                    <Button>  
                        <FontAwesomeIcon icon={ faPersonDress }/>
                        <p>Ropa de Mujer</p>
                    </Button>
                </Link>
                
            </div>

            <div className='categorys-container__link'>
                <Link to={`/Categorys/Ropa%20para%20hombre`} > 
                    <Button>
                        <FontAwesomeIcon icon={ faPerson }/>
                        <p>Ropa de Hombre</p>
                    </Button>
                </Link>
                
            </div>

            <div className='categorys-container__link'>
                <Link to={`/Categorys/Tecnologia`} > 
                    <Button>
                        <FontAwesomeIcon icon={ faComputer }/> 
                        <p>Tecnología</p>
                    </Button>
                </Link>
                
            </div>
        </div>
            
        }

        
    </div>
  )
}

export default Categorys