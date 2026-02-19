export const weatherService = {
    async getCurrentWeather(lat, lon) {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            if (!response.ok) throw new Error('Weather API error');
            const data = await response.json();
            return data.current_weather;
        } catch (error) {
            console.error('Error fetching weather:', error);
            return null;
        }
    },

    async getLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
            }
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position.coords),
                (error) => reject(error)
            );
        });
    },

    async getCityName(lat, lon) {
        try {
            // Using a free open reverse geocoding
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await response.json();
            return data.address.city || data.address.town || data.address.village || 'Unknown Location';
        } catch (error) {
            return 'Unknown Location';
        }
    }
};
