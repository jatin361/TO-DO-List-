import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between border-indigo-700 text-white  py-2'>
     <div className="logo text-xl  font-bold mx-8">
        iTask
     </div>
     <div className="flex list-none gap-9 mx-9 ">

      <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
    <li className='cursor-pointer hover:font-bold transition-all'>Todo</li>
     </div>
    </div>
  )
}

export default Navbar
