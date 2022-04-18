import { useRouter } from 'next/router';
import React, { useContext, useEffect, useReducer } from 'react'
import { Store } from '../../utlis/Store';
import dynamic from "next/dynamic";
import axios from 'axios';
import Image from "next/image"
import NextLink from "next/link"
import Cookies from 'js-cookie';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true, error: ''}
        case 'FETCH_SUCCESS':
            return {...state, loading: false, order: action.payload, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default: 
        state;
    }
}

function Order({ params }) {
    const orderId = params.id;
    const router = useRouter();
    const { state } =useContext(Store);
    const { userInfo } = state;

    const [{loading , error, order}, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
    });

    useEffect(() => {
       if(!userInfo) {
         return router.push('/login');
       }
       const fetchOrder = async() => {
           try {
               dispatch({type: 'FETCH_REQUEST' })
               const data  = await axios.get(`/api/orders/${orderId}`, {
                   headers: { authorization: `Bearer ${userInfo.token}` }
               })
               dispatch({ type: 'FETCH_SUCCESS', payload: data });
           } catch (error) {
               dispatch({type:'FETCH_FAIL', payload: error.response && error.response.data.message
               ? error.response.data.message
               : error.message})
           }
       }
    }, [order, order._id, orderId ])

    const { shippingAddress, paymentMethod, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt, 
  } = order;

  return (
        <div>
            <div className="bg-white">
                <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                    <div className="max-w-xl">
                    <h1 className="text-sm font-semibold uppercase tracking-wide text-indigo-600"> Order Details </h1>
                    </div>
                    <h3 className="font-bold underline text-gray-900">order id: {orderId}</h3>

                    <div className="mt-10 border-t border-gray-200">
                    <h2 className="sr-only">Order Details</h2>

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
                            <span className="sr-only">{isDelivered}</span>
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
                            <span className="sr-only">{isPaid}</span>
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
                </div>
            </div>
        </div>
  )
}

export async function getServerSideProps({ params }) {
    return { props: { params} }
}
export default dynamic(() => Promise.resolve(Order), {ssr: false});