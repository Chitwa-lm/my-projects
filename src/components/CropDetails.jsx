import React, { useState, useEffect } from 'react';

function CropDetails({ cropName, onClose }) {
  const [cropData, setCropData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await fetch(
          `https://perenual.com/api/species-list?key=sk-d6kP67f680927d0f79699&q=${encodeURIComponent(cropName)}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch crop data');
        }

        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setCropData(data.data[0]);
        } else {
          setError('No information found for this crop');
        }
      } catch (err) {
        setError('Failed to load crop information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCropData();
  }, [cropName]);

  return (
    <div className="crop-details-overlay">
      <div className="crop-details-card">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>{cropName}</h2>

        {loading && <div className="loading">Loading crop information...</div>}
        
        {error && <div className="error">{error}</div>}

        {cropData && (
          <div className="crop-info-grid">
            <div className="crop-info-item">
              <h3>Scientific Name</h3>
              <p>{cropData.scientific_name}</p>
            </div>
            {cropData.cycle && (
              <div className="crop-info-item">
                <h3>Growth Cycle</h3>
                <p>{cropData.cycle}</p>
              </div>
            )}
            {cropData.watering && (
              <div className="crop-info-item">
                <h3>Watering Needs</h3>
                <p>{cropData.watering}</p>
              </div>
            )}
            {cropData.sunlight && (
              <div className="crop-info-item">
                <h3>Sunlight Requirements</h3>
                <p>{Array.isArray(cropData.sunlight) ? cropData.sunlight.join(', ') : cropData.sunlight}</p>
              </div>
            )}
            {cropData.description && (
              <div className="crop-info-item">
                <h3>Description</h3>
                <p>{cropData.description}</p>
              </div>
            )}
            {cropData.maintenance && (
              <div className="crop-info-item">
                <h3>Maintenance Level</h3>
                <p>{cropData.maintenance}</p>
              </div>
            )}
            {cropData.growth_rate && (
              <div className="crop-info-item">
                <h3>Growth Rate</h3>
                <p>{cropData.growth_rate}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CropDetails;