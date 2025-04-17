import { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import RegionForm from './components/RegionForm';
import CropRecommendations from './components/CropRecommendations';


// Add the Footer import at the top with your other imports
import Footer from './components/Footer';

// Then in your App component's return statement, add the Footer at the bottom
function App() {
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastRegion, setLastRegion] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Fixed fetchGeoData function
  const fetchGeoData = async (region) => {
    try {
      // Special case for Mansa, Punjab
      if (region.toLowerCase().includes('mansa') && region.toLowerCase().includes('punjab')) {
        return {
          latitude: 29.9889,
          longitude: 75.3838,
          displayName: "Mansa, Punjab, India"
        };
      }
      
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(region)}&format=json&limit=1`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
          displayName: data[0].display_name
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching geo data:", error);
      return null;
    }
  };

  // Fixed fetchWeatherData function
  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  // Fixed getCropRecommendations function
  const getCropRecommendations = (weatherData, geoData) => {
    // Extract relevant weather data
    const avgMaxTemp = weatherData.daily.temperature_2m_max.reduce((sum, temp) => sum + temp, 0) / 
                      weatherData.daily.temperature_2m_max.length;
    const avgMinTemp = weatherData.daily.temperature_2m_min.reduce((sum, temp) => sum + temp, 0) / 
                      weatherData.daily.temperature_2m_min.length;
    const avgTemp = (avgMaxTemp + avgMinTemp) / 2;
    const totalPrecipitation = weatherData.daily.precipitation_sum.reduce((sum, precip) => sum + precip, 0);
    const avgWindSpeed = weatherData.daily.windspeed_10m_max.reduce((sum, speed) => sum + speed, 0) / 
                        weatherData.daily.windspeed_10m_max.length;

    // Sample crop recommendations based on weather conditions
    let recommendedCrops = [];
    
    // Warm climate crops
    if (avgTemp > 20) {
      recommendedCrops.push("Tomatoes", "Peppers", "Eggplant", "Okra", "Sweet Potatoes");
    }
    // Cool climate crops
    else if (avgTemp < 15) {
      recommendedCrops.push("Lettuce", "Spinach", "Kale", "Broccoli", "Cabbage");
    }
    // Moderate climate crops
    else {
      recommendedCrops.push("Corn", "Beans", "Squash", "Cucumbers", "Carrots");
    }
    
    // Adjust for precipitation
    if (totalPrecipitation > 50) {
      recommendedCrops.push("Rice", "Taro");
    } else if (totalPrecipitation < 20) {
      recommendedCrops.push("Sorghum", "Millet", "Sunflowers");
    }

    return {
      region: geoData.displayName,
      climate: {
        avgTemp: avgTemp.toFixed(1),
        totalPrecipitation: totalPrecipitation.toFixed(1),
        avgWindSpeed: avgWindSpeed.toFixed(1)
      },
      crops: recommendedCrops
    };
  };

  const handleRegionSubmit = async (region) => {
    setLoading(true);
    setError(null);
    setLastRegion(region);
    try {
      const geoData = await fetchGeoData(region);
      if (!geoData) {
        throw new Error('Location not found');
      }
      
      const weatherData = await fetchWeatherData(geoData.latitude, geoData.longitude);
      const cropRecommendations = getCropRecommendations(weatherData, geoData);
      setRecommendations(cropRecommendations);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setRecommendations(null);
  };

  if (!user) {
    return <Login onLogin={(email) => setUser(email)} />;
  }

  return (
    <div className="app-container">
      <header>
        <div className="header-content">
          <h1>Farmer's Guide</h1>
          <p>Find the perfect crops for your region</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <main>
        <div className="region-form-container">
          <RegionForm onSubmit={handleRegionSubmit} />
        </div>

        {loading && <div className="loading">Loading recommendations...</div>}
        
        {error && (
          <div className="error">
            <h3>Failed to get recommendations</h3>
            <p>We couldn't retrieve crop recommendations for your region. This might be due to network issues or the location not being found.</p>
            <button onClick={() => handleRegionSubmit(lastRegion)} className="retry-btn">
              Try Again
            </button>
          </div>
        )}
        
        {recommendations && !loading && (
          <CropRecommendations data={recommendations} />
        )}
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Farmer's Guide - Weather data provided by Open-Meteo</p>
      </footer>
    </div>
  );
}


export default App;