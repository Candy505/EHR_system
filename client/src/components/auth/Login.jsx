import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth,db } from "../../firebase";
import Info from '../storage/Info';
import React,{ useEffect,useState }from 'react';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 
     const headerStyles = {
            backgroundImage: 'url(https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fG1pbmltYWwlMjBwYXR0ZXJufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        
          };
    const navigate = useNavigate();
   
    const handleSignUpRedirect = () => {
        navigate('/signup')
        console.log('Redirect to signup page');
      };
    const signIn = (e) => {
        e.preventDefault();

       

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                navigate('/Info')
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <>
         <div class="container mx-auto px-60 py-20" style={headerStyles}>
        <h1 class="text-3xl font-semibold text-white">Blockchain EHR: Your Health, Connected Securely</h1>
        </div>
        <div className="sign-in-container mt-4">
        <form onSubmit={signIn} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-semibold mb-4">Log In to your Account</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Log In
          </button>
          <button
          type="button"
          onClick={handleSignUpRedirect}
          className="w-full bg-gray-500 text-white py-2 rounded-md mt-3"
        >
          Not Registered? Go to Signup
        </button>

        </form>
      </div>
      </>
    );
}

export default Login