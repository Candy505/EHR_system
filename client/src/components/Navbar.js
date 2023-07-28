import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'


function Navbar() {

    
  return (
    <nav class="bg-slate-950 p-4 ">
<div class="container mx-auto">
  <div class="flex justify-between items-center">

    <a href="#" class="text-white font-bold text-xl">Your Brand</a>


    <ul class="flex space-x-4">
      <li> <Link class="text-white text-l" to='/home' target='_blank'>Home</Link></li>
      <li><Link class="text-white text-l" to='/' target='_blank'>About</Link></li>
      <li><a href="https://github.com/Shiraja" target="_blank" class="text-white">Contact</a></li>
    </ul>
  </div>
</div>
</nav>
  )
}

export default Navbar
