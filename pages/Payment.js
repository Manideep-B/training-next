import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utlis/Store'

export default function Payment() {

    const  router  = useRouter()
    const [paymentMethod , setPaymentMethod] = useState("")
    const { state , dispatch } = useContext(Store)
    const { cart: {shippingAddress} } = state;

    useEffect(() => {
        if(!shippingAddress) {
            router.push('/Shipping')
        } else {
            setPaymentMethod(Cookies.get(paymentMethod) || '')
        }
    }, [])

    const SubmitHandler = (e) => {
        e.preventDefault()
        if(!paymentMethod) {
            alert("Select Payment Method")
        } else {
            dispatch({type: "SAVE_PAYMENT_METHOD", payload: paymentMethod})
            Cookies.set("paymentMethod", paymentMethod)
            router.push('/PlaceOrder')
        }
    }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-500">
        <form className="m-4 w-4/6" onSubmit={SubmitHandler}>
            <div className="contents">
                <div className="flex justify-center items-center container mx-auto transition duration-300">
                    <div className="p-10 rounded-xl w-4/6 bg-white">
                        <div className="block  flex flex-col justify-center items-center">
                            <span className="text-2xl text-sky-700 text-center mb-2 font-semibold">Checkboxes</span>
                            <div className="mt-2">
                                <div>
                                    <label className="inline-flex items-center mb-2 ">
                                        <input type="checkbox" className="form-checkbox" value="PayPal" onClick={(e) =>setPaymentMethod(e.target.value)}/>
                                        <span className="ml-2">PayPal</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex items-center mb-2">
                                        <input type="checkbox" className="form-checkbox" disabled/>
                                        <span className="ml-2">Cash on Delivery</span>
                                    </label>
                                </div>
                            </div>
                            <button className="w-3/6 text-center mt-4 text-indigo-100 font-bold bg-sky-900 p-3 rounded-md hover:bg-sky-700 transition duration-300 cursor-pointer">Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}
