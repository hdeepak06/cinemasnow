import React, { useState, useEffect } from 'react';
import { Search, Bell, User, History, Cloud } from 'lucide-react';
import { cn } from '../utils/cn';

const Navbar = ({ onSearch, searchHistory, onHistoryClick, weather }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            onSearch(searchValue);
            setShowHistory(false);
        }
    };

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-12 py-4 flex items-center justify-between",
            isScrolled ? "glass-dark py-2" : "bg-gradient-to-b from-black/80 to-transparent"
        )}>
            <div className="flex items-center gap-8">
                <h1 className="text-netflix-red text-2xl md:text-3xl font-bold tracking-tighter cursor-pointer">
                    CINEMASNOW
                </h1>

                <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-300">
                    <button className="hover:text-white transition-colors">Home</button>
                    <button className="hover:text-white transition-colors">TV Shows</button>
                    <button className="hover:text-white transition-colors">Movies</button>
                    <button className="hover:text-white transition-colors">New & Popular</button>
                </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                {/* Weather Widget */}
                {weather && (
                    <div className="hidden sm:flex items-center gap-2 glass px-3 py-1 rounded-full text-xs animate-in fade-in duration-500">
                        <Cloud className="w-4 h-4 text-blue-400" />
                        <span>{weather.temp}°C</span>
                        <span className="text-gray-400 ml-1 truncate max-w-[80px]">{weather.city}</span>
                    </div>
                )}

                <div className="relative group">
                    <form onSubmit={handleSubmit} className="relative flex items-center">
                        <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Titles, people, genres"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onFocus={() => setShowHistory(true)}
                            className="bg-black/40 border border-white/20 pl-10 pr-4 py-1.5 rounded-full text-sm outline-none focus:w-64 transition-all duration-300 w-40 md:w-48 glass"
                        />
                    </form>

                    {/* Search History Dropdown */}
                    {showHistory && searchHistory.length > 0 && (
                        <div
                            className="absolute top-full mt-2 right-0 w-64 glass-dark rounded-xl overflow-hidden shadow-2xl animate-in slide-in-from-top-2 duration-200"
                            onMouseLeave={() => setShowHistory(false)}
                        >
                            <div className="p-3 border-b border-white/10 flex items-center gap-2 text-xs text-gray-400">
                                <History className="w-3 h-3" />
                                <span>Recent Searches</span>
                            </div>
                            <div className="max-h-48 overflow-y-auto">
                                {searchHistory.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            onHistoryClick(item);
                                            setSearchValue(item);
                                            setShowHistory(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Bell className="w-5 h-5 text-gray-300 cursor-pointer hover:text-white" />
                <div className="relative group">
                    <div className="w-8 h-8 rounded bg-netflix-red flex items-center justify-center cursor-pointer">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute top-full right-0 mt-2 w-32 glass-dark rounded-md hidden group-hover:block transition-all">
                        <button
                            onClick={() => {
                                localStorage.removeItem('isAuthenticated');
                                window.location.reload();
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 text-white rounded-md"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>            </div>
        </nav>
    );
};

export default Navbar;
