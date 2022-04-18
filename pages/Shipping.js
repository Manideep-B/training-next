import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react'
import { Store } from "../utlis/Store"

export default function Shipping() {
    const router = useRouter()
    const { redirect } = router.query;
    const {state, dispatch} =useContext(Store)
    const { userInfo, cart: {shippingAddress} } = state;
    useEffect(() =>{
        if(!userInfo) {
            router.push("/Login?redirect=/Shipping")
        }
    }, [])

    const [ fullName , setFullName ] = useState(shippingAddress.fullName)
    const [ address , setAddress ] = useState(shippingAddress.address)
    const [ city , setCity ] = useState(shippingAddress.city)
    const [ postalCode , setPostalCode ] = useState(shippingAddress.postalCode)
    const [ country , setCountry ] = useState(shippingAddress.country)
    const [ number , setNumber ] = useState(shippingAddress.number)
   
    const submitHandler = (e) => {
        e.preventDefault()
         dispatch({type: "SAVE_SHIPPING_ADDRESS", payload: {fullName, address, city, postalCode, country, number}});
         Cookies.set('shippingAddress', JSON.stringify({fullName, address, city, postalCode, country, number}));
         router.push('/Payment');
        } 

  return (
    <div className="w-full h-full bg-slate-500">
        <form className=" m-4" onSubmit={submitHandler}>
            <div className="contents">
                <div className="flex justify-center items-center container mx-auto hover:shadow-inner hover:border-x-gray-100 transition duration-300">
                    <div className="p-10 rounded-xl w-2/4 bg-white">
                    <h2 className="text-2xl text-sky-700 text-center mb-2 font-semibold">ShippingAddress</h2>
                        <div className="mb-2">
                            <label htmlFor="fullName" className="block mb-2 text-black font-bold">Full Name</label>
                            <input type="text" name="fullName" id="fullName" required className="bg-gray-200 border text-black py-2 px-4 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" 
                            placeholder="Full Name" 
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="address" className="block mb-2 text-black font-bold">Address</label>
                            <input type="text" name="address" id="address" required className="bg-gray-200 border text-black py-2 px-4 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" 
                            placeholder="address" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="city" className="block mb-2 text-black font-bold">City</label>
                            <input type="text" name="city" id="city" required className="bg-gray-200 border text-black py-2 px-4 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" 
                            placeholder="city" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="postalCode" className="block mb-2 text-black font-bold">Postal Code</label>
                            <input type="number" name="postalCode" id="postalCode" required className="bg-gray-200 border text-black py-2 px-4 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" 
                            placeholder="postalCode" 
                            value={postalCode} 
                            onChange={(e) => setPostalCode(e.target.value)}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="country" className="block mb-2 text-black font-bold">Country</label>
                            <input type="text" name="country" id="country" required className="bg-gray-200 border text-black py-2 px-4 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" 
                            placeholder="country" 
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="number" className="block mb-2 text-black font-bold">Number</label>
                            <input type="number" name="number" id="number" required className="bg-gray-200 border text-black py-2 px-4 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" 
                            placeholder="number" 
                            value={number} 
                            onChange={(e) => setNumber(e.target.value)}/>
                        </div>
                        <button className="w-full text-center mt-2 text-indigo-100 font-bold bg-sky-900 p-3 rounded-md hover:bg-sky-700 transition duration-300 cursor-pointer">Continue</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}
