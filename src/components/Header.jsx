import React from 'react'

const Header = () => {
  return (
    <div>
        <header className='bg-black text-white'>
            <ul className='flex gap-5 justify-center mb-5 p-3 cursor-pointer'>
                <li>Home</li>
                <li>Gallery</li>
                <li>Pages</li>
                <li>Contact</li>
                <li>Buy Now</li>
            </ul>
        </header>
    </div>
  )
}

export default Header