import Head from 'next/head'
import Image from 'next/image'
import Layout from "../components/Layout"
import NextLink from "next/link"
import db from "../utlis/db"
import Product from "../models/Products"

export default function Home({products}) { 

  return (
    <Layout>
      <Head>
        <title>Pro Shop</title>
        <meta name='Keywords' content='web development, programming'/>
      </Head>
      <div className="sm:grid gap-6 grid-cols-2 grid-rows-3">
        {products.map((product) => (
          <NextLink href="product[slug]" as={`/products/${product.slug}`}>
           <div className="max-w-sm bg-white rounded-lg shadow-lg">
               <a href="#">
                 <img className="object-fill p-8 rounded-t-lg" src={`${product.image}`} alt={product.name} layout="fill"/>
               </a>
             <div className="px-5 pb-5">
                 <a href="#">
                   <h3 className="text-xl font-semibold tracking-tight text-gray-900">{product.name}</h3>
                 </a>
               <div className="flex items-center mt-2.5 mb-5">
   
               <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
   
                 {/* <svg className={`w-5 h-5 {{${product.rating} > 0 ? text-yellow-300 : text-green-300}}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                 <svg className={`w-5 h-5 {{${product.rating} > 1 ? text-yellow-300 : text-green-300}}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                 <svg className={`w-5 h-5 {{${product.rating} > 2 ? text-yellow-300 : text-green-300}}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                 <svg className={`w-5 h-5 {{${product.rating} > 3 ? text-yellow-300 : text-green-300}}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                 <svg className={`w-5 h-5 {{${product.rating} > 4 ? text-yellow-300 : text-green-300}}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> */}
                 <span className="text-black-700 text-xs font-semibold"> <strong className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>{product.rating}</strong>Rating from <strong className='text-blue-800 underline underline-offset-4'>{product.numReviews} Users</strong></span>
               </div>
               <div className="flex flex-row justify-between">
                 <div>
                     <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                 </div>
                 <NextLink href="product[id]" as={`/products/${product.id}` }>
                   <button className='bg-slate-800 rounded text-white p-1 '>Details</button>
                 </NextLink>
               </div>
             </div>
           </div>
       </NextLink>
        ))}
    </div>
    </Layout>
  )
}


export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    }
  }
}