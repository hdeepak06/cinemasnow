const BASE_URL = 'https://imdb.iamidiotareyoutoo.com';

export const movieService = {
    async searchMovies(query) {
        try {
            const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.description.map(item => ({
                id: item['#IMDB_ID'],
                title: item['#TITLE'],
                year: item['#YEAR'],
                rank: item['#RANK'],
                actors: item['#ACTORS'],
                poster: item['#IMG_POSTER'],
                type: item['#AKA']?.toLowerCase().includes('series') ? 'series' : 'movie'
            }));
        } catch (error) {
            console.error('Error searching movies:', error);
            return [];
        }
    },

    async getMovieDetails(id) {
        try {
            const response = await fetch(`${BASE_URL}/search?tt=${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            // The detailed response is complex, we'll try to extract what we can
            // For now, return the basic info if detail fetch is tricky
            return data;
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return null;
        }
    }
};
