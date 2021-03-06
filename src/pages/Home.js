/*Hooks*/
import React, { useState, useEffect } from 'react'

/*Firebase*/
import db from '../utils/firebase'
import { collection, getDocs } from 'firebase/firestore'

/*Components*/
import ItemListContainer from '../components/ItemListContainer/ItemListContainer'


const Home = () => {


    const [ products, setProducts ] = useState([])
    const [ loading, setLoading ] = useState(false);

    useEffect( () => {

        getProducts().then((prods)=>{
          setProducts(prods)
          setLoading(true);

        })
    },[])

    const getProducts = async() => {
      const itemCollection = collection( db, 'productos' );
      const productsDB = await getDocs(itemCollection);
      return productsDB.docs.map( (product) =>{
        let prod = product.data();
        prod.id= product.id;
        return prod;
      })
    }



  return (
    <ItemListContainer listProducts={products} loading={loading} />

  )
}

export default Home;