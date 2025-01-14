import React, { useEffect, useState } from 'react'
import Loader from '../components/Home/Loader/Loader'
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

const Cart = () => {
    const navigate = useNavigate()
    const [Cart, setCart] = useState([])
    const [Total, setTotal] = useState(0)
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      useEffect(() => {
        const fetch = async () => {
          const response = await api.get(
            `api/v1/get-user-cart`,
            { headers }
          );
          console.log(response.data.data)
          setCart(response.data.data);
        };
        fetch();
      }, []);
      const deleteItem = async (bookid) => {
        try {
            const response = await api.put(`api/v1/remove-from-cart/${bookid}`, {}, {headers})
            setCart(Cart.filter(book => book._id !== bookid))
            toast.success("Book deleted !", {
                    theme: "dark",
                  });
        } catch (error) {
            toast.error(error.message, {
                    theme: "dark",
                  });
        }
      }
      useEffect(() => {
        if(Cart && Cart.length > 0) {
            let total = 0
            Cart.forEach(book => {
                total += book.price
            })
            setTotal(total)
        }
      }, [Cart])
      const placeOrder = async () => {
        try {
            const response = await api.post(`api/v1/place-order`, {order: Cart}, {headers})
            console.log(response)
            toast.success("Order placed !", {
                theme: "dark",
              });
            navigate('/profile/orderHistory')
        } catch (error) {
            toast.error(error.message, {
                theme: "dark",
              });
        }
      }
  return (
    <div className="bg-zinc-900 px-8 h-[100%]  py-8  ">
      {
        !Cart && <div className='w-full h-screen bg-zinc-900 flex items-center justify-center'><Loader /></div>
      }
      {
        Cart && Cart.length === 0 && (
            <div className='h-screen bg-zinc-900'>
                <div className='h-[100%] flex items-center justify-center flex-col'>
                    <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
                        Empty Cart
                    </h1>
                    <img src='../EmptyCart.png'  alt='empty cart' className=' lg:h-[50vh]' />
                </div>
            </div>
        )
      }
      {
        Cart && Cart.length > 0 && (
            <>
                <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
                    Your cart
                </h1>
                {
                    Cart.map((item, i) => (
                        <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
                            <img src={item.url} alt='' className='h-[20vh] md-h-[10vh] object-cover ' />
                            <div className='w-full md:w-auto'>
                                <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                                    {item.title}
                                </h1>
                                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                                    {item.desc.slice(0, 100)} ... 
                                </p>
                                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>
                                    {item.desc.slice(0, 65)} ... 
                                </p>
                                <p className='text-normal text-zinc-300 mt-2 block md:hidden'>
                                    {item.desc.slice(0, 100)} ... 
                                </p>
                            </div>
                            <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                                <h2 className='text-zinc-100 text-3xl font-semibold flex'>
                                    Rs. {item.price}
                                </h2>
                                <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12' onClick={() => deleteItem(item._id)}>
                                <AiFillDelete size={24} />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </>
        )
      }
      {
        Cart && Cart.length > 0 && (
            <div className='mt-12 w-full flex items-center justify-end'>
                <div className='p-4 bg-zinc-800 rounded'>
                    <h1 className='text-3xl text-zinc-200 font-semibold'>
                        Total Amount
                    </h1>
                    <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
                        <h2>{Cart.length} books</h2> <h2>Rs. {Total}</h2>
                    </div>
                    <div className='w-[100%] mt-3'>
                        <button
                        className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-500 transition-all duration-300'
                        onClick={placeOrder}
                        >
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default Cart
