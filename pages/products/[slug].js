import Link from 'next/link';
import Head from 'next/head';
import Image from "next/image";
import db from '../../utlis/db';
import { useRouter } from "next/router"
import Product from "../../models/Products";
import axios from 'axios'
import { useContext } from 'react';
import { Store } from '../../utlis/Store'


const product = ({product}) => {
    const {state, dispatch } = useContext(Store);

    const router = useRouter();

    if(!product) {
      return  <div>Product Not Found</div>
    } 

    const addToCartHandler = async() => { 
      const existItem = state.cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${product._id}`);
      dispatch({type: "CART_ADD_ITEM", payload: {...product, quantity}})
      router.push('/Cart')
    }

    return(
        <div className='p-8 w-screen grid grid-cols-3 grid-flow-row gap-4 auto-rows-auto overflow-x-hidden'>
        <div className='relative'>
            <Image className="rounded-lg" src={product.image} alt={product.name} objectFit="contain" layout="fill"/>
        </div> 
        <div>
            <h3 className="text-xl font-semibold tracking-tight text-gray-900">{product.name}</h3>
            <hr />
            <br />
            <div className="text-xl font-semibold tracking-tight text-gray-900"><strong className='bg-black px-1 rounded text-sky-300'>{product.rating}</strong>{' '}
            <>Rating from {product.numReviews} Reviews</></div>
            <hr />
            <br />
            <p className="text-xl font-semibold tracking-tight text-gray-900">{product.description}</p>
        </div>  
        <div className = "p-4 border border-black-500">
              <h2 className='text-xl font-semibold tracking-tight text-gray-900'>price: ${product.price}</h2>
              <hr />
              <br />
              <h2 className='text-xl font-semibold tracking-tight text-gray-900'>Stock: {product.countInStock}</h2>
              <hr />
              <br />
              { product.countInStock > 1 ?
                 <div>
                 <label htmlFor="name" className="ml-px pl-4 block text-sm font-medium text-gray-700"> Qty </label>
                 <div className="mt-1">
                   <input className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full"
                      onChange={(e) => setQuantity(e.target.value)} type="number" defaultValue={1}
                   />
                 </div>
               </div>
              :
              <h2 className='text-xl font-semibold tracking-tight text-gray-900'>Qty: 0 </h2>
            }
              
              <hr />
              <br />
              <div>
                  {product.countInStock > 1 ? 
                  <button className='w-full p-4 bg-black text-white' onClick={addToCartHandler}>Add to Cart</button> : 
                  <button disabled  className='w-full p-4 bg-gray-500 text-white cursor-none	'>Out Of Stock</button> 
                  }
              </div> 
        </div>
     </div>
    )
}

export default product

export async function getServerSideProps(context) {
  const {params} = context;
  const {slug} = params;

  await db.connect()
  const product = await Product.findOne({slug}).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product)
    }
  }
}