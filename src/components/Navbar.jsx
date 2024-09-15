import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-slate-900 text-white py-3'>
        <div className='logo'>
            <span className='font-bold text-x1 mx-9'>TODO APP</span>
        </div>
        <ul className="flex gap-10 mx-9">
            <li className='cursor-pointer hover:font-bold transistion-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transistion-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
