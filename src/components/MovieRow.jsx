import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies, onMovieClick }) => {
    const rowRef = useRef(null);

    const scroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (!movies || movies.length === 0) return null;

    return (
        <div className="mb-8 md:mb-12 group/row relative px-4 md:px-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-200 mb-4 transition-colors group-hover/row:text-white">
                {title}
            </h2>

            <div className="relative">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-0 bottom-0 z-40 bg-black/50 w-12 hidden group-hover/row:flex items-center justify-center hover:bg-black/70 transition-all"
                >
                    <ChevronLeft className="w-8 h-8 text-white" />
                </button>

                <div
                    ref={rowRef}
                    className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-4"
                >
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onClick={onMovieClick}
                        />
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-0 bottom-0 z-40 bg-black/50 w-12 hidden group-hover/row:flex items-center justify-center hover:bg-black/70 transition-all"
                >
                    <ChevronRight className="w-8 h-8 text-white" />
                </button>
            </div>
        </div>
    );
};

export default MovieRow;
