import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState,useEffect } from "react";
import { auth } from "../../firebase";
import { db } from '../../firebase';
import { getDocs,doc,collection,addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const [userList,setuserList] = useState([]);
  const headerStyles = {
    backgroundImage: 'url(https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fG1pbmltYWwlMjBwYXR0ZXJufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

  };


  const userCollectionRef = collection(db, "users");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const signUp = (e) => {

    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        handleAuth(e);
        navigate('/Info')
        console.log(userCredential);
      }).catch((error) => {
        console.error("Error creating user data in Firestore:", error);
      });

  };


  const handleAuth = async (e) => {


    try {

      // Create a new collection with the username as the collection name

      await addDoc(userCollectionRef, {
        name: "heena",
        role: "patient",
        age: Number(23),
        userId: auth?.currentUser?.uid,
      });

    } catch (err) {
      console.log(err)
    }

    //console.log("Username:", username);
    //console.log("Role Type:", role);
    //console.log("Age:", age);


  }
    
  return (

    <div >

      <div class="container mx-auto px-60 py-20" style={headerStyles}>
        <h1 class="text-3xl font-semibold text-white">Blockchain EHR: Your Health, Connected Securely</h1>



      </div>
      <div className="sign-in-container p-4">
        <form onSubmit={signUp} className="space-y-4">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          ></input>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          ></input>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Sign Up
          </button>
        </form>
      </div>


    </div>
  )
}

export default Signup

/*<div class="">
    <label for="roleSelect" class="block mb-2 text-white">Enter a Username</label>
    <input type="text" class="block w-full border-gray-300 rounded-md p-2"/>
  <label for="roleSelect" class="block mb-2 text-white">Select Your Role:</label>
  <select id="roleSelect" class="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500">
    <option value="doctor">Doctor</option>
    <option value="patient">Patient</option>
  </select>
</div>*/