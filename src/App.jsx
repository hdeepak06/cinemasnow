import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import MovieDetailsModal from './components/MovieDetailsModal';
import Login from './pages/Login';
import { movieService } from './services/movieService';
import { weatherService } from './services/weatherService';
import { AnimatePresence } from 'framer-motion';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [weather, setWeather] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [trending, action, comedy, horror] = await Promise.all([
          movieService.searchMovies('Avengers'),
          movieService.searchMovies('Action'),
          movieService.searchMovies('Comedy'),
          movieService.searchMovies('Horror')
        ]);
        setTrendingMovies(trending);
        setActionMovies(action);
        setComedyMovies(comedy);
        setHorrorMovies(horror);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const coords = await weatherService.getLocation();
        const [weatherData, city] = await Promise.all([
          weatherService.getCurrentWeather(coords.latitude, coords.longitude),
          weatherService.getCityName(coords.latitude, coords.longitude)
        ]);
        if (weatherData) {
          setWeather({
            temp: Math.round(weatherData.temperature),
            city: city,
            condition: weatherData.weathercode
          });
        }
      } catch (error) {
        console.warn('Weather access denied');
      }
    };
    fetchWeather();
  }, []);

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      setSearchQuery('');
      return;
    }
    setSearchQuery(query);
    setIsLoading(true);
    const updatedHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    const results = await movieService.searchMovies(query);
    setSearchResults(results);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-netflix-black text-white selection:bg-netflix-red selection:text-white">
      <Navbar
        onSearch={handleSearch}
        searchHistory={searchHistory}
        onHistoryClick={handleSearch}
        weather={weather}
      />
      <main className="relative pb-24">
        {searchQuery ? (
          <div className="pt-24 px-4 md:px-12">
            <h2 className="text-2xl font-bold mb-8">Results for: <span className="text-netflix-red">{searchQuery}</span></h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {searchResults.map((movie) => (
                <div key={movie.id} className="aspect-[2/3] transform hover:scale-105 transition-transform duration-300">
                  <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover rounded-lg glass cursor-pointer" onClick={() => setSelectedMovie(movie)} />
                  <p className="mt-2 text-sm font-medium truncate">{movie.title}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <Hero movie={trendingMovies[0]} onInfoClick={setSelectedMovie} />
            <div className="-mt-16 md:-mt-32 relative z-10 space-y-8">
              <MovieRow title="Trending Now" movies={trendingMovies} onMovieClick={setSelectedMovie} />
              <MovieRow title="Action Thrillers" movies={actionMovies} onMovieClick={setSelectedMovie} />
              <MovieRow title="Comedies" movies={comedyMovies} onMovieClick={setSelectedMovie} />
            </div>
          </>
        )}
      </main>
      <AnimatePresence>
        {selectedMovie && <MovieDetailsModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      </AnimatePresence>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default App;
