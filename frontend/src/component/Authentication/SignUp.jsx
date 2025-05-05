import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const signUpWithGoogle = async () => {
        setAuthing(true);
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(response => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setAuthing(false);
            });
    };

    const signUpWithEmail = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setAuthing(true);
        setError('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setAuthing(false);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center  p-4">
            <div className="w-full max-w-md bg-gradient-to-br from-[#1f0036] to-[#0f172a] rounded-xl shadow-2xl overflow-hidden p-8 flex flex-col items-center justify-center">
                
                <div className="mb-8 text-center text-white">
                    <h3 className="text-4xl font-bold mb-2">Sign Up</h3>
                    <p className="text-lg text-gray-400">Welcome! Please enter your information below to begin.</p>
                </div>

                <div className="flex flex-col gap-4 w-full mb-6">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Re-Enter Password"
                        className="w-full py-3 px-4 rounded-md bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>


                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                    onClick={signUpWithEmail}
                    disabled={authing}
                    className="w-full py-3 mb-4 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
                >
                    Sign Up With Email and Password
                </button>

                <div className="flex items-center justify-center my-4 w-full">
                    <div className="border-b border-gray-600 w-full"></div>
                    <span className="px-4 text-gray-400">OR</span>
                    <div className="border-b border-gray-600 w-full"></div>
                </div>

                <button
                    onClick={signUpWithGoogle}
                    disabled={authing}
                    className="w-full py-3 bg-gray-100 text-black font-semibold rounded-md hover:bg-gray-300 transition"
                >
                    Sign Up With Google
                </button>

                <div className="mt-8 text-center text-gray-400 text-sm">
                    Already have an account?{" "}
                    <a href="/" className="font-semibold text-white underline hover:text-gray-300">
                        Log In
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
