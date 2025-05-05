import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";

function Login() {
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  const signInWithEmail = async () => {
    setAuthing(true);
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setAuthing(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-6 sm:p-4">
       <div className="w-full max-w-md bg-[#0f172a] backdrop-blur-md rounded-xl shadow-2xl p-8 flex flex-col items-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
        
    
        <div className="mb-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">Login</h3>
          <p className="text-sm sm:text-lg text-gray-300">
            Welcome Back! Please enter your details.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full mb-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-white transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-white transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={signInWithEmail}
          disabled={authing}
          className="w-full py-3 mb-4 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition disabled:opacity-60"
        >
          Log In With Email
        </button>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="flex items-center w-full my-4">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <button
          onClick={signInWithGoogle}
          disabled={authing}
          className="w-full py-3 bg-gray-100 text-black font-semibold rounded-md hover:bg-gray-300 transition disabled:opacity-60"
        >
          Log In With Google
        </button>

        <div className="mt-8 text-center text-gray-300 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-white underline hover:text-gray-300"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
