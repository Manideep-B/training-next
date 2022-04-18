import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { Store } from '../utlis/Store';
import dynamic from "next/dynamic";
import axios from 'axios';
import Cookies from 'js-cookie';

function PlaceOrder() {
    const router = useRouter()
    const {state, dispatch} =useContext(Store)
    const { userInfo, cart: {cartItems, shippingAddress, paymentMethod} } = state;
    useEffect(() =>{
        if(!paymentMethod) {
            router.push("/Payment")
        }
        if(cartItems.length === 0) {
            router.push('/Cart')
        }
    }, [])

    const round = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    const itemsPrice = round(cartItems.reduce((a, c) => a + c.price * c.quantity, 0))
    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round(itemsPrice * 0.15)
    const totalPrice = round( itemsPrice + shippingPrice + taxPrice )

    const placeOrderHandler = async() => {
        try {
            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            }, {
                headers: {
                    authorization: `Bearer ${userInfo.token}`,
                }
            });
            router.push(`/orders/${data._id}`)
            dispatch({ type : 'CART_CLEAR' })
            Cookies.remove('cartItems');
        } catch (error) { 
            error.response && error.response.data.message && error.response.data
                ? error.response.data.message
                : error.message;
        }
    }

  return (
        <div>
            <div className="bg-white">
                <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                    <div className="max-w-xl">
                    <h1 className="text-sm font-semibold uppercase tracking-wide text-indigo-600"> Order Details </h1>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Check Details</p>
                    </div>

                    <div className="mt-10 border-t border-gray-200">
                    <h2 className="sr-only">Your order</h2>

                    <h3 className="sr-only">Items</h3>
                    {cartItems.map((product) => (
                        <div className="py-10 border-b border-gray-200 flex space-x-6" key={product._id}>
                        <img
                            src={product.image} alt={product.name} height="64" width="64" layout="fixed" 
                            className="flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40"
                        />
                        {/* {product.image.length > 0 && (
                            <Image src={product.image} alt={product.name} height="64" width="64" layout="fixed"/>
                        )} */}
                        <div className="flex-auto flex flex-col">
                            <div>
                            <h4 className="font-medium text-gray-900">
                                <a href={product.href}>{product.name}</a>
                            </h4>
                            <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                            </div>
                            <div className="mt-6 flex-1 flex items-end">
                            <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                                <div className="flex">
                                <dt className="font-medium text-gray-900">Quantity</dt>
                                <dd className="ml-2 text-gray-700">{product.qty}</dd>
                                </div>
                                <div className="pl-4 flex sm:pl-6">
                                <dt className="font-medium text-gray-900">Price</dt>
                                <dd className="ml-2 text-gray-700">{product.price}</dd>
                                </div>
                            </dl>
                            </div>
                        </div>
                        </div>
                    ))}

                    <div className="sm:ml-40 sm:pl-6">
                    <dl className="grid grid-cols-1 gap-x-6 text-sm py-5">
                        <div>
                            <dt className="font-bold underline text-gray-900">Your Information</dt>
                            <dd className="mt-2 text-gray-700">
                            <address className="not-italic">
                                <span className="block">{userInfo.name}</span>
                                <span className="block">{userInfo.email}</span>
                            </address>
                            </dd>
                        </div>
                    </dl>
                        <dl className="grid grid-cols-2 gap-x-6 text-sm py-5">
                        <div>
                            <dt className="font-bold underline text-gray-900">Shipping address</dt>
                            <dd className="mt-2 text-gray-700">
                            <address className="not-italic">
                                <span className="block">{shippingAddress.address}</span>
                                <span className="block">{shippingAddress.city},{' '}{shippingAddress.country}</span>
                                <span className="block">{shippingAddress.postalCode},{' '}{shippingAddress.number}</span>
                            </address>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-bold underline text-gray-900">Payment method</dt>
                            <dd className="mt-2 text-gray-700">
                            <p>{paymentMethod}</p>
                            {/* <p>Cash on Delivery</p> */}
                            {/* <p>
                                <span aria-hidden="true">•••• </span>
                                <span className="sr-only">Ending in </span>1545
                            </p> */}
                            </dd>
                        </div>
                        </dl>

                        <h3 className="sr-only">Summary</h3>

                        <dl className="space-y-6 border-t border-gray-200 text-sm pt-10">
                        <div className="flex justify-between">
                            <dt className="font-medium text-gray-900">Subtotal</dt>
                            <dd className="text-gray-700">${itemsPrice}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="font-medium text-gray-900">Shipping</dt>
                            <dd className="text-gray-700">${shippingPrice}</dd>
                        </div> 
                        <div className="flex justify-between">
                            <dt className="font-medium text-gray-900">Shipping</dt>
                            <dd className="text-gray-700">${taxPrice}</dd>
                        </div> 
                        <div className="flex justify-between">
                            <dt className="font-medium text-gray-900">Total</dt>
                            <dd className="text-gray-900">${totalPrice}</dd>
                        </div>
                        </dl>
                    </div>
                    </div>
                        <div className=' flex justify-center items-center'>
                            <button className="w-48 flex justify-center items-center text-center mt-4 text-indigo-100 font-bold bg-sky-700 p-3 rounded-md hover:bg-sky-400 transition duration-300" onClick={placeOrderHandler}>Submit</button>
                        </div>
                </div>
            </div>
        </div>
  )
}

export default dynamic(() => Promise.resolve(PlaceOrder), {ssr: false});