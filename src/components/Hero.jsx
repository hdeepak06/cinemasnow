import React from 'react';
import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = ({ movie, onInfoClick }) => {
    if (!movie) return (
        <div className="h-[80vh] w-full bg-netflix-black animate-pulse flex items-center justify-center">
            <div className="text-white opacity-20 text-6xl font-bold italic">CINEMASNOW</div>
        </div>
    );

    return (
        <div className="relative h-[85vh] w-full overflow-hidden">
            {/* Background Image */}
            <img
                src={movie.poster}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover object-top scale-110 blur-sm brightness-50"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 hero-gradient" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <span className="text-netflix-red font-bold tracking-[0.4em] text-xs mb-2 block animate-pulse">
                        FEATURED CONTENT
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black mb-4 drop-shadow-2xl">
                        {movie.title}
                    </h1>
                    <div className="flex items-center gap-3 mb-6 text-sm md:text-base font-semibold text-gray-200">
                        <span className="text-green-500">98% Match</span>
                        <span>{movie.year}</span>
                        <span className="border px-1 border-white/50 text-[10px]">16+</span>
                        <span>2h 15m</span>
                        <span className="bg-white/10 px-2 py-0.5 rounded text-xs">4K Ultra HD</span>
                    </div>
                    <p className="text-gray-300 text-sm md:text-lg mb-8 line-clamp-3 md:line-clamp-4 leading-relaxed max-w-xl">
                        {movie.actors ? `Starring ${movie.actors}. ` : ''}
                        Experience this epic journey from a whole new perspective. A masterpiece of cinematography and storytelling that will leave you at the edge of your seat.
                    </p>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 bg-white text-black px-6 md:px-10 py-2.5 rounded hover:bg-white/90 transition-all font-bold group">
                            <Play className="w-5 h-5 fill-black group-hover:scale-110 transition-transform" />
                            Play
                        </button>
                        <button
                            onClick={() => onInfoClick(movie)}
                            className="flex items-center gap-2 glass text-white px-6 md:px-10 py-2.5 rounded hover:bg-white/10 transition-all font-bold group"
                        >
                            <Info className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            More Info
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Side Vignette */}
            <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-netflix-black/50 to-transparent pointer-events-none" />
        </div>
    );
};

export default Hero;
