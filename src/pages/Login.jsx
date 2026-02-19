import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleAuth = (e) => {
        e.preventDefault();
        // Simulate login
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1574267432553-4b20206689e8?auto=format&fit=crop&q=80&w=1920"
                    alt="Cinema Background"
                    className="w-full h-full object-cover opacity-40 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
            </div>

            {/* Header Logo */}
            <div className="absolute top-0 left-0 w-full p-8 md:px-12 z-20">
                <h1 className="text-netflix-red text-3xl md:text-4xl font-black tracking-tighter">
                    CINEMASNOW
                </h1>
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-[450px] p-10 md:p-16 glass-dark rounded-xl shadow-2xl mx-4"
            >
                <h2 className="text-3xl font-bold mb-8 text-white">
                    {isSignIn ? 'Sign In' : 'Sign Up'}
                </h2>

                <form onSubmit={handleAuth} className="space-y-4">
                    {!isSignIn && (
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-4 rounded bg-zinc-800/70 border border-white/10 focus:border-white/50 outline-none transition-all placeholder:text-gray-500"
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email or phone number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 rounded bg-zinc-800/70 border border-white/10 focus:border-white/50 outline-none transition-all placeholder:text-gray-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 rounded bg-zinc-800/70 border border-white/10 focus:border-white/50 outline-none transition-all placeholder:text-gray-500"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full p-4 bg-netflix-red text-white font-bold rounded-md hover:bg-netflix-darkRed transition-all mt-4 active:scale-95"
                    >
                        {isSignIn ? 'Sign In' : 'Sign Up'}
                    </button>

                    <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="accent-netflix-red" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#" className="hover:underline">Need help?</a>
                    </div>
                </form>

                <div className="mt-12 text-gray-500">
                    <p>
                        {isSignIn ? 'New to CinemasNow?' : 'Already have an account?'}
                        <button
                            onClick={() => setIsSignIn(!isSignIn)}
                            className="text-white ml-2 hover:underline font-medium"
                        >
                            {isSignIn ? 'Sign up now.' : 'Sign in now.'}
                        </button>
                    </p>
                    <p className="text-[13px] mt-4 leading-tight">
                        This page is protected by Google reCAPTCHA to ensure you're not a bot.
                        <span className="text-blue-500 cursor-pointer hover:underline ml-1">Learn more.</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
