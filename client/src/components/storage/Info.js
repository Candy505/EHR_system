import React from 'react'
import Signout from '../auth/Signout'
import { auth, db } from '../../firebase'
import { getDocs, doc, collection,where,query, addDoc, deleteDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
function Info() {
    const [userList, setuserList] = useState([]);
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [age, setAge] = useState("");
    const userCollectionRef = collection(db, "users");
    const [showForm, setShowForm] = useState(false);

    const getuserList = async () => {
      
        try {
            const q = query(userCollectionRef, where('userId', '==', auth?.currentUser?.uid));
            const data = await getDocs(q);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data()
                , id: doc.id,

            }))
            setuserList(filteredData)
          
            // console.log({filteredData})
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        // Trigger getuserList() whenever there is an authenticated user or when the page is refreshed with an authenticated user
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            getuserList();
          }
        });
    
        return () => unsubscribe(); // Unsubscribe the listener when the component unmounts
      }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await addDoc(userCollectionRef, {
                name: username,
                role: role,
                age: age,
                userId: auth?.currentUser?.uid,
            });


            getuserList();
            setShowForm(false);
        } catch (err) {
            console.log(err)
        }

        console.log("Username:", username);
        console.log("Role Type:", role);
        console.log("Age:", age);

    };


    // delete a user
    const deleteUser = async(id,userId)=>{

        if (auth.currentUser && userId === auth.currentUser.uid) {
          const userDoc = doc(db, "users", id);
          await deleteDoc(userDoc);
        } else {
          console.log("Unauthorized. You can only delete your own posts.");
        }
        
       };

       
    return (
        <div>
            <Signout />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
            {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add User Information
          </button>
        ) : (
      <div className="p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-4">User Information Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="username" className="block font-semibold">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />

          <label htmlFor="role" className="block font-semibold">
            Role Type:
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />

          <label htmlFor="age" className="block font-semibold">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
        )}
      <div className="space-y-4">
        {userList.map((user) => (
          <div
            key={user.id}
            className="p-4 bg-white shadow-md rounded-md flex justify-between"
          >
            <div>
              <h1 className="text-xl font-semibold">{user.name}</h1>
              <h3 className="text-gray-600">Age: {user.age}</h3>
              <h3 className="text-gray-600">Role: {user.role}</h3>
            </div>
            <button
              onClick={() => deleteUser(user.id, user.userId)}
              className="bg-red-500 text-white px-2 py-1 rounded-md"
            >
              Delete a User
            </button>
          </div>
        ))}
      </div>
    </div>
        </div>
    )
}

export default Info