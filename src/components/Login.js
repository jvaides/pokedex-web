import { signInWithGoogle, auth } from "../service/firebase";
import { useState, useEffect } from "react";

import "../style.css";
const Login = () => {
  return (
    <div className="place-items-center place-content-center">
      <div class="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
        <img
          src="https://camo.githubusercontent.com/418d92ecbe7cd1805153001a34147ab7c965103432ff4a68eaa2fc5d4e6c1b42/68747470733a2f2f696b2e696d6167656b69742e696f2f6877796b73766a3469762f706f6b656465785f4e5f576757724a4b30732e706e67"
          class="h-12 mb-3 sm:h-12"
          alt="Flowbite Logo"
        />

        <button
          class="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded"
          onClick={signInWithGoogle}
        >
          Sign in with google
        </button>
      </div>
    </div>
  );
};

export default Login;
