import { useState } from 'react';

function CropRecommendations({ data }) {
  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
  };

  const handleCloseDetails = () => {
    setSelectedCrop(null);
  };

  // Function to get crop image URL
  const getCropImageUrl = (crop) => {
    const cropImages = {
      "Tomatoes": "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Peppers": "https://images.unsplash.com/photo-1563746924237-f81657aaf4af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Eggplant": "https://images.unsplash.com/photo-1613499563689-8b9f5d2c8d43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Okra": "https://images.unsplash.com/photo-1626920369271-437a92e6d7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Sweet Potatoes": "https://images.unsplash.com/photo-1596124536207-2e03c8f12a6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Lettuce": "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Spinach": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Kale": "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Broccoli": "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Cabbage": "https://images.unsplash.com/photo-1594282486552-05a9f0a53f09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Corn": "https://images.unsplash.com/photo-1601593768799-76e7f330a1f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Beans": "https://images.unsplash.com/photo-1593465678160-f99a8371f9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Squash": "https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Cucumbers": "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Carrots": "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Rice": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Taro": "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Sorghum": "https://images.unsplash.com/photo-1628352081506-83c43123ed7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Millet": "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Sunflowers": "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      // Add crops specific to Punjab region
      "Wheat": "https://images.unsplash.com/photo-1574323347407-f5e1c5a1ec21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Cotton": "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Sugarcane": "https://images.unsplash.com/photo-1596241913242-b20788b3dfbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Mustard": "https://images.unsplash.com/photo-1552663651-2e4250e6c7c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "Barley": "https://images.unsplash.com/photo-1594661387748-3d553e3f8c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    };
    
    // Try to get the image URL, if not found use a default
    const imageUrl = cropImages[crop];
    if (imageUrl) {
      return imageUrl;
    } else {
      console.log(`No image found for crop: ${crop}`);
      return "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    }
  };

  return (
    <div className="recommendations-container">
      <h2>Recommendations for {data.region}</h2>
      
      <div className="climate-info">
        <div className="info-item">
          <h3>Climate Information</h3>
          <ul>
            <li><strong>Average Temperature:</strong> {data.climate.avgTemp}°C</li>
            <li><strong>Total Precipitation:</strong> {data.climate.totalPrecipitation} mm</li>
            <li><strong>Average Wind Speed:</strong> {data.climate.avgWindSpeed} km/h</li>
          </ul>
        </div>
      </div>
      
      <div className="crops-section">
        <h3>Recommended Crops</h3>
        <ul className="crops-list">
          {data.crops.map((crop, index) => (
            <li key={index} onClick={() => handleCropClick(crop)}>
              {crop}
            </li>
          ))}
        </ul>
      </div>

      {selectedCrop && (
        <div className="crop-details-overlay" onClick={handleCloseDetails}>
          <div className="crop-details-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseDetails}>&times;</button>
            
            <div className="crop-header">
              <h2>{selectedCrop}</h2>
              <div className="crop-image-container">
                <img 
                  src={getCropImageUrl(selectedCrop)} 
                  alt={selectedCrop} 
                  className="crop-image" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/no-image.png";
                  }}
                />
              </div>
            </div>
            
            <div className="crop-info-grid">
              <div className="crop-info-item">
                <h3>Growing Conditions</h3>
                <ul>
                  <li>Optimal Temperature: {getCropTemperature(selectedCrop)}</li>
                  <li>Water Needs: {getCropWaterNeeds(selectedCrop)}</li>
                  <li>Soil Type: {getCropSoilType(selectedCrop)}</li>
                </ul>
              </div>
              
              <div className="crop-info-item">
                <h3>Planting Information</h3>
                <ul>
                  <li>Planting Season: {getCropPlantingSeason(selectedCrop)}</li>
                  <li>Growth Period: {getCropGrowthPeriod(selectedCrop)}</li>
                  <li>Spacing: {getCropSpacing(selectedCrop)}</li>
                </ul>
              </div>
              
              <div className="crop-info-item">
                <h3>Care Tips</h3>
                <ul>
                  <li>Fertilizer: {getCropFertilizer(selectedCrop)}</li>
                  <li>Pest Control: {getCropPestControl(selectedCrop)}</li>
                  <li>Harvesting: {getCropHarvesting(selectedCrop)}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper functions to provide crop-specific information
function getCropTemperature(crop) {
  const cropInfo = {
    "Tomatoes": "21-27°C",
    "Peppers": "21-29°C",
    "Eggplant": "21-30°C",
    "Okra": "24-30°C",
    "Sweet Potatoes": "21-29°C",
    "Lettuce": "10-21°C",
    "Spinach": "10-21°C",
    "Kale": "10-21°C",
    "Broccoli": "15-21°C",
    "Cabbage": "15-21°C",
    "Corn": "18-24°C",
    "Beans": "18-24°C",
    "Squash": "18-24°C",
    "Cucumbers": "18-24°C",
    "Carrots": "15-21°C",
    "Rice": "21-32°C",
    "Taro": "21-32°C",
    "Sorghum": "21-35°C",
    "Millet": "21-35°C",
    "Sunflowers": "18-30°C",
    // Punjab region crops
    "Wheat": "15-24°C",
    "Cotton": "21-35°C",
    "Sugarcane": "24-35°C",
    "Mustard": "15-25°C",
    "Barley": "15-24°C"
  };
  return cropInfo[crop] || "18-24°C";
}

// After the getCropTemperature function, add these missing helper functions:

function getCropWaterNeeds(crop) {
  const cropInfo = {
    "Tomatoes": "Regular, consistent watering",
    "Peppers": "Moderate, consistent watering",
    "Eggplant": "Regular, consistent watering",
    "Okra": "Moderate, drought-tolerant once established",
    "Sweet Potatoes": "Moderate, drought-tolerant once established",
    "Lettuce": "Regular, consistent watering",
    "Spinach": "Regular, consistent watering",
    "Kale": "Regular, consistent watering",
    "Broccoli": "Regular, consistent watering",
    "Cabbage": "Regular, consistent watering",
    "Corn": "High water needs, especially during tasseling",
    "Beans": "Moderate, consistent watering",
    "Squash": "Moderate to high, consistent watering",
    "Cucumbers": "High water needs, consistent watering",
    "Carrots": "Moderate, consistent watering",
    "Rice": "Very high, requires flooding",
    "Taro": "Very high, prefers wet conditions",
    "Sorghum": "Low, drought-tolerant",
    "Millet": "Low, drought-tolerant",
    "Sunflowers": "Low to moderate, drought-tolerant once established",
    "Wheat": "Moderate, critical during heading and grain filling",
    "Cotton": "Moderate, critical during flowering and boll development",
    "Sugarcane": "High, consistent watering throughout growth",
    "Mustard": "Low to moderate, drought-tolerant",
    "Barley": "Low to moderate, drought-tolerant"
  };
  return cropInfo[crop] || "Moderate watering";
}

function getCropSoilType(crop) {
  const cropInfo = {
    "Tomatoes": "Well-drained, loamy soil",
    "Peppers": "Well-drained, loamy soil",
    "Eggplant": "Well-drained, loamy soil",
    "Okra": "Well-drained, sandy loam",
    "Sweet Potatoes": "Sandy loam, well-drained",
    "Lettuce": "Rich, well-drained soil",
    "Spinach": "Rich, well-drained soil",
    "Kale": "Rich, well-drained soil",
    "Broccoli": "Rich, well-drained soil",
    "Cabbage": "Rich, well-drained soil",
    "Corn": "Rich, well-drained soil",
    "Beans": "Well-drained, loamy soil",
    "Squash": "Rich, well-drained soil",
    "Cucumbers": "Rich, well-drained soil",
    "Carrots": "Sandy loam, well-drained",
    "Rice": "Clay soil that retains water",
    "Taro": "Rich, moist soil",
    "Sorghum": "Adaptable to various soils",
    "Millet": "Adaptable to various soils",
    "Sunflowers": "Well-drained, loamy soil",
    "Wheat": "Loamy soil with good drainage",
    "Cotton": "Well-drained, loamy to sandy soil",
    "Sugarcane": "Well-drained, fertile soil",
    "Mustard": "Well-drained, loamy soil",
    "Barley": "Well-drained, loamy soil"
  };
  return cropInfo[crop] || "Well-drained, loamy soil";
}

function getCropPlantingSeason(crop) {
  const cropInfo = {
    "Tomatoes": "Spring, after last frost",
    "Peppers": "Spring, after last frost",
    "Eggplant": "Spring, after last frost",
    "Okra": "Late spring, when soil is warm",
    "Sweet Potatoes": "Late spring, when soil is warm",
    "Lettuce": "Spring and fall",
    "Spinach": "Spring and fall",
    "Kale": "Spring and fall",
    "Broccoli": "Spring and fall",
    "Cabbage": "Spring and fall",
    "Corn": "Spring, when soil is warm",
    "Beans": "Spring, after last frost",
    "Squash": "Spring, after last frost",
    "Cucumbers": "Spring, after last frost",
    "Carrots": "Spring and fall",
    "Rice": "Spring",
    "Taro": "Spring",
    "Sorghum": "Late spring, when soil is warm",
    "Millet": "Late spring, when soil is warm",
    "Sunflowers": "Spring, after last frost",
    "Wheat": "Fall (winter wheat) or spring (spring wheat)",
    "Cotton": "Spring, when soil is warm",
    "Sugarcane": "Spring to early summer",
    "Mustard": "Fall or early spring",
    "Barley": "Fall or early spring"
  };
  return cropInfo[crop] || "Spring";
}

function getCropGrowthPeriod(crop) {
  const cropInfo = {
    "Tomatoes": "70-85 days",
    "Peppers": "60-90 days",
    "Eggplant": "70-85 days",
    "Okra": "50-65 days",
    "Sweet Potatoes": "90-170 days",
    "Lettuce": "45-65 days",
    "Spinach": "40-45 days",
    "Kale": "50-65 days",
    "Broccoli": "80-100 days",
    "Cabbage": "80-180 days",
    "Corn": "60-100 days",
    "Beans": "50-60 days",
    "Squash": "50-65 days",
    "Cucumbers": "50-70 days",
    "Carrots": "70-80 days",
    "Rice": "120-180 days",
    "Taro": "200-365 days",
    "Sorghum": "90-120 days",
    "Millet": "60-90 days",
    "Sunflowers": "70-100 days",
    "Wheat": "180-240 days (winter wheat), 100-120 days (spring wheat)",
    "Cotton": "150-180 days",
    "Sugarcane": "270-365 days",
    "Mustard": "40-60 days",
    "Barley": "60-70 days"
  };
  return cropInfo[crop] || "60-90 days";
}

function getCropSpacing(crop) {
  const cropInfo = {
    "Tomatoes": "45-60 cm apart",
    "Peppers": "30-45 cm apart",
    "Eggplant": "45-60 cm apart",
    "Okra": "30-45 cm apart",
    "Sweet Potatoes": "30-45 cm apart",
    "Lettuce": "20-30 cm apart",
    "Spinach": "10-15 cm apart",
    "Kale": "30-45 cm apart",
    "Broccoli": "45-60 cm apart",
    "Cabbage": "45-60 cm apart",
    "Corn": "20-30 cm apart in rows 75-90 cm apart",
    "Beans": "10-15 cm apart",
    "Squash": "60-90 cm apart",
    "Cucumbers": "30-45 cm apart",
    "Carrots": "5-10 cm apart",
    "Rice": "15-20 cm apart",
    "Taro": "60-90 cm apart",
    "Sorghum": "10-15 cm apart",
    "Millet": "10-15 cm apart",
    "Sunflowers": "30-60 cm apart",
    "Wheat": "Row spacing of 15-20 cm",
    "Cotton": "30-40 cm apart in rows 90-100 cm apart",
    "Sugarcane": "60-90 cm apart in rows",
    "Mustard": "15-20 cm apart",
    "Barley": "Row spacing of 15-20 cm"
  };
  return cropInfo[crop] || "30-45 cm apart";
}

function getCropFertilizer(crop) {
  const cropInfo = {
    "Tomatoes": "Balanced NPK with extra calcium",
    "Peppers": "Balanced NPK with extra calcium",
    "Eggplant": "Balanced NPK",
    "Okra": "Balanced NPK",
    "Sweet Potatoes": "Low nitrogen, high potassium",
    "Lettuce": "Nitrogen-rich fertilizer",
    "Spinach": "Nitrogen-rich fertilizer",
    "Kale": "Nitrogen-rich fertilizer",
    "Broccoli": "Nitrogen-rich fertilizer",
    "Cabbage": "Nitrogen-rich fertilizer",
    "Corn": "Nitrogen-rich fertilizer",
    "Beans": "Low nitrogen, phosphorus-rich",
    "Squash": "Balanced NPK",
    "Cucumbers": "Balanced NPK",
    "Carrots": "Low nitrogen, phosphorus-rich",
    "Rice": "Nitrogen-rich fertilizer",
    "Taro": "Balanced NPK",
    "Sorghum": "Low to moderate fertilizer",
    "Millet": "Low to moderate fertilizer",
    "Sunflowers": "Low to moderate fertilizer",
    "Wheat": "Nitrogen-rich fertilizer",
    "Cotton": "Balanced NPK with micronutrients",
    "Sugarcane": "Nitrogen-rich fertilizer",
    "Mustard": "Balanced NPK",
    "Barley": "Moderate nitrogen fertilizer"
  };
  return cropInfo[crop] || "Balanced NPK fertilizer";
}

function getCropPestControl(crop) {
  const cropInfo = {
    "Tomatoes": "Watch for hornworms, aphids, and blight",
    "Peppers": "Watch for aphids, flea beetles, and blight",
    "Eggplant": "Watch for flea beetles and spider mites",
    "Okra": "Watch for aphids and fire ants",
    "Sweet Potatoes": "Watch for wireworms and weevils",
    "Lettuce": "Watch for aphids and slugs",
    "Spinach": "Watch for aphids and leaf miners",
    "Kale": "Watch for aphids and cabbage worms",
    "Broccoli": "Watch for cabbage worms and aphids",
    "Cabbage": "Watch for cabbage worms and aphids",
    "Corn": "Watch for corn earworms and borers",
    "Beans": "Watch for bean beetles and aphids",
    "Squash": "Watch for squash bugs and vine borers",
    "Cucumbers": "Watch for cucumber beetles and powdery mildew",
    "Carrots": "Watch for carrot rust flies and nematodes",
    "Rice": "Watch for stem borers and planthoppers",
    "Taro": "Watch for aphids and spider mites",
    "Sorghum": "Watch for sorghum midge and aphids",
    "Millet": "Watch for stem borers and head caterpillars",
    "Sunflowers": "Watch for sunflower moths and beetles",
    "Wheat": "Watch for aphids, rust, and powdery mildew",
    "Cotton": "Watch for bollworms, aphids, and whiteflies",
    "Sugarcane": "Watch for borers and leafhoppers",
    "Mustard": "Watch for aphids and flea beetles",
    "Barley": "Watch for aphids, mildew, and rust"
  };
  return cropInfo[crop] || "Regular inspection for pests and diseases";
}

function getCropHarvesting(crop) {
  const cropInfo = {
    "Tomatoes": "Harvest when fully colored but still firm",
    "Peppers": "Harvest when fully colored and firm",
    "Eggplant": "Harvest when skin is glossy and fruit yields slightly to pressure",
    "Okra": "Harvest pods when 2-3 inches long",
    "Sweet Potatoes": "Harvest after vines yellow, before frost",
    "Lettuce": "Harvest outer leaves or entire plant when mature",
    "Spinach": "Harvest outer leaves when plants are 3-4 inches tall",
    "Kale": "Harvest outer leaves as needed",
    "Broccoli": "Harvest head when buds are tight and firm",
    "Cabbage": "Harvest when head is firm and mature",
    "Corn": "Harvest when silks are brown and kernels are plump",
    "Beans": "Harvest when pods are firm but not bulging",
    "Squash": "Harvest summer squash when young and tender",
    "Cucumbers": "Harvest when firm and medium-sized",
    "Carrots": "Harvest when roots are 1/2 to 3/4 inch in diameter",
    "Rice": "Harvest when grains are firm and golden",
    "Taro": "Harvest corms 8-10 months after planting",
    "Sorghum": "Harvest when seeds are hard and dry",
    "Millet": "Harvest when seeds are hard and dry",
    "Sunflowers": "Harvest when back of head turns yellow to brown",
    "Wheat": "Harvest when grain is hard and plants are golden",
    "Cotton": "Harvest when bolls are fully open",
    "Sugarcane": "Harvest when stalks are mature and sugar content is high",
    "Mustard": "Harvest leaves when young and tender, seeds when pods are dry",
    "Barley": "Harvest when grain is hard and plants are golden"
  };
  return cropInfo[crop] || "Harvest when crop reaches maturity";
}

export default CropRecommendations;