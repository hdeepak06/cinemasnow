import React, { useEffect, useState } from 'react';
import { X, Play, Plus, ThumbsUp, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MovieDetailsModal = ({ movie, onClose }) => {
    if (!movie) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-dark rounded-2xl shadow-2xl no-scrollbar"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full hover:bg-black/80 transition-all text-white"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="relative aspect-video">
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-900 to-transparent" />

                    <div className="absolute bottom-8 left-8 right-8">
                        <h2 className="text-3xl md:text-5xl font-black mb-6 drop-shadow-lg">{movie.title}</h2>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-white/90 transition-all font-bold">
                                <Play className="w-5 h-5 fill-black" />
                                Play
                            </button>
                            <div className="flex items-center gap-2">
                                <button className="p-3 border-2 border-gray-500 rounded-full hover:border-white transition-all text-white">
                                    <Plus className="w-5 h-5" />
                                </button>
                                <button className="p-3 border-2 border-gray-500 rounded-full hover:border-white transition-all text-white">
                                    <ThumbsUp className="w-5 h-5" />
                                </button>
                            </div>
                            <button className="ml-auto p-3 border-2 border-gray-500 rounded-full hover:border-white transition-all text-white">
                                <Volume2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-8 grid md:grid-cols-3 gap-8 ">
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center gap-3 text-sm font-semibold">
                            <span className="text-green-500">98% Match</span>
                            <span className="text-gray-400">{movie.year}</span>
                            <span className="border border-gray-600 px-1 text-[10px] text-gray-400">16+</span>
                            <span className="text-gray-400">2h 15m</span>
                            <span className="bg-white/10 px-2 py-0.5 rounded text-xs">HD</span>
                        </div>

                        <p className="text-lg text-gray-200 leading-relaxed">
                            This visually stunning journey takes you deep into the heart of {movie.title}.
                            Experience the emotional depth and thrilling action that has captivated audiences around the world.
                            A must-watch for fans of high-quality storytelling and technical brilliance.
                        </p>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div>
                            <span className="text-gray-500">Cast: </span>
                            <span className="text-gray-200">{movie.actors || 'Unknown'}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Genres: </span>
                            <span className="text-gray-200">{movie.type === 'series' ? 'TV Show, Series' : 'Movie, Action, Drama'}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">This title is: </span>
                            <span className="text-gray-200">Exciting, Imaginative, Emotional</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default MovieDetailsModal;
