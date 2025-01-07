import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-600 flex justify-around text-white p-3'>
        <div className="logo mx-9 font-bold text-2xl">
            <span>ToDo-project</span>
        </div>
        <ul className='flex gap-7 mx-7'>
            <li className='cursor-pointer hover:font-bold transition-all duration-1'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-1'>Your task</li>
        </ul>


    </nav>
     
  )
}

export default Navbar
