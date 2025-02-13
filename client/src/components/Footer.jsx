import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_2fr] gap-14 my-10 mt-40 text-sm'>
            {/*  Col 1 */}

            <div>
                <img onClick={() => {navigate('/'); scrollTo(0,0)}} className='w-40 mb-4 cursor-pointer hover:scale-105' src={assets.logo} alt='' />

                <p className='w-full text-gray-600 md:2/3 leading-6'>Your trusted partner in healthcare. Book appointments effortlessly and connect with expert doctors for quality medical care anytime, anywhere. Prioritizing your well-being with convenience and reliability!</p>
            </div>

            {/*  Col 2 */}

            <div>
                <p className='text-xl font-medium mb-4'>Quick Links</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <NavLink to={'/'}>
                        <li className='hover:font-medium'>Home</li>
                    </NavLink>
                    <NavLink to={'/about'}>
                        <li className='hover:font-medium'>About us</li>
                    </NavLink>
                    <NavLink to={'/contact'}>
                        <li className='hover:font-medium'>Contact us</li>
                    </NavLink>
                    <NavLink to={'/admin'}>
                        <li className='hover:font-medium'>Admin Panel</li>
                    </NavLink>
                </ul>
            </div>

            {/*  Col 3 */}

            <div>
                <p className='text-xl font-medium mb-4'>How to reach us?</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Call: +91 012-345-6789</li>
                    <li>Mail: doctime@gmail.com</li>
                    <li>Address: 123 road, near ABC park,Mumbai</li>
                </ul>
            </div>

        </div>

        {/* Copyright */}
        <div>
            <hr />
            <p className='text-center text-sm py-5'>&copy; 2015 @DocTime. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer