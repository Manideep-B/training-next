import axios from "axios"
import Cookies from "js-cookie"
import NextLink from "next/link"
import Link from 'next/link'
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react'
import { Store } from "../utlis/Store"

export default function Register() {
    const router = useRouter()
    const { redirect } = router.query;
    const {state, dispatch} =useContext(Store)
    const { userInfo } = state;
    useEffect(() =>{
        if(userInfo) {
            router.push("/")
        }
    }, [])
   
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const submitHandler = async(e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            alert("password don't match")
            return;
        }
        try{
        const { data } = await axios.post('/api/users/register',
         {name, email, password }
         )
         dispatch({type: "USER_LOGIN", payload: data});
         Cookies.set('userInfo', JSON.stringify(data));
         router.push(redirect || '/');
        } catch(err) {
            alert(err.response.data? err.response.data.message : err.message)
        }
    }

  return (
    <>
        <form type="submit" onSubmit={submitHandler}>  
            <div className="min-h-screen m-4 flex items-center">
                <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
                    <div className="py-12 p-10 bg-slate-700 rounded-xl">
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-white font-bold ">Your name</label>
                            <input type="text" id="name" required className="bg-white border text-black py-2 px-4 w-96 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-white font-bold ">Your email</label>
                            <input type="email" id="email" required className="bg-white border text-black py-2 px-4 w-96 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => setEmail(e.target.value)} placeholder="@example.com"/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-white font-bold ">password</label>
                            <input type="password" id="password" required className="bg-white border text-black py-2 px-4 w-96 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block mb-2 text-white font-bold ">confirmPassword</label>
                            <input type="password" id="confirmPassword" required className="bg-white border text-black py-2 px-4 w-96 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </div>
                        <div className="text-sm text-white inline-block mt-4 hover:text-white hover:underline hover:cursor-pointer transition duration-200 no-underline"> Have an account? &nbsp;
                            <NextLink href={`/Login?redirect=${redirect || '/'}`} passHref> Login 
                            </NextLink>
                        </div>
                            <button type='submit' className="w-full mt-6 text-white font-bold bg-sky-900 py-3 rounded-md hover:bg-sky-700 transition duration-300">Register</button>
                    </div>
                </div>
            </div>
        </form>
    </>
  )
}
