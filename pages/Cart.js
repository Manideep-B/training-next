import React, { useContext } from 'react'
import { Store } from '../utlis/Store'
import dynamic from "next/dynamic";
import Image from 'next/image';
import NextLink from "next/link"
import Link from "next/link";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';

 function Cart() {
   const router = useRouter()
    const { state, dispatch } = useContext(Store);
    const { cart: {cartItems} } = state;

    const updateCartHandler = async(product, quantity) => {
      const { data } = await axios.get(`/api/products/${product._id}`);
      dispatch({type: "CART_ADD_ITEM", payload: {...product, quantity}})
    };

    const removeProductHandler = (product) => {
      dispatch({ type: "CART_REMOVE_ITEM", payload: product})
    }

    const checkoutHandler = () => {
      router.push("/Shipping")
    }
  return (
    <div>
        {cartItems.length === 0 ? (<div className='h-screen flex flex-col justify-center items-center'>
            Cart is empty {" "}<NextLink href="/" passHref>
              <Link>Go Shopping</Link>
              </NextLink>
        </div>) : (
            
            <div className="bg-gray-100 ">
             <div className="container shadow-inner mx-auto mt-10">
               <div className="md:flex my-10">
                 <div className="md:w-4/4 bg-white px-10 py-10">
                     <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                   <div className="flex mt-10 mb-5">
                     <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/6">Product Details</h3>
                     <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/6 text-center">Quantity</h3>
                     <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/6 text-center">Price</h3>
                     <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/6 text-center">Total</h3>
                     <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/6 text-center">Remove</h3>
                   </div>
   
                   {cartItems.map(product => (
                   <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={product._id}>
                     <div className="flex w-2/6">
                        <NextLink href={`/products/${product.slug}`}>
                            <div className="relative cursor-pointer">
                                {product.image.length > 0 && (
                                    <Image src={product.image} alt={product.name} height="64" width="64" layout="fixed"/>
                                )}
                            </div>  
                        </NextLink>
                       <div className="flex flex-col text-center justify-between ml-4 flex-grow">
                         <span className="font-bold text-sm">{product.name}</span>
                         <span className="text-red-500 text-xs">{product.brand}</span>
                       </div>
                     </div>
                     <div className="mb-3 w-1/6">
                       <div className="custom-number-input h-10 text-center">
                         {/* <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                           <button className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-1/3 rounded-l cursor-pointer outline-none">
                             <span className="m-auto text-2xl font-thin" 
                             // onClick={() => {subtractQuantityFromItem}}
                             >-</span>
                           </button>
                             <span className="outline-none focus:outline-none text-center w-1/3 bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none">{quantity}</span>
                           <button className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-1/3 rounded-r cursor-pointer">
                             <span className="m-auto text-2xl font-thin"
                             //  onClick={() => {addQuantityToItem}}
                              >+</span>
                           </button>
                         </div> */}
                          <select className="form-select appearance-none
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value={product.quantity} onChange={(e) => updateCartHandler(product, e.target.value)}>
                                {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                            </select>
                       </div>
                     </div>
   
                     <span className="text-center text-center w-1/6 font-semibold text-sm">${product.price}</span>
                     <span className="text-center text-center w-1/6 font-semibold text-sm">${product.price * product.quantity}</span>
   
                     <button className="font-semibold w-1/6 hover:text-red-500 text-gray-500 text-xs flex items-center justify-center"
                      ><FontAwesomeIcon icon={faTrashCan} onClick={() => removeProductHandler(product)}/></button>
                   </div>
                   ))}
                   <hr/>
                   <div className='flex flex-col'>
                        <h1 className="flex justify-end font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <div className="flex justify-end mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">Items{' '}:</span>
                            <span className="font-semibold text-sm">({cartItems.reduce((a, c) => a + c.quantity, 0)}) Items</span>
                        </div>
                        <div className=" flex justify-end border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total cost{" "}:</span>
                                <span>{" "}${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}</span>
                            </div>
                        </div>
                        <button onClick={checkoutHandler} className="flex justify-center bg-sky-900 font-semibold hover:bg-sky-700 p-3 text-sm text-white uppercase">Checkout</button>
                    </div>
                </div>   
               </div>
             </div>
         </div>
        )}
    
    </div>
  )
}

export default dynamic(() => Promise.resolve(Cart), {ssr: false}); //for client side rendering
