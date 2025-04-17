import { useState } from 'react'

function RegionForm({ onSubmit }) {
  const [region, setRegion] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (region.trim()) {
      onSubmit(region.trim())
    }
  }
  
  return (
    <div className="region-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Enter Your Region</h2>
        <div className="form-group">
          <label htmlFor="region">City or Region Name:</label>
          <input
            type="text"
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="e.g., London, New York, Tokyo"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Get Crop Recommendations</button>
      </form>
    </div>
  )
}

export default RegionForm