import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";

const Signout = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="flex items-center justify-end">
      {authUser ? (
        <div className="text-white bg-blue-500 px-4 py-2 rounded-md">
          <p>{`Signed In as ${authUser.email}`}</p>
          <button
            onClick={userSignOut}
            className="text-white bg-red-500 px-2 py-1 rounded-md ml-2"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p className="text-white bg-red-500 px-4 py-2 rounded-md">Signed Out</p>
      )}
    </div>
    </div>
  );
};

export default Signout;