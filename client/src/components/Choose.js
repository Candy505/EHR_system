import React from 'react'
import '../App.css'
import '../index.css'

function Choose() {

  const headerStyles = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fG1pbmltYWwlMjBwYXR0ZXJufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
  };

  
  return (

    <div >
 
    <div class="container mx-auto px-60 py-20" style={headerStyles}>
      <h1 class="text-3xl font-semibold text-white">Blockchain EHR: Your Health, Connected Securely</h1>
   
 
    <div class="">
    <label for="roleSelect" class="block mb-2 text-white">Enter a Username</label>
    <input type="text" class="block w-full border-gray-300 rounded-md p-2"/>
  <label for="roleSelect" class="block mb-2 text-white">Select Your Role:</label>
  <select id="roleSelect" class="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500">
    <option value="doctor">Doctor</option>
    <option value="patient">Patient</option>
  </select>
</div>
 </div>


    </div>
  )
}

export default Choose