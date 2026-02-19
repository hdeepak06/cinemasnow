import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MovieCard = ({ movie, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative flex-none w-[160px] md:w-[240px] aspect-video group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                onClick={() => onClick(movie)}
                className="w-full h-full cursor-pointer overflow-hidden rounded-md transition-all duration-300 group-hover:opacity-0"
            >
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 0 }}
                        animate={{ scale: 1.2, opacity: 1, y: -40 }}
                        exit={{ scale: 0.8, opacity: 0, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-0 left-0 w-full z-10 glass-dark rounded-xl shadow-2xl overflow-hidden cursor-pointer"
                        onClick={() => onClick(movie)}
                    >
                        <div className="relative aspect-video">
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>

                        <div className="p-4 bg-zinc-900/90 backdrop-blur-md">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
                                    <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                                </div>
                                <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:border-white transition-colors">
                                    <Plus className="w-4 h-4 text-white" />
                                </div>
                                <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:border-white transition-colors ml-auto">
                                    <ChevronDown className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-[10px] md:text-sm font-semibold mb-2">
                                <span className="text-green-500">95% Match</span>
                                <span className="text-gray-400">{movie.year}</span>
                                <span className="border border-gray-500 px-1 text-[8px]">HD</span>
                            </div>

                            <h3 className="text-sm font-bold truncate mb-1">{movie.title}</h3>
                            <p className="text-[10px] text-gray-400 line-clamp-1">
                                {movie.actors?.split(',').slice(0, 2).join(', ')}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MovieCard;
