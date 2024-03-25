import React, { useEffect, useState } from 'react';
import './App.css'; // Import your CSS file for styles

function App() {
  const [data, setData] = useState({});
  const [url, setUrl] = useState('');
  const [value, setValue] = useState('');
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/4ac9fe278a65b19dc20b9885/latest/${url}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setCurrencies(Object.keys(data.conversion_rates || {}));
      })
      .catch(err => console.log(err));
  }, [url]);

  const handleUrlChange = (e) => {
    setUrl(e.target.value.toUpperCase()); // Convert input to uppercase
  };

  return (
    <div className="background">
      <div className="container">
        <h1>Currency Converter</h1>
        <div className="input-container">
          <input 
            value={url} 
            type="text" 
            placeholder="Enter Currency Code (e.g., USD)" 
            onChange={handleUrlChange} 
          />
          <select 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
          >
            <option value="">Select Currency</option>
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        {value && <h2>1 {url} = {data.conversion_rates[value]} {value}</h2>}
      </div>
    </div>
  );
}

export default App;
